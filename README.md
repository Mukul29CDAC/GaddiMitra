# GaaddiMitra - Vehicle Purchase & Service Platform

![GaaddiMitra Hero Image](https://via.placeholder.com/1200x600.png?text=GaaddiMitra%20Application)

**GaaddiMitra** is a full-stack web application designed to streamline the entire vehicle ownership lifecycle, from purchase to maintenance. It acts as a comprehensive marketplace connecting prospective buyers and vehicle owners with a network of verified dealers and service centers.

The platform supports two primary workflows:
1.  **New Car Purchase:** Customers can request quotations for new vehicles, and dealers can respond with competitive offers.
2.  **Vehicle Servicing:** Existing vehicle owners can submit service requests and receive quotes from trusted service centers.

---

## ✨ Core Features

### For Customers:
- **User Authentication:** Secure registration and login system with JWT-based sessions.
- **Dual Workflows:** Seamlessly switch between requesting quotes for **new car purchases** from dealers and **vehicle servicing** from service centers.
- **Service/Purchase Requests:** Submit detailed requests with vehicle specifications, problem descriptions, and photos.
- **Receive & Compare Quotations:** Get multiple, competitive quotes for both new cars and services.
- **Secure Payments:** Accept a quotation and complete the transaction securely through an integrated Razorpay payment gateway.
- **Personalized Dashboard:** Track the status of all requests (purchase and service), view quotations, and manage transaction history.
- **Notifications:** Receive real-time email and in-app notifications for new quotes and status updates.

### For Dealers & Service Centers:
- **Role-Based Access:** Separate, tailored dashboards for dealers and service centers with distinct functionalities.
- **Targeted Lead Generation:** View a filtered pool of customer requests—**"buy" requests** for dealers and **"service" requests** for centers.
- **Submit Quotations:** Respond to customer requests with detailed quotations for new vehicles or service jobs.
- **Inventory Management (Dealers):** Add, update, and showcase their vehicle inventory available for sale.
- **Transaction History:** Track payments and completed jobs or sales.

---

## 🚀 Live Demo

[Link to your live demo] `(e.g., https://gaaddimitra.your-domain.com)`

---

## 🛠️ Technology Stack

This project is a modern full-stack application built with a focus on robustness, scalability, and a great developer experience.

### Backend (Java / Spring Boot)

| Category      | Technology / Library                                                              | Purpose                                                                          |
|---------------|-----------------------------------------------------------------------------------|----------------------------------------------------------------------------------|
| **Framework** | **Spring Boot 3**                                                                 | Core application framework for rapid, convention-over-configuration development. |
| **Language**  | **Java 17**                                                                       | The primary programming language.                                                |
| **Database**  | **MySQL** with **Spring Data JPA (Hibernate)**                                    | Relational database for data persistence and ORM for object-relational mapping.  |
| **API**       | **Spring Web (MVC)**                                                              | Building a RESTful API for client-server communication.                          |
| **Security**  | **Spring Security** with **JSON Web Tokens (JWT)**                                | For authentication, authorization, and securing API endpoints.                   |
| **Payments**  | **Razorpay**                                                                      | Integrated a secure, third-party payment gateway for transactions.               |
| **Advanced**  | **Spring AOP** & **Observer Pattern**                                             | For decoupling cross-cutting concerns like notifications.                        |
| **File Handling**| **Multipart File Upload**                                                       | Storing user-uploaded images as BLOBs in the database.                           |
| **Email**     | **Spring Boot Starter Mail** (`@Async`)                                           | Sending asynchronous email notifications for a non-blocking user experience.     |
| **Build Tool**| **Maven**                                                                         | Dependency management and project build automation.                              |

### Frontend (React / Vite)

| Category      | Technology / Library                                                              | Purpose                                                                               |
|---------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| **Framework** | **React 18**                                                                      | Core library for building the user interface.                                         |
| **Build Tool**| **Vite**                                                                          | Modern, fast build tool and development server with Hot Module Replacement (HMR).     |
| **Styling**   | **Tailwind CSS** & **shadcn/ui**                                                  | Utility-first CSS framework and a component library built on Radix UI primitives.     |
| **Routing**   | **React Router v6**                                                               | Client-side routing for creating a seamless Single-Page Application (SPA) experience. |
| **State**     | **React Context API**                                                             | For managing global UI state like authentication.                                     |
| **Server State** | **TanStack Query (React Query)**                                               | For managing server state: data fetching, caching, and synchronization.             |
| **Forms**     | **React Hook Form** with **Zod**                                                  | For performant, schema-based form management and validation.                        |
| **API Calls** | **Axios**                                                                         | Promise-based HTTP client for communicating with the backend API.                   |

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Java 17+
- Maven 3.6+
- Node.js 18+
- MySQL Server

### Backend Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/gaaddimitra.git
    cd gaaddimitra/GaddiMitraBackend
    ```
2.  **Configure the database:**
    - Create a new MySQL database named `gaaddimitra_db`.
    - Open `src/main/resources/application.properties`.
    - Update `spring.datasource.username` and `spring.datasource.password` with your MySQL credentials.
3.  **Set Environment Variables:**
    - In `application.properties`, configure your JWT secret (`jwt.secret`), Razorpay keys (`razorpay.key.id`, `razorpay.key.secret`), and email credentials (`spring.mail.*`).
4.  **Run the application:**
    ```sh
    mvn spring-boot:run
    ```
    The backend server will start on `http://localhost:8080`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```sh
    cd ../GaddiMitraFrontend/client
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Set Environment Variables:**
    - Create a `.env.local` file in the `client` directory.
    - Add your public Razorpay Key ID: `VITE_RAZORPAY_KEY_ID=your_key_here`
4.  **Run the application:**
    ```sh
    npm run dev
    ```
    The frontend development server will start on `http://localhost:5173`.

---

## 🖼️ Screenshots

`(Optional but highly recommended: Add a few screenshots of your application here)`

| Login Page                                     | Customer Dashboard                                     |
| ---------------------------------------------- | ------------------------------------------------------ |
| ![Login Page](https://via.placeholder.com/400x300.png?text=Login+Screen) | ![Dashboard](https://via.placeholder.com/400x300.png?text=Customer+Dashboard) |

| Dealer Inventory                               | Payment Page                                           |
| ---------------------------------------------- | ------------------------------------------------------ |
| ![Dealer View](https://via.placeholder.com/400x300.png?text=Dealer+Inventory) | ![Payment Page](https://via.placeholder.com/400x300.png?text=Payment+Page) |


---


Project Link: [https://github.com/Mukul29CDAC/gaaddimitra]
