# HireSphere

A full-stack monolithic job portal application that allows users to register, log in, post and apply to jobs. Built with **Spring Boot** (backend), **React** (frontend), and **MySQL** (database).

## Features

- User authentication (Register/Login)
- Role-based access for Admin, Recruiter, and Job Seeker
- Job listing creation, update, and deletion (CRUD)
- Job application workflow
- Responsive UI with React
- RESTful APIs with Spring Boot
- MySQL for data persistence

---

## Tech Stack

- **Frontend**: React, Axios, React Router, TailwindCSS (optional)
- **Backend**: Spring Boot, Spring Security, Spring Data JPA
- **Database**: MySQL
- **Build Tools**: Maven
- **API**: RESTful Services

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Java 17+
- MySQL
- Maven

---

## Setup Instructions

### 1. Backend (Spring Boot)

#!/bin/bash

# 1. Create MySQL database
echo "Creating MySQL database 'job_portal'..."
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS job_portal;"

# 2. Run backend (Spring Boot)
echo "Starting Spring Boot backend..."
cd backend || exit
# Make sure you have configured src/main/resources/application.properties with your DB credentials
mvn spring-boot:run &
BACKEND_PID=$!
cd ..

# 3. Run frontend (React)
echo "Installing frontend dependencies..."
cd frontend || exit
npm install
echo "Starting React frontend..."
npm start &

echo "Backend running on: http://localhost:8080"
echo "Frontend running on: http://localhost:3000"

