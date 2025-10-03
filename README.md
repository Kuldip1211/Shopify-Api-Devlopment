<h1 align="center" style="color:#2c3e50; font-family:Arial, sans-serif;">
  🛍️ Shopify Wishlist App
</h1>

<p align="center" style="font-size:16px; color:#555;">
  A custom Shopify app that allows customers to <b>add, view, and manage</b> their wishlist directly on the storefront.  
  Built with ❤️ using <b>Remix</b>, <b>Prisma</b>, and <b>Shopify App Proxy</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Shopify-App-green?logo=shopify&logoColor=white" alt="Shopify"/>
  <img src="https://img.shields.io/badge/Remix-Framework-black?logo=remix&logoColor=white" alt="Remix"/>
  <img src="https://img.shields.io/badge/Prisma-ORM-blue?logo=prisma&logoColor=white" alt="Prisma"/>
  <img src="https://img.shields.io/badge/PostgreSQL-DB-blue?logo=postgresql&logoColor=white" alt="PostgreSQL"/>
  <img src="https://img.shields.io/badge/Node.js-Backend-green?logo=node.js&logoColor=white" alt="Node.js"/>
</p>

---

## 📑 Table of Contents
- [✨ Features](#-features)
- [⚙️ Tech Stack](#️-tech-stack)
- [🛠️ Setup Instructions](#️-setup-instructions)
- [🚀 Usage](#-usage)
- [⚠️ Problems I Faced & Solutions](#-problems-i-faced--solutions)
- [📸 Screenshots](#-screenshots-coming-soon)
- [👨‍💻 Author](#-author)

---

## ✨ Features
- Customers can **add products** to their wishlist.  
- Wishlist items are **saved in Prisma + PostgreSQL/MySQL**.  
- Uses **Shopify App Proxy** to fetch & display wishlist items in Liquid theme.  
- Customers can **view their wishlist** in a styled table format.  
- Option to **delete items** from wishlist.  

---

## ⚙️ Tech Stack
| Technology  | Purpose |
|-------------|---------|
| 🛍️ Shopify App | Custom storefront integration |
| ⚡ Remix | Backend Framework |
| 🗄️ Prisma | Database ORM |
| 🛢️ PostgreSQL/MySQL | Wishlist Storage |
| 💻 Liquid + JavaScript | Theme Integration |
| 🌍 Ngrok | Local tunneling for Shopify |

---

## 🛠️ Setup Instructions
1. Clone the repo and install dependencies.  
2. Set up your database and update `prisma/schema.prisma`.  
3. Run migrations:  
   ```bash
   npx prisma migrate dev

<ol>
  <li>Start the app:</li>
</ol>

<pre>
<code class="language-bash">
npm run dev
</code>
</pre>

<ol start="5">
  <li>Expose app with <b>Ngrok</b> and configure the URL in Shopify App settings.</li>
  <li>Add App Proxy:</li>
</ol>

<pre>
<code class="language-bash">
/apps/wishlist → /api/wishlist
</code>
</pre>

<hr>

<h2>🚀 Usage</h2>
<ul>
  <li><b>Add to Wishlist:</b> Send <code>POST /apps/wishlist?show=true</code>.</li>
  <li><b>View Wishlist:</b> Fetch wishlist items by <code>customerId</code>.</li>
  <li><b>Delete Wishlist Item:</b> Send <code>POST /apps/wishlist?delete=true</code> with <code>productId</code> + <code>customerId</code>.</li>
</ul>

<p>✅ The backend returns the <b>updated wishlist</b> after add/delete.</p>

<hr>

<h2>⚠️ Problems I Faced &amp; Solutions</h2>
<ul>
  <li>
    <b>Proxy Limitation:</b> Shopify only allowed one URL in <code>shopify.app.toml</code>.<br>
    👉 Solved by configuring multiple proxies in <b>Partner Dashboard</b>.
  </li>
  <li>
    <b>Liquid not showing JSON:</b><br>
    👉 Fixed by using correct headers (<code>Content-Type: application/json</code>) and <code>res.json()</code>.
  </li>
  <li>
    <b>Wishlist not updating after delete:</b><br>
    👉 Used <code>fetch</code> → backend returns updated wishlist → re-rendered table.
  </li>
</ul>

<hr>

<h2>📸 Screenshots (Coming Soon)</h2>
<ul>
  <li>✨ Wishlist Page Preview + Admin Panel</li>
</ul>

<h3 style="margin-top:15px; color:#2c3e50;">🔧 Skills</h3>
<p>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" width="40" height="40" style="margin:5px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="WordPress" width="40" height="40" style="margin:5px;"/>
<img src="https://cdn.worldvectorlogo.com/logos/shopify.svg" alt="Shopify" width="40" height="40" style="margin:5px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React.js" width="40" height="40" style="margin:5px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" width="40" height="40" style="margin:5px;"/>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" width="40" height="40" style="margin:5px;"/>
</p>


<p>📌 <a href="https://linkedin.com/in/kuldeep-chudasama-1759b1256" style="color:#2980b9; text-decoration:none; font-weight:bold;">LinkedIn Profile</a></p>


<h2 style="color:#f39c12;">⭐ Support</h2>
<p>If you like this project, don’t forget to <b style="color:#27ae60;">star the repo</b> 🌟</p>