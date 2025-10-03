import { authenticate } from "../shopify.server"

export  const action  = async({ request  }) => {

    const { admin } = await authenticate.admin(request);


    // Read json from frontend 
    const body = await request.json();
    const { title , description , price } = body;

    // shopify graphql
    

}