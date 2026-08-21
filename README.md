# 🏨 StayEasy — Enterprise Hospitality & Dual-Portal Dining Platform

[![Java 21](https://img.shields.io/badge/Java-21-orange.svg)](https://www.oracle.com/java/)
[![Spring Boot 3.3.2](https://img.shields.io/badge/Spring_Boot-3.3.2-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Spring Security 6](https://img.shields.io/badge/Spring_Security-6.0-green.svg)](https://spring.io/projects/spring-security)
[![React 18](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **StayEasy** is a production-grade, full-stack multi-tenant hospitality management and gourmet dining platform. Engineered with a **Spring Boot 3 RESTful microservice backend** and a **React 18 TypeScript frontend**, it features mathematical Haversine GPS radius queries, automated 12% GST compliance engines, role-based access control (RBAC), dynamic UPI QR code payments, and a cryptographic anti-scam offline cash escrow verification ledger.

---

## 🏛️ System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                   React 18 + TypeScript Client                         │
│   (Luminous Sapphire UI • Vite • Recharts • Framer Motion • Axios)     │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST / JSON
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│             Spring Security 6 & JWT Filter Chain                      │
│   (Stateless JWT Validation • Role-Based RBAC: GUEST / HOST / ADMIN)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
    ┌───────────────────────────────┼───────────────────────────────┐
    ▼                               ▼                               ▼
┌──────────────────────┐┌──────────────────────┐┌──────────────────────┐
│  ListingController   ││  BookingController   ││  PaymentController   │
│  - Haversine GPS API ││  - 12% GST Engine    ││  - Anti-Scam Ledger  │
│  - Dynamic Radius    ││  - Promo Validator   ││  - Cash Handshake    │
└──────────┬───────────┘└──────────┬───────────┘└──────────┬───────────┘
           │                       │                       │
           └───────────────────────┼───────────────────────┘
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    Spring Data JPA / Hibernate Layer                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                  Relational Database (H2 / MySQL)                      │
│   (Users • Listings • Bookings • Orders • Offers • Payments Ledger)    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Key Engineering Highlights

### 1. 📍 Haversine Geodesic Distance Engine
Implemented the mathematical **Haversine formula** in pure Java (`ListingServiceImpl.java`) to compute great-circle distances between user latitude/longitude coordinates and listed luxury properties:
$$\text{distance} = 2R \cdot \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta \text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta \text{lon}}{2}\right)}\right)$$
Enables sub-millisecond radius filtering (e.g., within 10 km, 50 km, or nationwide).

### 2. 🧾 Automated 12% GST Compliance & Promo Code Engine
- **Server-Side Authoritative Pricing:** Eliminates client payload tampering by recalculating nightly room rates directly from database entities.
- **Tax Breakdown:** Enforces statutory **12% GST (6% CGST + 6% SGST)** on room reservations and optional in-room dining packages.
- **Dynamic Promo Engine:** Supports percentage-based (`PERCENTAGE` with max caps) and flat deduction (`FLAT`) coupon validation.

### 3. 🛡️ Anti-Scam Offline Cash Handshake Protocol
To eliminate guest-host payment disputes for cash-on-arrival transactions, the system features a **Dual-Party Digital Handshake**:
- Records currency note denominations (₹500, ₹200, ₹100, ₹50) during check-in.
- Generates shared immutable tax invoices (`BILL-XXXXX`) and transaction audit trails.

### 4. 📱 Dynamic UPI QR Code Payment Simulator
Integrated instant UPI QR code generation (Google Pay, PhonePe, Paytm, BHIM) with a 5-minute countdown timer and NPCI bank escrow verification simulation.

### 5. 🔐 Stateless JWT Security Architecture
- Spring Security 6 filter chain with `OncePerRequestFilter`.
- BCrypt password hashing for secure authentication.
- Strict Role-Based Access Control (`GUEST`, `HOST`, `RESTAURANT`, `ADMIN`).

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Backend Core** | Java 21, Spring Boot 3.3.2, Spring MVC, Maven |
| **Security** | Spring Security 6, JWT (`jjwt 0.11.5`), BCrypt |
| **Data & Persistence** | Spring Data JPA, Hibernate ORM, H2 In-Memory DB / MySQL |
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Visualizations** | Recharts (Host revenue and booking volume analytics) |
| **API Documentation** | Swagger UI / OpenAPI 3.0, Postman Collection |

---

## 📡 REST API Specifications

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/v1/auth/register` | Public | Register new user account (Guest / Host) |
| `POST` | `/api/v1/auth/login` | Public | Authenticate user & return stateless JWT |
| `GET` | `/api/v1/listings` | Public | Search & filter properties (City, Price, Category) |
| `GET` | `/api/v1/listings/nearby` | Public | Geolocation nearby search (lat, lng, radiusKm) |
| `POST` | `/api/v1/listings` | `HOST, ADMIN` | Add new flat / luxury property |
| `POST` | `/api/v1/bookings` | `Authenticated` | Create room booking with 12% GST calculation |
| `POST` | `/api/v1/offers/validate` | Public | Validate promo discount coupon code |
| `GET` | `/api/v1/payments/pending-offline` | `HOST, ADMIN` | Fetch pending cash handshake reservations |
| `PUT` | `/api/v1/payments/{id}/confirm-offline` | `HOST, ADMIN` | Verify cash notes & issue tax receipt |

---

## 🚀 Getting Started Locally

### Prerequisites
- **JDK 21** or higher
- **Node.js 18+** & **npm**
- **Apache Maven 3.8+**

### 1. Clone the Repository
```bash
git clone https://github.com/nigamkumar76685763-cloud/stayeasy-platform.git
cd stayeasy-platform
```

### 2. Launch Backend (Spring Boot)
```bash
cd backend-java
mvn spring-boot:run
```
*Backend runs on `http://localhost:5000`*  
*Swagger API Docs available at `http://localhost:5000/swagger-ui/index.html`*

### 3. Launch Frontend (React + Vite)
In a separate terminal (from root directory):
```bash
npm install
npm run dev
```
*Frontend runs on `http://localhost:3000`*

---

## 🧪 Automated Testing
An exportable **Postman Collection** is included at [`StayEasy_Postman_Collection.json`](./StayEasy_Postman_Collection.json) covering:
- Authentication & JWT Token extraction
- Geolocation Haversine Search tests
- 12% GST Tax Invoicing calculations
- Negative Wallet Defense assertions

---

## 📄 License
This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
