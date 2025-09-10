"# URL_Shortener"

🖇️ URL Shortener Project

A full-featured URL shortener with authentication, role-based access, analytics, and responsive UI.

Features

Shorten URLs easily

User Authentication & Authorization (Admin / Normal)

Analytics (clicks and visit history)

🖥️ Responsive UI built with Tailwind CSS

🏗️ MVC Architecture (Models, Views, Controllers)

🔒 JWT Stateless Authentication + optional Stateful session

🏗️ Project Structure
url-shortener/
├─ controllers/ # Handles HTTP requests and responses
│ ├─ url.js # URL routes logic (create, analytics)
│ ├─ user.js # User login/register logic
├─ services/  
│ ├─auth.js User authentication, JWT payload
├─ models/ # MongoDB schemas
│ ├─ url.js
│ ├─ user.js
├─ middlewares/ # Auth, role checking
├─ routes/ # Express routes
│ ├─ url.js
│ ├─ user.js
├─ views/ # EJS templates
│ ├─ home.ejs
│ ├─ login.ejs
│ ├─ register.ejs
├─ public/ # CSS, JS, images
├─ app.js / server.js # Express server
├─ package.json
└─ README.md

⚡ Installation

Start the server:

npm start

Visit http://localhost:8000
🌐

📖 API Documentation
🔑 User Authentication

POST /users/register
POST /users/login

🔗 URL Management

POST /url Shorten a URL (Login required)
GET /:shortId Redirect to original URL
GET /analytics/:id Get analytics of a short URL (clicks)
GET / - Home page with all user URLs
GET /admin/urls - Admin: view all URLs

🛡️ Authentication & Authorization

Stateless JWT Auth: Tokens stored in localStorage / cookies

Role-based access: ADMIN / NORMAL

🔒 Protected routes redirect to /?login=true if user not logged in → triggers popup

🖌️ Frontend Features

💻 Responsive design (desktop + mobile)

🔘 Login popup on Home page

📋 Analytics Table for each URL

📋 User Dashboard with list of URLs

📋 Copy URL button for convenience

🌙 Tailwind CSS Dark Mode friendly

📝 Usage Tips
