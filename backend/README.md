This is a minimal Plain PHP API scaffold for local development.

## Database Setup

The project is configured to connect to a MySQL database with these credentials:
- **Host:** localhost
- **Port:** 3306
- **User:** root
- **Password:** (empty)
- **Database:** ugv_marketplace

The database has been created with all necessary tables and sample data.

## Running the Backend Server

Run the built-in PHP server from the project root:

```
php -S localhost:8000 -t backend backend/router.php
```

The server will be available at `http://localhost:8000/api/`

## Available API Endpoints

### Users
- `GET /api/users` — List all users
- `GET /api/users/{id}` — Get specific user details

### Gigs
- `GET /api/gigs` — List all gigs
- `GET /api/gigs/{id}` — Get specific gig details

### Jobs
- `GET /api/jobs` — List all jobs
- `GET /api/jobs/{id}` — Get specific job details

### Orders
- `GET /api/orders` — List all orders

### Messages
- `GET /api/messages` — List all messages

### Notifications
- `GET /api/notifications` — List all notifications

### Reviews
- `GET /api/reviews` — List all reviews

### Health Check
- `GET /api/health` — Check if API and database are working

## Database Tables

The database includes the following tables with sample data:
- `users` (6 users) — Student profiles with skills and ratings
- `gigs` (8 gigs) — Available services
- `jobs` (6 jobs) — Job postings
- `orders` (4 orders) — Purchase orders
- `messages` (5 messages) — Messages between users
- `notifications` (4 notifications) — User notifications
- `reviews` (3 reviews) — User reviews
- `transactions` (4 transactions) — Payment records

All endpoints return JSON data and support CORS.