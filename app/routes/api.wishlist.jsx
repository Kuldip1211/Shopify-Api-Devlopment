import { json } from "@remix-run/node";
import prisma from "../db.server";

export async function loader({ request }) {
  console.log("🔥 GET Proxy request received:", request.url);
  return json(
    { ok: true, message: "Hello from the Wishlist API (GET)" },
    { headers: { "ngrok-skip-browser-warning": "true" } }
  );
}

export async function action({ request }) {
  console.log("🔥 POST Proxy request received:", new Date().toISOString());

  try {
    const body = await request.json();  // ✅ parse JSON
    // console.log("📦 Parsed Body:", body);

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
      { ok: true, message: "ProductID: " + productId + " ProductNAme " + productName + " CustomerId " + customerId + " shop " + shop },
      { headers: { "ngrok-skip-browser-warning": "true" } }
    );
  } catch (error) {
    console.error("❌ Error parsing request:", error);
    return json(
      { ok: false, error: error.message || "API test failed" },
      { status: 500 }
    );
  }
}