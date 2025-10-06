import React from "react";
import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { Card, Page, Layout, Button } from "@shopify/polaris";

// 🧩 --- Loader: Fetch first 5 products using Shopify GraphQL ---
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const query = `
    {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            status
            images(first: 1) {
              edges {
                node {
                  originalSrc
                  altText
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  id
                  price
                  barcode
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await admin.graphql(query);
    const data = await response.json();

    const products =
      data?.data?.products?.edges?.map((edge) => edge.node) || [];

    return json({ products });
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return json({ products: [] });
  }
};

// 🧠 --- Component: Display Products with Simple Load More Button ---
export default function ProductsPage() {
  const { products } = useLoaderData();

  return (
    <Page title="Shopify Products">
      <Layout>
        <Layout.Section>
          {products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
                marginTop: "20px",
              }}
            >
              {products.map((p) => {
                const image =
                  p.images?.edges[0]?.node?.originalSrc ||
                  "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png";

                return (
                  <Card key={p.id} sectioned>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "10px",
                      }}
                    >
                      {/* Product Image */}
                      <div
                        style={{
                          width: "100%",
                          height: "220px",
                          overflow: "hidden",
                          borderRadius: "12px",
                          marginBottom: "15px",
                          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                          backgroundColor: "#f6f6f7",
                        }}
                      >
                        <img
                          src={image}
                          alt={p.images?.edges[0]?.node?.altText || p.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            borderRadius: "12px",
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div style={{ textAlign: "center" }}>
                        <h2
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: "600",
                            color: "#202223",
                            marginBottom: "5px",
                          }}
                        >
                          {p.title}
                        </h2>
                        <p
                          style={{
                            fontSize: "0.9rem",
                            color: "#616161",
                            marginBottom: "6px",
                          }}
                        >
                          Status:{" "}
                          <span
                            style={{
                              color:
                                p.status === "ACTIVE" ? "#108043" : "#8C9196",
                              fontWeight: "500",
                            }}
                          >
                            {p.status}
                          </span>
                        </p>
                        <p
                          style={{
                            fontSize: "0.95rem",
                            color: "#212B36",
                            marginBottom: "3px",
                          }}
                        >
                          Price: ₹
                          {p.variants?.edges[0]?.node?.price || "N/A"}
                        </p>
                        <p
                          style={{
                            fontSize: "0.85rem",
                            color: "#8C9196",
                          }}
                        >
                          Barcode: {p.variants?.edges[0]?.node?.barcode || "—"}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Simple Load More Button (No Functionality) */}
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <Button>Load More Products</Button>
          </div>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
