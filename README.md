# 💿 vinyl-vision

> _This application was developed as part of Holmesglen Institute coursework._

**About the App:**

Vinyl Vision is a full-stack prototype e-commerce platform for discovering and collecting curated digital music. Inspired by the warmth of vinyl, it blends nostalgic design with modern web technology — offering users a simple way to browse, collect, and enjoy quality music downloads.

The app features a local cart system, allowing users to add and review tracks before checkout, and an admin dashboard for securely creating and deleting products. Product images are uploaded and managed through Cloudinary, ensuring fast and reliable media handling. All data is served via a custom RESTful API connected to Google Firestore, featuring validation, authentication, and complete CRUD functionality.

**Main Tech Stack:**

- 🔥 Firestore
- ⏩ Express
- ⚛️ React
- 🟡 Node.js

**Styling:**

- 🧁 Vanilla Extract

**Image Server:**

- ☁️ Cloudinary

## 📘 Contents

- [Local Deployment](#-local-deployment)
- [Features](#-features)
  - [Local Cart](#-local-cart)
  - [Admin Dashboard](#-admin-dashboard)
  - [Cloudinary Integration](#-cloudinary-integration)
  - [Dynamic Product Browsing](#-dynamic-product-browsing)
  - [RESTful API & Firestore](#-restful-api--firestore)
  - [Modern UI](#-modern-ui)
- [Application Design](#-application-design)
  - [Collections](#-collections)
    - [Users](#users)
    - [Music](#music)
  - [Endpoints (Backend)](#-endpoints-backend)
  - [Routes (Frontend)](#-routes-frontend)
- [License](#-license)

## ⚙️ Local Deployment

> All operations should be performed from the project’s **root directory**.

1. Configure your backend's `.env` file (`/backend/.env`).<br>
   An example configuration is provided in `/backend/.env.example`.
2. Configure your frontend's `.env` file (`/frontend/.env`).<br>
   An example configuration is provided in `/frontend/.env.example`.
3. Provide a Firebase service account key (`.json` file). This should be stored as `/backend/firebase-service-account-key.json`.
4. Install dependencies:

   ```bash
     npm install
   ```

5. Start the app:

   ```
   npm run dev
   ```

   _Or, to run each service in separate terminals:_

   ```
    npm run frontend:dev
   ```

   ```
   npm run backend:dev
   ```

Once started, the UI will be accessible within your browser.<br>

## ✨ Features

### 🛍️ Local Cart

Users can add and remove tracks from their local cart before checkout.
The cart is stored locally in the browser, allowing users to review and manage their selections easily without needing an account.

### 🔐 Admin Dashboard

Admin users have access to a secure dashboard that allows them to:

- Create new music products
- Delete existing products
- Upload and manage product images through Cloudinary

### ☁️ Cloudinary Integration

Product images are uploaded directly to Cloudinary, ensuring fast delivery and optimised media handling across the platform.

### 🔎 Dynamic Product Browsing

Music items are fetched dynamically from the Firestore database via a custom RESTful API and queries.

### ⚙️ RESTful API & Firestore

The backend API provides full CRUD functionality with validation, authentication, and secure data handling.
All music and user data are stored in Google Firestore, featuring structured queries and composite indexes for efficient performance.

### 🎨 Modern UI

Built with React.js (Vite) and styled using entirely custom Vanilla Extract, the interface is clean, responsive, and focused on delivering a smooth browsing experience.

## 🏗️ Application Design

### 📄 Collections

#### Users

| **Name**   | **Type** | **Description**                  |
| ---------- | -------- | -------------------------------- |
| `fullname` | string   | User’s full name                 |
| `email`    | string   | User’s email address (for login) |
| `password` | string   | User’s hashed password           |
| `isAdmin`  | boolean  | User’s admin privileges          |

#### Music

| **Name**       | **Type** | **Description**                                          |
| -------------- | -------- | -------------------------------------------------------- |
| `title`        | string   | Track name / title                                       |
| `artist`       | string   | Artists / producers of track                             |
| `description`  | string   | Description of track                                     |
| `genre`        | string   | Music genre                                              |
| `length`       | number   | Length of music track (in seconds – e.g. `100` = 1m:40s) |
| `price_aud`    | number   | Sale price of track (in $AUD cents – e.g. `150` = $1.50) |
| `release_date` | string   | Original release date (stored as string for simplicity)  |
| `artwork`      | string   | Link to track artwork or album cover                     |
| `featured`     | boolean  | Indicates whether the track is featured                  |

### 🔌 Endpoints (Backend)

> **Note:** <br>
> “Authenticated User” refers to a user accessing **only their own account data**.<br>
> It does not grant access to other users’ information.

| Method  | Endpoint | Access Level |
| ------- | -------- | ------------ |
| **GET** | `/api/`  | Public       |

### 🧭 Routes (Frontend)

| Name | Endpoint | Access Level |
| ---- | -------- | ------------ |
| Home | `/`      | Public       |

## 📄 License

Refer to [LICENSE](LICENSE).
