import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  Card,
  Frame,
  Layout,
  Page,
  Thumbnail,
  DataTable,
  Button,
  Modal,
  TextField,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";
import { useState, useCallback } from "react";

// --- Loader: fetch products from Shopify GraphQL ---
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(`
    {
      products(first: 10) {
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
            variants(first: 10) {
              edges {
                node {
                  id
                  price
                  barcode
                  createdAt
                }
              }
            }
          }
        }
      }
    }
  `);

  const data = await response.json();
  const products = data?.data?.products?.edges?.map((edge) => edge.node) || [];

  return json({ products });
};

// --- Action: handle delete or update ---
export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const intent = formData.get("intent");
  const productId = formData.get("productId");

  if (intent === "delete" && productId) {
    await admin.graphql(`
      mutation {
        productDelete(input: { id: "${productId}" }) {
          deletedProductId
          userErrors {
            field
            message
          }
        }
      }
    `);
    return json({ success: true, action: "delete" });
  }

  if (intent === "update" && productId) {
    const newTitle = formData.get("title");
    await admin.graphql(`
      mutation {
        productUpdate(input: { id: "${productId}", title: "${newTitle}" }) {
          product {
            id
            title
          }
          userErrors {
            field
            message
          }
        }
      }
    `);
    return json({ success: true, action: "update" });
  }

  return json({ success: false });
};

// --- Component: render with Polaris ---
export default function ProductsPage() {
  const { products } = useLoaderData();
  const fetcher = useFetcher();
  const [activeModal, setActiveModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [productTitle, setProductTitle] = useState("");

  const handleModalChange = useCallback(() => setActiveModal(!activeModal), [activeModal]);

  const openUpdateModal = (product) => {
    setCurrentProduct(product);
    setProductTitle(product.title);
    setActiveModal(true);
  };

  const rows = products.map((p) => [
    // eslint-disable-next-line react/jsx-key
    <Thumbnail
      source={p.images?.edges[0]?.node?.originalSrc || ""}
      alt={p.images?.edges[0]?.node?.altText || p.title}
      size="small"
    />,
    p.title,
    p.handle,
    p.status,
    p.variants?.edges[0]?.node?.price || "N/A",
    p.variants?.edges[0]?.node?.barcode || "—",
    // eslint-disable-next-line react/jsx-key
    <div style={{ display: "flex", gap: "8px" }}>
      {/* Delete Button */}
      <fetcher.Form method="post">
        <input type="hidden" name="productId" value={p.id} />
        <input type="hidden" name="intent" value="delete" />
        <Button tone="critical" variant="primary" submit>
          Delete
        </Button>
      </fetcher.Form>

      {/* Update Button */}
      <Button onClick={() => openUpdateModal(p)} variant="primary">
        Update
      </Button>
    </div>,
  ]);

  return (
    <Frame>
      <Page title="Products">
        <Layout>
          <Layout.Section>
            <Card>
              <DataTable
                columnContentTypes={[
                  "text",
                  "text",
                  "text",
                  "text",
                  "numeric",
                  "text",
                  "text",
                ]}
                headings={[
                  "Image",
                  "Title",
                  "Handle",
                  "Status",
                  "Price",
                  "Barcode",
                  "Actions",
                ]}
                rows={rows}
              />
            </Card>
          </Layout.Section>
        </Layout>
      </Page>

      {/* Polaris Modal for Update */}
      {currentProduct && (
        <Modal
          open={activeModal}
          onClose={handleModalChange}
          title="Update Product"
          primaryAction={{
            content: "Close",
            onAction: handleModalChange,
          }}
        >
          <Modal.Section>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Thumbnail
                source={
                  currentProduct.images?.edges[0]?.node?.originalSrc || ""
                }
                alt={
                  currentProduct.images?.edges[0]?.node?.altText ||
                  currentProduct.title
                }
                size="small"
              />
              <fetcher.Form method="post" style={{ flex: 1 }}>
                <input type="hidden" name="productId" value={currentProduct.id} />
                <input type="hidden" name="in</Lintent" value="update" />
                <TextField
                  label="Product Title"
                  value={productTitle}
                  onChange={(val) => setProductTitle(val)}
                  name="title"
                  autoComplete="off"
                />
                <div style={{ marginTop: "16px" }}>
                  <Button variant="primary" submit>
                    Save Changes
                  </Button>
                </div>
              </fetcher.Form>
            </div>
          </Modal.Section>
        </Modal>
      )}
    </Frame>
  );
}
