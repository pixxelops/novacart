# NovaCart — Full-Stack E-commerce

NovaCart is a full-stack shopping application built with **Spring Boot, React, TypeScript, and MySQL**. It brings together customer shopping flows, role-based administration, and Razorpay checkout with server-side payment verification.

## Features

- **Product discovery:** browse paginated product listings and view product details.
- **Search:** find products by name or brand.
- **Customer accounts:** registration, login, and JWT-based authentication.
- **Cart and checkout:** manage cart items, create orders, and use Buy Now.
- **Payments:** Razorpay order creation, signature verification, and server-side checks for captured status, expected order, amount, and currency.
- **Order lifecycle:** order history, order details, and admin order fulfilment.
- **Inventory:** stock is updated after successful payment verification, with database locking for order and product rows.
- **Admin tools:** product management and order operations protected by role-based access controls.
- **Product images:** upload and serve product images through the backend.

## Tech stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, TypeScript, Vite, Tailwind CSS |
| Backend | Java, Spring Boot, Spring Security, Spring Data JPA / Hibernate |
| Database | MySQL |
| Authentication | JWT |
| Payments | Razorpay |
| Build tools | Maven, npm |

## Repository structure

```text
novacart/
├── ecommerce-frontend/  # React + TypeScript application
├── src/main/java/       # Spring Boot application
├── src/main/resources/  # Backend configuration
├── pom.xml              # Maven build
└── mvnw / mvnw.cmd      # Maven wrapper
```

## Prerequisites

- Java version compatible with the project's `pom.xml`
- MySQL Server
- Node.js and npm
- Razorpay test-mode account and API keys for payment testing

## Run locally

### 1. Configure MySQL and backend environment

Create a MySQL database named `ecommerce_app_db` (or update the datasource URL in `src/main/resources/application.properties`).

The backend imports an optional `.env` file from the backend working directory. Configure these values in that file or through your environment:

```properties
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
JWT_SECRET=replace_with_a_long_random_secret
RAZORPAY_KEY_ID=your_razorpay_test_key_id
RAZORPAY_KEY_SECRET=your_razorpay_test_key_secret
```

Never commit real credentials. Keep Razorpay secrets on the backend; only the public key ID should be sent to the frontend for checkout.

### 2. Start the backend

From the repository root:

**Windows PowerShell**

```powershell
.\mvnw.cmd spring-boot:run
```

**macOS / Linux**

```bash
./mvnw spring-boot:run
```

The API runs at `http://localhost:8080` by default.

### 3. Start the frontend

In a second terminal:

```bash
cd ecommerce-frontend
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

To point the frontend to a different backend origin, set `VITE_API_BASE_URL` in `ecommerce-frontend/.env`:

```properties
VITE_API_BASE_URL=http://localhost:8080
```

This value is the backend origin; do not append `/api`. Uploaded product image URLs use the same origin.

## Payment testing

Use Razorpay **Test Mode** credentials during local development. Complete checkout through the frontend so Razorpay can return the payment ID and signature. The backend verifies the signature and retrieves payment details before marking the order as paid.

## Screenshots

Add screenshots here as the UI is finalized. Suggested shots:

- Homepage and product collection
- Product details
- Cart and checkout
- Order history
- Admin product management

## Build checks

Frontend production build and lint:

```bash
cd ecommerce-frontend
npm run build
npm run lint
```

Backend compile:

```bash
./mvnw clean compile
```

On Windows, use `mvnw.cmd`.

## Security notes

- Do not commit `.env`, database credentials, JWT signing secrets, or Razorpay key secrets.
- Use test keys for development and separate production secrets if deploying.
- Production deployment should use HTTPS, environment-managed secrets, restricted CORS origins, and an appropriate database migration strategy.
- This project has been exercised with manual API and checkout tests; the README does not claim a full automated test suite or production deployment.

## Repository

https://github.com/pixxelops/novacart
