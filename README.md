<h1 align="center" style="color:#2c3e50; font-family:Arial, sans-serif;">
  🛍️ Shopify Wishlist App
</h1>

<p align="center" style="font-size:16px; color:#555;">
  A custom Shopify app that allows customers to <b>add, view, and manage</b> their wishlist directly on the storefront.
</p>

<hr style="border:1px solid #eee;">

<h2 style="color:#27ae60;">✨ Features</h2>
<ul style="font-size:15px; line-height:1.6;">
  <li>Customers can <b>add products</b> to their wishlist.</li>
  <li>Wishlist items are <b>saved in the database (Prisma + PostgreSQL/MySQL)</b>.</li>
  <li>Uses <b>Shopify App Proxy</b> to fetch & display wishlist items in Liquid theme.</li>
  <li>Customers can <b>view their wishlist</b> in a styled table format.</li>
  <li>Option to <b>delete items</b> from wishlist.</li>
</ul>

<hr style="border:1px solid #eee;">

<h2 style="color:#2980b9;">⚙️ Tech Stack</h2>
<ul style="font-size:15px; line-height:1.6;">
  <li><b>Shopify App (Custom)</b></li>
  <li><b>Remix</b> (Backend Framework)</li>
  <li><b>Prisma</b> (Database ORM)</li>
  <li><b>PostgreSQL/MySQL</b> (Database)</li>
  <li><b>Liquid + JavaScript</b> (Frontend integration)</li>
  <li><b>Ngrok</b> (for development tunneling)</li>
</ul>

<hr style="border:1px solid #eee;">

<h2 style="color:#e67e22;">🛠️ Setup Instructions</h2>
<ol style="font-size:15px; line-height:1.6;">
  <li>Clone the repo and install dependencies.</li>
  <li>Set up your database and update <code>prisma/schema.prisma</code>.</li>
  <li>Run <code>npx prisma migrate dev</code> to apply migrations.</li>
  <li>Start the app with <code>npm run dev</code>.</li>
  <li>Expose app with <b>Ngrok</b> and configure the URL in Shopify App settings.</li>
  <li>Add App Proxy:
    <ul>
      <li><code>/apps/wishlist</code> → <code>/api/wishlist</code></li>
    </ul>
  </li>
</ol>

<hr style="border:1px solid #eee;">

<h2 style="color:#8e44ad;">🚀 Usage</h2>
<ul style="font-size:15px; line-height:1.6;">
  <li><b>Add to Wishlist:</b> Customers can add a product via button (POST request with <code>?show=true</code>).</li>
  <li><b>View Wishlist:</b> Fetch all wishlist items for the logged-in customer.</li>
  <li><b>Delete Wishlist Item:</b> Remove an item with <code>?delete=true</code>.</li>
</ul>

<hr style="border:1px solid #eee;">

<h2 style="color:#c0392b;">⚠️ Very Important Notes</h2>

<h3>🚀 Start Ngrok First</h3>
<p>Always start <b>Ngrok</b> before running your app, otherwise Shopify cannot reach your local server.</p>

<h3>📥 Install Ngrok Without Admin</h3>
<pre>
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz
tar -xvzf ngrok-v3-stable-linux-amd64.tgz
mv ngrok $HOME/bin/
export PATH=$HOME/bin:$PATH
</pre>

<h3>🔒 Fix SSL Certificate Errors</h3>
<pre>
export NODE_OPTIONS="--use-openssl-ca"
export NODE_TLS_REJECT_UNAUTHORIZED=0
export NODE_EXTRA_CA_CERTS=~/shopify-ca.pem
export NODE_EXTRA_CA_CERTS=~/ca-certificates.crt
export NODE_TLS_REJECT_UNAUTHORIZED=0
</pre>

<h3>🔄 Update App URLs</h3>
<p>After starting Ngrok, <b>update all URLs</b in your <code>shopify.app.toml</code> file with your new Ngrok URL, then <b>rebuild configuration</b> and restart the app.</p>

<h3>🌐 Creating Proxy URLs</h3>
<ol>
  <li>Go to <b>Shopify Partner Dashboard → App → Extensions → App Proxy</b>.</li>
  <li>Click <b>Add App Proxy</b>.</li>
  <li>Set Prefix: <code>apps</code>.</li>
  <li>Set Subpath: <code>wishlist</code>.</li>
  <li>Set Proxy URL: <code>https://your-ngrok-url/api/wishlist</code>.</li>
  <li>Save → Now you can call: <code>https://yourstore.myshopify.com/apps/wishlist</code>.</li>
</ol>

<hr style="border:1px solid #eee;">

<h2 style="color:#c0392b;">⚠️ Problems I Faced & Solutions</h2>
<ul style="font-size:15px; line-height:1.6;">
  <li>
    <b>Problem:</b> Shopify App Proxy supported only one URL in <code>shopify.app.toml</code>.  
    <br><b>Solution:</b> Configured multiple proxies directly from the Shopify Partner Dashboard.
  </li>
  <li>
    <b>Problem:</b> Could not fetch JSON response inside Liquid (response not showing).  
    <br><b>Solution:</b> Used <code>fetch</code> with proper headers (<code>'Content-Type': 'application/json'</code>) and parsed using <code>res.json()</code>.
  </li>
  <li>
    <b>Problem:</b> Assignment to <code>const</code> variable when storing wishlist data.  
    <br><b>Solution:</b> Changed <code>const</code> to <code>let</code> or updated array using <code>.push()</code>.
  </li>
  <li>
    <b>Problem:</b> Wishlist not rendering properly after POST response.  
    <br><b>Solution:</b> Used <code>JSON.stringify()</code> for debugging and later appended new items directly into DOM table.
  </li>
  <li>
    <b>Problem:</b> Delete button not working.  
    <br><b>Solution:</b> Sent <code>POST /apps/wishlist?delete=true</code> with <code>productId</code> and <code>customerId</code> to backend, then updated UI.
  </li>
</ul>

<hr style="border:1px solid #eee;">

<h2 style="color:#16a085;">📸 Screenshots (Coming Soon)</h2>
<p>Will add UI screenshots of wishlist page here.</p>

<hr style="border:1px solid #eee;">

<h2 style="color:#34495e;">👨‍💻 Author</h2>
<p>
  <b>Kuldeep Chudasama</b> – PHP Full Stack Developer | MERN Stack Developer <br>
  Skilled in:
</p>

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" width="40" height="40"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="WordPress" width="40" height="40"/> 
  <img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="Shopify" width="40" height="40"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React.js" width="40" height="40"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40"/> 
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" width="40" height="40"/>
</p>

<a href="https://linkedin.com/in/kuldeep-chudasama-1759b1256">🔗 LinkedIn</a></p>
