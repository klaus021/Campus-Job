# 🎓 UGV Marketplace — University Freelance Platform

<p align="center">
  <img src="https://img.shields.io/badge/Frontend-React%20+%20Vite-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Styling-Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Backend-PHP%208+-777BB4?style=for-the-badge&logo=php" />
  <img src="https://img.shields.io/badge/Database-MySQL%208-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Currency-BDT%20৳-green?style=for-the-badge" />
</p>

---

## 📖 Table of Contents

- [About the System](#-about-the-system)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
  - [Frontend Setup](#1-frontend-setup)
  - [Database Setup](#2-database-setup-mysql)
  - [Backend Setup](#3-backend-setup-php)
  - [Connecting Frontend to Backend](#4-connecting-frontend-to-backend)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Department Categories](#-department-categories)
- [Demo Accounts](#-demo-accounts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📋 About the System

**UGV Marketplace** is a web-based freelance marketplace application designed specifically for university students. Inspired by the best features of **Fiverr** and **Upwork**, it creates a friendly and supportive environment where students can:

- **Post jobs** and hire fellow students for projects, assignments, and micro-tasks
- **Offer gigs** showcasing their own skills and expertise
- **Browse & apply** to available opportunities filtered by department
- **Communicate** via real-time messaging
- **Track payments** in BDT (Bangladeshi Taka ৳)
- **Build reputation** through a comprehensive rating & review system

The platform categorizes all services by academic departments (CSE, EEE, Civil, Mechanical, Cyber Security, and Other), making it easy for students to find relevant help within their field of study.

---

## ✨ Features

| # | Feature | Description |
|---|---------|-------------|
| 1 | **User Registration & Login** | Secure authentication with university email, department selection, and skill profiling |
| 2 | **Profile Management** | Complete profiles with bio, skills, department, university, avatar, ratings, and portfolio |
| 3 | **Job Posting** | Post jobs/projects with budget (BDT), deadline, required skills, and department category |
| 4 | **Gigs/Service Listing** | Create Fiverr-style gigs with pricing, delivery time, tags, and cover images |
| 5 | **Browse & Apply** | Search and filter gigs/jobs by department, price, rating; submit proposals with cover letters |
| 6 | **Messaging** | Real-time 1-to-1 messaging between buyers and sellers |
| 7 | **Notifications** | Real-time notifications for orders, messages, reviews, applications, and payments |
| 8 | **Rating & Review System** | 5-star rating system with written reviews after order completion |
| 9 | **Payment Tracking** | Full transaction history, earnings/spending tracking, wallet balance (Currency: **BDT ৳**) |
| 10 | **Dashboard** | Comprehensive analytics with earnings, active orders, gigs, and jobs overview |
| 11 | **Department Filtering** | Filter by CSE, EEE, Civil, Mechanical, Cyber Security, and Other |
| 12 | **Order Management** | Full order lifecycle: Active → Delivered → Completed with status tracking |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Vite 7** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Zustand** | State management |
| **Lucide React** | Icon library |

### Backend
| Technology | Purpose |
|-----------|---------|
| **PHP 8+** | Server-side API |
| **MySQL 8** | Relational database |
| **PDO** | Database abstraction |
| **Apache/Nginx** | Web server |

---

## 📸 Screenshots

The application includes the following pages:
- 🏠 **Home Page** — Hero section, department categories, featured gigs, top freelancers
- 🔍 **Browse Gigs** — Grid view with department filters, search, and sorting
- 💼 **Find Jobs** — List view with department filters and application system
- 📋 **Gig Detail** — Full gig info, seller profile, reviews, order button
- 📝 **Job Detail** — Job requirements, proposal submission, applicant management
- 💬 **Messages** — WhatsApp-style chat interface
- 📊 **Dashboard** — Analytics, recent orders, my gigs/jobs
- 👤 **Profile** — Full profile with gigs, reviews, and wallet
- 📦 **Orders** — Buying/selling tabs with status management
- 🔔 **Notifications** — Categorized notification center
- 💰 **Payments** — Transaction history with earnings/spending summary

---

## 📁 Project Structure

```
ugv-marketplace/
│
├── 📂 src/                          # React Frontend
│   ├── 📂 components/
│   │   ├── Navbar.tsx               # Navigation bar
│   │   ├── HomePage.tsx             # Landing page
│   │   ├── GigsPage.tsx             # Browse gigs
│   │   ├── GigDetailPage.tsx        # Single gig view
│   │   ├── JobsPage.tsx             # Browse jobs
│   │   ├── JobDetailPage.tsx        # Single job view
│   │   ├── AuthPages.tsx            # Login & Register
│   │   ├── MessagesPage.tsx         # Messaging
│   │   ├── DashboardPage.tsx        # User dashboard
│   │   ├── ProfilePage.tsx          # User profile
│   │   ├── EditProfilePage.tsx      # Edit profile
│   │   ├── OrdersPage.tsx           # Order management
│   │   ├── NotificationsPage.tsx    # Notifications
│   │   ├── CreatePages.tsx          # Create gig/job forms
│   │   └── PaymentsPage.tsx         # Payment tracking
│   ├── 📂 store/
│   │   └── index.ts                 # Zustand state management
│   ├── 📂 services/
│   │   └── api.ts                   # API service layer (HTTP requests)
│   ├── 📂 utils/
│   │   └── cn.ts                    # Tailwind merge utility
│   ├── App.tsx                      # Root component
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Global styles
│
├── 📂 backend/                      # PHP Backend
│   ├── 📂 config/
│   │   └── database.php             # MySQL connection
│   ├── 📂 api/
│   │   ├── auth/
│   │   │   ├── login.php            # POST /api/auth/login
│   │   │   └── register.php         # POST /api/auth/register
│   │   ├── users/
│   │   │   ├── profile.php          # GET/PUT /api/users/profile
│   │   │   └── index.php            # GET /api/users
│   │   ├── gigs/
│   │   │   ├── index.php            # GET/POST /api/gigs
│   │   │   └── detail.php           # GET /api/gigs/{id}
│   │   ├── jobs/
│   │   │   ├── index.php            # GET/POST /api/jobs
│   │   │   ├── detail.php           # GET /api/jobs/{id}
│   │   │   └── apply.php            # POST /api/jobs/apply
│   │   ├── orders/
│   │   │   ├── index.php            # GET/POST /api/orders
│   │   │   └── update.php           # PUT /api/orders/update
│   │   ├── messages/
│   │   │   ├── index.php            # GET /api/messages
│   │   │   └── send.php             # POST /api/messages/send
│   │   ├── notifications/
│   │   │   └── index.php            # GET/PUT /api/notifications
│   │   ├── reviews/
│   │   │   └── index.php            # GET/POST /api/reviews
│   │   └── payments/
│   │       └── index.php            # GET /api/payments
│   ├── 📂 middleware/
│   │   └── auth.php                 # JWT authentication middleware
│   ├── 📂 sql/
│   │   └── schema.sql               # Complete database schema
│   ├── .htaccess                    # Apache URL rewriting
│   └── index.php                    # API router/entry point
│
├── 📄 index.html                    # HTML entry point
├── 📄 package.json                  # Node.js dependencies
├── 📄 vite.config.ts                # Vite configuration
├── 📄 tsconfig.json                 # TypeScript configuration
├── 📄 .env.example                  # Environment variables template
└── 📄 README.md                     # This file
```

---

## 📌 Prerequisites

Make sure you have the following installed:

| Software | Version | Download |
|----------|---------|----------|
| **Node.js** | 18+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 9+ | Comes with Node.js |
| **PHP** | 8.0+ | [php.net](https://www.php.net/) |
| **MySQL** | 8.0+ | [mysql.com](https://dev.mysql.com/downloads/) |
| **Apache** or **XAMPP** | Latest | [apachefriends.org](https://www.apachefriends.org/) |
| **Composer** (optional) | Latest | [getcomposer.org](https://getcomposer.org/) |

> 💡 **Tip:** For the easiest setup, use [XAMPP](https://www.apachefriends.org/) which bundles Apache, PHP, and MySQL together.

---

## 🚀 Installation & Setup

### 1. Frontend Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/ugv-marketplace.git
cd ugv-marketplace

# Install Node.js dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

The frontend runs at `http://localhost:5173` by default.

> **Note:** The frontend currently works with local state (Zustand store with sample data). To connect to the PHP backend, see [Step 4](#4-connecting-frontend-to-backend).

---

### 2. Database Setup (MySQL)

#### Option A: Using MySQL CLI

```bash
# Login to MySQL
mysql -u root -p

# Create the database
CREATE DATABASE ugv_marketplace;

# Use the database
USE ugv_marketplace;

# Import the schema
SOURCE backend/sql/schema.sql;
```

#### Option B: Using phpMyAdmin (XAMPP)

1. Open phpMyAdmin at `http://localhost/phpmyadmin`
2. Click **"New"** to create a database
3. Name it `ugv_marketplace` and click **Create**
4. Click the **Import** tab
5. Choose the file `backend/sql/schema.sql`
6. Click **Go** to execute

---

### 3. Backend Setup (PHP)

#### Using XAMPP:

1. **Copy the backend folder** to your XAMPP web root:
   ```bash
   # On Windows
   cp -r backend/ C:/xampp/htdocs/ugv-marketplace-api/

   # On macOS
   cp -r backend/ /Applications/XAMPP/htdocs/ugv-marketplace-api/

   # On Linux
   cp -r backend/ /opt/lampp/htdocs/ugv-marketplace-api/
   ```

2. **Configure the database connection** in `backend/config/database.php`:
   ```php
   private $host = "localhost";
   private $db_name = "ugv_marketplace";
   private $username = "root";
   private $password = "";  // Default XAMPP password is empty
   ```

3. **Start Apache and MySQL** from XAMPP Control Panel

4. **Test the API:**
   ```bash
   curl http://localhost/ugv-marketplace-api/api/gigs/
   ```

#### Using PHP Built-in Server:

```bash
cd backend
php -S localhost:8000
```

---

### 4. Connecting Frontend to Backend

Update the API base URL in `src/services/api.ts`:

```typescript
const API_BASE_URL = 'http://localhost/ugv-marketplace-api/api';
// or if using PHP built-in server:
// const API_BASE_URL = 'http://localhost:8000/api';
```

Then modify the Zustand store (`src/store/index.ts`) to use API calls instead of local state. The `src/services/api.ts` file provides all the necessary API functions.

---

## 📡 API Documentation

### Authentication

| Method | Endpoint | Description | Body |
|--------|----------|-------------|------|
| `POST` | `/api/auth/register` | Register new user | `{ name, email, password, department, bio, skills, university }` |
| `POST` | `/api/auth/login` | Login user | `{ email, password }` |

### Users

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/users` | Get all users | No |
| `GET` | `/api/users/profile?id={id}` | Get user profile | No |
| `PUT` | `/api/users/profile` | Update own profile | Yes |

### Gigs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/gigs` | List gigs (with filters) | No |
| `GET` | `/api/gigs/detail?id={id}` | Get gig details | No |
| `POST` | `/api/gigs` | Create new gig | Yes |

**Query Parameters for GET /api/gigs:**
- `department` — Filter by department (CSE, EEE, Civil, etc.)
- `search` — Search in title, tags, description
- `sort` — Sort by: newest, popular, rating, price-low, price-high
- `min_price` / `max_price` — Price range filter

### Jobs

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/jobs` | List jobs (with filters) | No |
| `GET` | `/api/jobs/detail?id={id}` | Get job details | No |
| `POST` | `/api/jobs` | Create new job | Yes |
| `POST` | `/api/jobs/apply` | Apply to a job | Yes |
| `PUT` | `/api/jobs/apply` | Accept/reject application | Yes |

### Orders

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/orders` | Get user's orders | Yes |
| `POST` | `/api/orders` | Create order (place order on gig) | Yes |
| `PUT` | `/api/orders/update` | Update order status | Yes |

### Messages

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/messages?user_id={id}` | Get conversation | Yes |
| `GET` | `/api/messages` | Get all conversations | Yes |
| `POST` | `/api/messages/send` | Send message | Yes |

### Notifications

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/notifications` | Get user's notifications | Yes |
| `PUT` | `/api/notifications` | Mark as read | Yes |

### Reviews

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/reviews?gig_id={id}` | Get reviews for gig | No |
| `GET` | `/api/reviews?user_id={id}` | Get reviews for user | No |
| `POST` | `/api/reviews` | Create review | Yes |

### Payments

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/payments` | Get transaction history | Yes |

---

## 🗄 Database Schema

The database consists of the following tables:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    users      │     │     gigs     │     │     jobs     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id (PK)      │──┐  │ id (PK)      │     │ id (PK)      │
│ name         │  │  │ seller_id(FK)│──┐  │ client_id(FK)│──┐
│ email        │  │  │ title        │  │  │ title        │  │
│ password     │  │  │ description  │  │  │ description  │  │
│ department   │  │  │ department   │  │  │ department   │  │
│ bio          │  │  │ price        │  │  │ budget       │  │
│ skills       │  │  │ delivery_days│  │  │ deadline     │  │
│ university   │  │  │ tags         │  │  │ skills       │  │
│ rating       │  │  │ rating       │  │  │ status       │  │
│ review_count │  │  │ review_count │  │  │ assigned_to  │  │
│ balance      │  │  │ orders_count │  │  │ created_at   │  │
│ completed    │  │  │ image        │  │  └──────────────┘  │
│ created_at   │  │  │ created_at   │  │                    │
└──────────────┘  │  └──────────────┘  │                    │
                  │                    │                    │
┌──────────────┐  │  ┌──────────────┐  │  ┌──────────────┐  │
│ applications │  │  │    orders    │  │  │   messages   │  │
├──────────────┤  │  ├──────────────┤  │  ├──────────────┤  │
│ id (PK)      │  │  │ id (PK)      │  │  │ id (PK)      │  │
│ job_id (FK)  │──┘  │ gig_id (FK)  │──┘  │ sender_id(FK)│──┘
│ freelancer_id│     │ job_id (FK)  │     │ receiver_id  │
│ cover_letter │     │ buyer_id(FK) │     │ content      │
│ proposed_amt │     │ seller_id(FK)│     │ is_read      │
│ status       │     │ amount       │     │ created_at   │
│ created_at   │     │ status       │     └──────────────┘
└──────────────┘     │ delivery_date│
                     │ created_at   │     ┌──────────────┐
┌──────────────┐     └──────────────┘     │ transactions │
│   reviews    │                          ├──────────────┤
├──────────────┤     ┌──────────────┐     │ id (PK)      │
│ id (PK)      │     │notifications │     │ from_id (FK) │
│ order_id(FK) │     ├──────────────┤     │ to_id (FK)   │
│ reviewer_id  │     │ id (PK)      │     │ amount       │
│ reviewee_id  │     │ user_id (FK) │     │ type         │
│ gig_id (FK)  │     │ type         │     │ description  │
│ rating       │     │ title        │     │ status       │
│ comment      │     │ content      │     │ created_at   │
│ created_at   │     │ is_read      │     └──────────────┘
└──────────────┘     │ created_at   │
                     └──────────────┘
```

---

## 🏫 Department Categories

Services and jobs are categorized by university departments:

| Department | Code | Description |
|-----------|------|-------------|
| 🖥 Computer Science & Engineering | `CSE` | Web dev, app dev, programming, data science |
| ⚡ Electrical & Electronic Engineering | `EEE` | Circuit design, MATLAB, Arduino, IoT |
| 🏗 Civil Engineering | `Civil` | AutoCAD, structural design, estimation |
| ⚙️ Mechanical Engineering | `Mechanical` | SolidWorks, 3D modeling, CAD/CAM |
| 🔒 Cyber Security | `Cyber Security` | Penetration testing, security audits |
| 📚 Other | `Other` | Presentations, tutoring, writing, etc. |

---

## 🔐 Demo Accounts

Use these accounts to test the application:

| Name | Email | Password | Department |
|------|-------|----------|------------|
| Rahim Ahmed | `rahim@ugv.edu` | `123456` | CSE |
| Fatima Khan | `fatima@ugv.edu` | `123456` | EEE |
| Arif Hassan | `arif@ugv.edu` | `123456` | Civil |
| Nusrat Jahan | `nusrat@ugv.edu` | `123456` | CSE |
| Kamal Uddin | `kamal@ugv.edu` | `123456` | Mechanical |
| Sara Begum | `sara@ugv.edu` | `123456` | Cyber Security |

---

## ⚙️ Environment Variables

Create a `.env` file in the project root (for frontend):

```env
VITE_API_BASE_URL=http://localhost/ugv-marketplace-api/api
```

For the PHP backend, configure `backend/config/database.php`:

```php
DB_HOST=localhost
DB_NAME=ugv_marketplace
DB_USERNAME=root
DB_PASSWORD=
DB_PORT=3306
```

---

## 🌐 Deployment

### Frontend Deployment

```bash
# Build the production bundle
npm run build

# The output will be in the dist/ folder
# Deploy to any static hosting: Netlify, Vercel, GitHub Pages, etc.
```

### Backend Deployment

1. Upload the `backend/` folder to your PHP hosting (e.g., cPanel, DigitalOcean)
2. Import `backend/sql/schema.sql` into your production MySQL database
3. Update `backend/config/database.php` with production credentials
4. Ensure Apache mod_rewrite is enabled
5. Update the frontend's API URL to point to production backend

### CORS Configuration

The backend includes CORS headers for development. For production, update the allowed origins in `backend/index.php`:

```php
header("Access-Control-Allow-Origin: https://your-production-domain.com");
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines

- Follow TypeScript best practices for frontend code
- Use PSR-12 coding standards for PHP code
- Write meaningful commit messages
- Add comments for complex logic
- Test all API endpoints before submitting PR

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Team TR!X** — University of Global Village

---

## 🙏 Acknowledgments

- Inspired by [Fiverr](https://www.fiverr.com/) and [Upwork](https://www.upwork.com/)
- Built with love by university students, for university students ❤️
- Icons by [Lucide](https://lucide.dev/)
- UI components styled with [Tailwind CSS](https://tailwindcss.com/)

---

<p align="center">
  Made with ❤️ at University of Global Village
  <br />
  <strong>UGV Marketplace © 2025</strong>
</p>
