// 📄 app/routes/api.products.jsx
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

// 🧠 Fetch products with pagination (for Load More)
export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  // Read cursor from URL
  const url = new URL(request.url);
  const after = url.searchParams.get("after");

  const query = `
    query getProducts($after: String) {
      products(first: 5, after: $after) {
        edges {
          cursor
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  try {
    const response = await admin.graphql(query, { variables: { after } });
    const data = await response.json();

    const products =
      data?.data?.products?.edges?.map((edge) => edge.node) || [];
    const pageInfo = data?.data?.products?.pageInfo || {};

    return json({ products, pageInfo });
  } catch (error) {
    console.error("❌ GraphQL Error:", error);
    return json({ products: [], pageInfo: {}, error: error.message });
  }
};

export const action = async ({ request }) => {

    const { admin } = await authenticate.admin(request);

    const body = await request.json();

    const { id, title, status, tags } = body;

    // graphql mutation
    const mutationQuery = `mutation updateProduct($input : ProductInput!){
    productUpdate(input: $input){
        product{
            id
            title
            status
            tags
        }
        userErrors {
            field
            message
        }
    }
  }`;

    const variables = {
      input: {
        id,
        title,
        status,
        tags,
      },
    };

    try {
      const response = await admin.graphql(mutationQuery, { variables });

      const data = await response.json();

      // check for userErrors
      if (data.data.productUpdate.userErrors.length > 0) {
        return json(
          { error: data.data.productUpdate.userErrors },
          { status: 400 },
        );
      }

      return json({
        success: true,
        updateProduct: data.data.productUpdate.product,
      });
      
    } catch (error) {
      return json({
        success: false,
        error: error,
      });
    }
  
}