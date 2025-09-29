import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  Card,
  Frame,
  Layout,
  Page,
  Thumbnail,
  DataTable,
  Button,
} from "@shopify/polaris";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

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

  const products =
    data?.data?.products?.edges?.map((edge) => edge.node) || [];

  return json({ products });
};

// --- Action: delete product ---
export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();
  const productId = formData.get("productId");

  if (productId) {
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
  }

  return json({ success: true });
};

// --- Component: render with Polaris ---
export default function ProductsPage() {
  const { products } = useLoaderData();
  const fetcher = useFetcher();

  const rows = products.map((p) => [
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
    <fetcher.Form method="post">
      <input type="hidden" name="productId" value={p.id} />
      <Button tone="critical" variant="primary" submit>
        Delete
      </Button>
    </fetcher.Form>,
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
    </Frame>
  );
}
