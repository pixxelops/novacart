# NovaCart — Full-Stack E-Commerce Platform

NovaCart is a production-deployed full-stack e-commerce application built with **React, TypeScript, Spring Boot, MySQL, JWT authentication, Razorpay, and Cloudinary**.

The application supports customer authentication, product discovery, search, shopping cart management, checkout, online payments, order management, inventory handling, and role-based administration.

## 🚀 Live Demo

**Frontend:** https://novacart-seven-psi.vercel.app/

**Backend API:** https://novacart-kf4y.onrender.com

**GitHub:** https://github.com/pixxelops/novacart

> Razorpay payments are configured for testing purposes.

---

## ✨ Features

### Customer Features

- User registration and login
- JWT-based authentication
- Browse products with pagination
- Search products by name or brand
- Product details with multiple images
- Shopping cart management
- Increase/decrease product quantities
- Remove items from cart
- Checkout flow
- Razorpay online payment
- Server-side payment signature verification
- Order creation after successful payment
- Order history
- Order details
- Inventory/stock management

### Admin Features

- Role-based access control
- Product creation and management
- Product image uploads
- Product updates and deletion
- Order management
- Order fulfilment operations

### Payment & Order Security

- Razorpay order creation on the backend
- Razorpay signature verification on the backend
- Payment status verification
- Validation of expected order ID
- Validation of expected payment amount
- Validation of payment currency
- Stock updates only after successful payment verification
- Database locking for critical order/product operations

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Java, Spring Boot, Spring Security |
| ORM | Spring Data JPA, Hibernate |
| Database | MySQL |
| Authentication | JWT |
| Payments | Razorpay |
| Image Storage | Cloudinary |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |
| Database Hosting | Aiven MySQL |
| Build Tools | Maven, npm |

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      User / Browser  │
                    └──────────┬───────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │   React + Vite       │
                    │   TypeScript         │
                    │   Tailwind CSS       │
                    │   Hosted on Vercel   │
                    └──────────┬───────────┘
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │   Spring Security    │
                    │   JWT Authentication │
                    │   JPA / Hibernate    │
                    │   Hosted on Render   │
                    └───────┬───────┬──────┘
                            │       │
                ┌───────────┘       └────────────┐
                ▼                                ▼
       ┌─────────────────┐              ┌─────────────────┐
       │   Aiven MySQL   │              │   Cloudinary    │
       │   Production DB │              │ Product Images  │
       └─────────────────┘              └─────────────────┘

                         │
                         ▼
                  ┌─────────────┐
                  │  Razorpay   │
                  │  Payments   │
                  └─────────────┘
```

---

## 📁 Project Structure

```text
novacart/
│
├── ecommerce-frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types/
│   │
│   ├── package.json
│   └── vite.config.ts
│
├── src/
│   └── main/
│       ├── java/
│       │   └── com/harsh/ecommerce/
│       │       ├── config/
│       │       ├── controller/
│       │       ├── dto/
│       │       ├── entity/
│       │       ├── exception/
│       │       ├── mapper/
│       │       ├── repository/
│       │       ├── security/
│       │       └── service/
│       │
│       └── resources/
│           ├── application.properties
│           └── application-prod.properties
│
├── pom.xml
├── mvnw
├── mvnw.cmd
└── README.md
```

---

## 🔐 Authentication

NovaCart uses **JWT-based authentication** with Spring Security.

The authentication flow is:

```text
User Login
    ↓
Spring Boot validates credentials
    ↓
JWT generated
    ↓
JWT returned to frontend
    ↓
Frontend stores authentication token
    ↓
Token attached to protected API requests
    ↓
Spring Security validates JWT
    ↓
Request authorized based on user role
```

Public product APIs remain accessible without authentication, while protected operations such as cart, checkout, orders, and administrative operations require authentication.

---

## 💳 Razorpay Payment Flow

NovaCart uses Razorpay for online payments.

The payment flow is handled through the backend to prevent the frontend from being trusted with payment verification.

```text
Frontend
   │
   │ Create checkout request
   ▼
Spring Boot
   │
   │ Create Razorpay order
   ▼
Razorpay
   │
   │ Order details
   ▼
Frontend
   │
   │ User completes payment
   ▼
