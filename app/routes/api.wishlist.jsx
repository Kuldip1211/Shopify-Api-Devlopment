import { json } from "@remix-run/react";
import db from "../db.server";
import { cors } from "remix-utils/cors";

export async function loader() {
  return json({
    ok: true,
    message: "Hello from the api",
  });
}

export async function action({ request }) {
  const method = request.method;
  let data = await request.formData();
  data = Object.fromEntries(data);

  const userId = data.customerId;
  const productId = data.productId;
  const productName = data.productName; // new field
  const shop = data.shop;
  const _action = data._action;

  if (!userId) {
    return json({
      message: "Missing data: userId is required",
      method: _action,
    });
  }

  if (!productId) {
    return json({
      message: "Missing data: productId is required",
      method: _action,
    });
  }

  if (!shop) {
    return json({
      message: "Missing data: shop is required",
      method: _action,
    });
  }

  let response;

  switch (method) {
    case "POST": {
      try {
        // add to wishlist
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
        console.error("Wishlist add error:--------", userId);
        return json({ error: err }, { status: 500 });
      }
    }

    case "PATCH": {
      try {
        // remove from wishlist (example)
        await db.wishlist.deleteMany({
          where: {
            userId,
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
        return json(
          { error: "Failed to remove wishlist item" },
          { status: 500 },
        );
      }
    }

    default:
      return new Response("Method Not Allowed", { status: 405 });
  }
}
