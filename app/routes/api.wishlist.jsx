import { json } from "@remix-run/node"; // ✅ should be from @remix-run/node (not react)
import db from "../db.server";
import { cors } from "remix-utils/cors";

// --- Loader: check if product is already in wishlist ---
export async function loader({ request }) {
  const url = new URL(request.url);
  const productId = url.searchParams.get("productId");
  const customerId = url.searchParams.get("customerId");
  const shop = url.searchParams.get("shop");

  if (!productId || !customerId || !shop) {
    const response = json({ exists: false });
    return cors(request, response);
  }

  const existing = await db.wishlist.findFirst({
    where: {
      productId,
      customerId,
      shop,
    },
  });

  const response = json({ exists: !!existing });
  return cors(request, response);
}

// --- Action: add/remove wishlist ---
export async function action({ request }) {
  const method = request.method;
  let data = await request.formData();
  data = Object.fromEntries(data);

  const userId = data.customerId;
  const productId = data.productId;
  const productName = data.productName;
  const shop = data.shop;
  const _action = data._action;

  if (!userId) {
    return json({ message: "Missing data: userId is required", method: _action });
  }
  if (!productId) {
    return json({ message: "Missing data: productId is required", method: _action });
  }
  if (!shop) {
    return json({ message: "Missing data: shop is required", method: _action });
  }

  let response;

  switch (method) {
    case "POST": {
      try {
        const wishlist = await db.wishlist.create({
          data: {
            customerId: String(userId),
            productId: String(productId),
            productName,
            shop,
          },
        });

        response = json({
          message: "Product added to wishlist",
          method: _action,
          wishlisted: true,
          wishlist,
        });
        return cors(request, response);
      } catch (err) {
        console.error("Wishlist add error:", err);
        return json({ error: "Failed to add to wishlist" }, { status: 500 });
      }
    }

    case "PATCH": {
      try {
        await db.wishlist.deleteMany({
          where: {
            customerId: userId, // ✅ fixed field name
            productId,
            shop,
          },
        });

        response = json({
          message: "Product removed from wishlist",
          method: _action,
          wishlisted: false,
        });
        return cors(request, response);
      } catch (err) {
        console.error("Wishlist remove error:", err);
        return json({ error: "Failed to remove wishlist item" }, { status: 500 });
      }
    }

    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