Razorpay
   │
   │ Payment ID + Signature
   ▼
Spring Boot
   │
   ├── Verify Razorpay signature
   ├── Verify payment status
   ├── Verify order ID
   ├── Verify amount
   ├── Verify currency
   └── Update order + inventory
```

This ensures that successful payment processing is determined by the backend rather than trusting the frontend alone.

---

## 🖼️ Image Storage

Product images are stored using **Cloudinary**.

The backend uploads product images to Cloudinary and stores the resulting image URL in the MySQL `product_images` table.

```text
Admin uploads image
        ↓
Spring Boot
        ↓
Cloudinary
        ↓
Secure image URL
        ↓
MySQL product_images table
        ↓
React frontend
```

This prevents production images from depending on the temporary filesystem of the backend hosting environment.

---

## 🗄️ Database

NovaCart uses **MySQL** with Spring Data JPA and Hibernate.

The production database is hosted on **Aiven**.

Major entities include:

- Users
- Roles
- Products
- Categories
- Product Images
- Cart
- Cart Items
- Orders
- Order Items

Hibernate/JPA handles entity relationships and database persistence.

---

## ☁️ Production Deployment

NovaCart is deployed using separate services for scalability and separation of responsibilities.

| Component | Service |
|---|---|
| React frontend | Vercel |
| Spring Boot backend | Render |
| MySQL database | Aiven |
| Product images | Cloudinary |
| Payment gateway | Razorpay |

### Production flow

```text
Vercel
  │
  │ HTTPS REST requests
  ▼
Render
  │
  ├──────────────► Aiven MySQL
  │
  └──────────────► Cloudinary
       
Razorpay ◄──────── Backend payment integration
```

---

## 💻 Running Locally

### Prerequisites

Install:

- Java 21+
- Node.js
- npm
- MySQL
- Git

---

### 1. Clone the repository

```bash
git clone https://github.com/pixxelops/novacart.git
cd novacart
```

---

### 2. Configure the backend

Create a `.env` file for the backend environment variables.

Example:

```properties
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password

JWT_SECRET=your_secure_jwt_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit real credentials to GitHub.

---

### 3. Start the backend

From the repository root:

#### Windows

```powershell
.\mvnw.cmd spring-boot:run
```

#### macOS / Linux

```bash
./mvnw spring-boot:run
```

The backend runs on:

```text
http://localhost:8080
```

---

### 4. Start the frontend

Open another terminal:

```bash
cd ecommerce-frontend
npm install
npm run dev
```

The Vite development server will normally run on:

```text
http://localhost:5173
```

---

## ⚙️ Frontend Environment Variable

Create:

```text
ecommerce-frontend/.env
```

Example:

```properties
VITE_API_BASE_URL=http://localhost:8080
```

Do not append `/api` to this value.

---

## 🧪 Build & Validation

### Frontend

```bash
cd ecommerce-frontend
npm run lint
npm run build
```

### Backend

#### Windows

```powershell
.\mvnw.cmd clean package -DskipTests
```

#### macOS / Linux

```bash
./mvnw clean package -DskipTests
```

---

## 🔒 Security

- Environment variables are excluded from Git.
- JWT secrets are configured through environment variables.
- Razorpay secret keys remain on the backend.
- Production CORS is restricted to the deployed frontend.
- Payment signatures are verified server-side.
- Protected APIs require JWT authentication.
- Role-based authorization protects administrative operations.

---

## 📸 Screenshots

### Homepage

_Add screenshot here._

### Product Details

_Add screenshot here._

### Shopping Cart

_Add screenshot here._

### Checkout

_Add screenshot here._

### Orders

_Add screenshot here._

---

## 🎯 Project Highlights

NovaCart demonstrates practical full-stack development concepts including:

- REST API development
- React state management
- JWT authentication
- Role-based authorization
- Spring Security
- JPA/Hibernate relationships
- MySQL database design
- Pagination and search
- Cart and order lifecycle management
- Payment gateway integration
- Server-side payment verification
- Inventory management
- Cloud image storage
- Production deployment
- Frontend/backend separation
- Environment-based configuration

---

## 👨‍💻 Author

**Harsh Pidurkar**

GitHub: https://github.com/pixxelops

---

## 📄 License

This project is intended for educational and portfolio purposes.