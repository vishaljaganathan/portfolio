-- ==============================================================
-- PONDICHERRY UNIVERSITY - MCA LAB EXERCISE 7
-- Company Portal Database Schema (phpMyAdmin / MySQL)
-- Database Name: company_db
-- ==============================================================

CREATE DATABASE IF NOT EXISTS company_db;
USE company_db;

CREATE TABLE IF NOT EXISTS company_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'employee') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Data (Admins and Employees)
INSERT INTO company_users (name, email, password_hash, role) VALUES
('Vishal Admin', 'admin@company.com', '$2y$10$demoHashAdmin123', 'admin'),
('Sita Admin', 'sita@company.com', '$2y$10$demoHashAdmin123', 'admin'),
('Rahul Employee', 'employee@company.com', '$2y$10$demoHashEmp123', 'employee'),
('Arun Employee', 'arun@company.com', '$2y$10$demoHashEmp123', 'employee');
