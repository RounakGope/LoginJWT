# LoginJWT

Complete Spring Security JWT based Authentication & Authorization  
A demo / template project illustrating how to build JWT-based login, role-based access control, and secure APIs using Spring Boot + Spring Security + JWT tokens.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
  - [Prerequisites](#prerequisites)  
  - [Installation & Running](#installation--running)  
- [Configuration](#configuration)  
- [Usage](#usage)  
- [Project Structure](#project-structure)  
- [Endpoints](#endpoints)  
- [Security & JWT Flow](#security--jwt-flow)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- User registration & login  
- JWT token generation & validation  
- Role-based access control (e.g. `USER`, `ADMIN`)  
- Secure endpoints with token-based authentication  
- Refresh token / expiration handling (if implemented)  
- Example front-end (LoginPageFront) to test login flows  

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language / Framework | Java, Spring Boot |
| Security | Spring Security, JWT (JSON Web Tokens) |
| Build Tool | Maven |
| Frontend | (Included) simple login page (e.g. React / JSP / static) |
| Others | Lombok, JPA / Hibernate, etc. |

---

## Getting Started

### Prerequisites

- Java 11+ (or whatever version your project uses)  
- Maven 3.x  
- A relational database (e.g. H2, MySQL, PostgreSQL)  
- (Optional) Node / npm if the front-end part depends on it  

### Installation & Running

1. **Clone the repository**  
   ```bash
   git clone https://github.com/RounakGope/LoginJWT.git
   cd LoginJWT
