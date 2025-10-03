import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader() {
  // Demo static data
  const wishlistItems = [
    {
      productId: "111",
      productName: "Red Shirt",
      shop: "kdfarm.myshopify.com",
    },
    {
      productId: "222",
      productName: "Blue Shoes",
      shop: "kdfarm.myshopify.com",
    },
  ];

  return json(
    { ok: true, wishlist: wishlistItems },
    { headers: { "ngrok-skip-browser-warning": "true" } },
  );
}
export async function action({ request }) {
  console.log("🔥 POST Proxy request received:", new Date().toISOString());

  try {
    // ✅ Get query params (example: /apps/wishlist?action=true)
    const url = new URL(request.url);
    const show = url.searchParams.get("show");
    const deleteData = url.searchParams.get("delete");

    if (show === "true") {
      const body = await request.json();

      const { customerId } = body;

      const wishlistData = await prisma.wishlist.findMany({
        where: { customerId: String(customerId) },
      });
      // 👉 If show is not true, return a simple success response
      return json(
        { ok: true, message: "API is working fine ✅", body: wishlistData },
        { headers: { "ngrok-skip-browser-warning": "true" } },
      );
    } // 👉 DELETE Wishlist Item
   else if (deleteData === "true") {
  const body = await request.json();
  const { productId, customerId } = body;

  if (!productId || !customerId) {
    return json(
      { ok: false, message: "❌ Missing productId or customerId for deletion" },
      { status: 400 }
    );
  }

  // ✅ Delete the wishlist item
  await prisma.wishlist.deleteMany({
    where: {
      productId: String(productId),
      customerId: String(customerId),
    },
  });

  // ✅ Fetch updated wishlist for this customer
  const updatedWishlist = await prisma.wishlist.findMany({
    where: { customerId: String(customerId) },
  });

  return json(
    {
      ok: true,
      message: `Deleted ✅ ProductID: ${productId} for CustomerID: ${customerId}`,
      body: updatedWishlist, // 👈 send updated wishlist here
    },
    { headers: { "ngrok-skip-browser-warning": "true" } }
  );
}
 else {
      // 👉 If show=true → parse body & save to DB
      const body = await request.json();
      const { productId, productName, customerId, shop } = body;

      // ✅ Save to database
      const newWishlist = await prisma.wishlist.create({
        data: {
          productId: String(productId),
          productName,
          customerId: String(customerId),
          shop,
        },
      });

      return json(
        {
          ok: true,
          message:
            "Saved ✅ ProductID: " +
            productId +
            ", ProductName: " +
            productName +
            ", CustomerId: " +
            customerId +
            ", Shop: " +
            shop,
        },
        { headers: { "ngrok-skip-browser-warning": "true" } },
      );
    }
  } catch (error) {
    console.error("❌ Error parsing request:", error);
    return json(
      { ok: false, error: error.message || "API test failed" },
      { status: 500 },
    );
  }
}
