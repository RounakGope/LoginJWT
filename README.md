<div align="center">

# 🔐 LoginJWT

### Full-Stack Authentication System with Spring Boot & React

A modern, secure authentication application featuring JWT-based user management, email verification, and a responsive UI.

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=for-the-badge&logo=spring&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Project Structure](#-project-structure) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- 🔒 **JWT Authentication** - Secure token-based authentication system
- 📧 **Email Verification** - User verification via email with SMTP integration
- 🔐 **Password Security** - Bcrypt password hashing
- 🎨 **Modern UI** - Responsive React frontend with Bootstrap styling
- 🚀 **Fast Development** - Vite for lightning-fast frontend builds
- 🗄️ **Database Integration** - PostgreSQL for reliable data storage
- 🔄 **RESTful API** - Clean and well-structured REST endpoints
- 🛡️ **Spring Security** - Comprehensive security configuration

---

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.x
- **Security:** Spring Security + JWT
- **Database:** PostgreSQL
- **Build Tool:** Maven
- **Email:** JavaMailSender with STARTTLS

### Frontend
- **Library:** React 18.x
- **Build Tool:** Vite 5.x
- **Styling:** Bootstrap 5
- **HTTP Client:** Axios
- **Routing:** React Router

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:

- **Java 17** or higher
- **Node.js 16** or higher
- **Maven 3.6** or higher
- **PostgreSQL 12** or higher

### Installation

#### 1️⃣ Clone the Repository

git clone https://github.com/RounakGope/LoginJWT.git
cd LoginJWT

text

#### 2️⃣ Backend Setup
Navigate to Server directory
cd Server

Configure database in application.properties
src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/your_database
spring.datasource.username=your_username
spring.datasource.password=your_password

Configure email settings
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password

Install dependencies and run
mvn clean install
mvn spring-boot:run
The backend server will start at `http://localhost:8080`

#### 3️⃣ Frontend Setup

Navigate to Client directory
cd ../Client

Install dependencies
npm install
Start development server
npm run dev

text

The frontend will start at `http://localhost:5173`

---

## 📁 Project Structure
LoginJWT/
├── Client/ # React Frontend
│ ├── public/ # Static assets
│ ├── src/
│ │ ├── components/ # React components
│ │ ├── pages/ # Page components
│ │ ├── services/ # API service calls
│ │ └── App.jsx # Main app component
│ ├── package.json
│ └── vite.config.js
│
├── Server/ # Spring Boot Backend
│ ├── src/
│ │ ├── main/
│ │ │ ├── java/
│ │ │ │ └── com/yourpackage/
│ │ │ │ ├── config/ # Security & email config
│ │ │ │ ├── controller/ # REST controllers
│ │ │ │ ├── dto/ # Data transfer objects
│ │ │ │ ├── entity/ # JPA entities
│ │ │ │ ├── repository/ # Database repositories
│ │ │ │ ├── security/ # JWT & security classes
│ │ │ │ └── service/ # Business logic
│ │ │ └── resources/
│ │ │ └── application.properties
│ │ └── test/
│ └── pom.xml
│
├── .gitignore
└── README.md

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT token |
| POST | `/api/auth/verify-email` | Verify user email |
| GET | `/api/auth/user` | Get current user details (Protected) |

### Request Examples

#### Register User
POST /api/auth/register
{
"username": "johndoe",
"email": "[email protected]",
"password": "SecurePass123!"
}

text

#### Login
POST /api/auth/login
{
"email": "[email protected]",
"password": "SecurePass123!"
}
#### Response
{
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
"type": "Bearer",
"username": "johndoe",
"email": "[email protected]"
}

---

## ⚙️ Configuration

### Backend Configuration

Edit `Server/src/main/resources/application.properties`:

Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/loginjwt
spring.datasource.username=postgres
spring.datasource.password=yourpassword

JWT Configuration
jwt.secret=YourSecretKeyHere
jwt.expiration=86400000

Email Configuration
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
### Frontend Configuration

Create `.env` file in `Client/` directory:

VITE_API_URL=http://localhost:8080/api

The production build will be in `Client/dist/` directory.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Rounak Gope**

- GitHub: [@RounakGope](https://github.com/RounakGope)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/rounakgope)

---

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- JWT.io for JWT resources
- Bootstrap for UI components

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by Rounak Gope

</div>
