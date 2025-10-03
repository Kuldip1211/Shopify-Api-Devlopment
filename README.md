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

<div style="max-width:900px; margin:40px auto; background:#fff; padding:30px; border-radius:12px; box-shadow:0 6px 18px rgba(0,0,0,0.1);">


<h1 align="center" style="color:#2c3e50; font-size:32px; margin-bottom:10px;">🛍️ Shopify Wishlist App</h1>
<p align="center" style="font-size:17px; color:#555; margin-bottom:25px;">
A custom Shopify app that allows customers to <b>add, view, and manage</b> their wishlist directly on the storefront.
</p>


<hr style="border:0; height:2px; background:#eee; margin:20px 0;">


<h2 style="color:#27ae60;">🚀 Start the App</h2>
<pre style="background:#ecf0f1; padding:10px; border-radius:6px;">npm run dev</pre>


<h2 style="color:#2980b9;">🌍 Expose with Ngrok</h2>
<p>Expose app with <b>Ngrok</b> and configure the URL in Shopify App settings.</p>


<h2 style="color:#8e44ad;">🔗 Add App Proxy</h2>
<pre style="background:#ecf0f1; padding:10px; border-radius:6px;">/apps/wishlist → /api/wishlist</pre>


<h2 style="color:#e67e22;">🚀 Usage</h2>
<ul style="background:#fdfdfd; padding:15px; border-radius:8px; box-shadow:0 2px 6px rgba(0,0,0,0.05);">
<li><b>Add to Wishlist:</b> Send <code>POST /apps/wishlist?show=true</code></li>
<li><b>View Wishlist:</b> Fetch wishlist items by <code>customerId</code></li>
<li><b>Delete Wishlist Item:</b> Send <code>POST /apps/wishlist?delete=true</code> with <code>productId</code> + <code>customerId</code></li>
</ul>
<p style="color:#27ae60; font-weight:bold;">✅ The backend returns the updated wishlist after add/delete.</p>


<h2 style="color:#c0392b;">⚠️ Problems I Faced & Solutions</h2>
<ul style="background:#fff5f5; padding:15px; border-radius:8px;">
<li><b>Proxy Limitation:</b> Shopify only allowed one URL in <code>shopify.app.toml</code>.<br>
👉 <span style="color:#27ae60;">Solved by configuring multiple proxies in Partner Dashboard.</span></li>


<li><b>Liquid not showing JSON:</b><br>
👉 <span style="color:#27ae60;">Fixed by using correct headers (<code>Content-Type: application/json</code>) and <code>res.json()</code>.</span></li>


<li><b>Wishlist not updating after delete:</b><br>
👉 <span style="color:#27ae60;">Used fetch → backend returns updated wishlist → re-rendered table.</span></li>
</ul>


<h2 style="color:#16a085;">📸 Screenshots (Coming Soon)</h2>
<p style="background:#ecf7ff; padding:10px; border-radius:6px;">✨ Wishlist Page Preview + Admin Panel</p>


<h2 style="color:#34495e;">👨‍💻 Author</h2>
<p><b>Kuldeep Chudasama</b><br>
PHP Full Stack Developer | MERN Stack Developer</p>


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
</div>