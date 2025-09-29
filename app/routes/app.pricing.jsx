import { json, useLoaderData, Form } from "@remix-run/react";
import db from "../db.server";
import { Page, Card, DataTable, Text, Button } from "@shopify/polaris";
import { DeleteIcon } from "@shopify/polaris-icons";

// Loader: fetch all wishlist items
export async function loader() {
  const wishlist = await db.wishlist.findMany({
    orderBy: { createdAt: "desc" },
  });
  return json(wishlist);
}

// Action: delete a wishlist item
export async function action({ request }) {
  try {
    const formData = await request.formData();
    const id = formData.get("id"); // unique wishlist row ID

    if (id) {
      await db.wishlist.delete({ where: { id } });
    }

    return json({ success: true });
  } catch (error) {
    console.error("Delete failed:", error);
    return json({ error: "Delete failed" }, { status: 500 });
  }
}

export default function WishlistPage() {
  const wishlist = useLoaderData();

  // Build rows for DataTable
  const rows = wishlist.map((item) => [
    item.customerId,
    item.productId,
    item.productName || "N/A",
    item.shop,
    new Date(item.createdAt).toLocaleString(),
    // Delete button form
    <Form method="post" key={item.id}>
      <input type="hidden" name="id" value={item.id} />
      <Button
        submit
        icon={DeleteIcon}
        tone="critical"   // red button
        variant="primary" // solid style
      >
        Delete
      </Button>
    </Form>,
  ]);

  return (
    <Page title="Wishlist Items">
      <Card>
        {wishlist.length > 0 ? (
          <DataTable
            columnContentTypes={[
              "text",
              "text",
              "text",
              "text",
              "text",
              "text",
            ]}
            headings={[
              "User ID",
              "Product ID",
              "Product Name",
              "Shop",
              "Added At",
              "Action",
            ]}
            rows={rows}
          />
        ) : (
          <Text as="p" variant="bodyMd">
            No wishlist items found.
          </Text>
        )}
      </Card>
    </Page>
  );
};
