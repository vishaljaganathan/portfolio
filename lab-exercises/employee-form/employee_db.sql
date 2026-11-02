-- ==============================================================
-- PONDICHERRY UNIVERSITY - MCA LAB EXERCISE 5
-- phpMyAdmin Database & Table Creation Script
-- Database Name: employee_db
-- Table Name: employees
-- ==============================================================

CREATE DATABASE IF NOT EXISTS employee_db;
USE employee_db;

CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    department VARCHAR(50) NOT NULL,
    join_date DATE NOT NULL,
    address TEXT NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Initial Data
INSERT INTO employees (full_name, email, phone, department, join_date, address, gender) VALUES
('Vishal Jaganathan', 'vishal@example.com', '+91 9876543210', 'engineering', '2024-06-15', 'Lawspet, Puducherry', 'male'),
('Ananya Sharma', 'ananya@example.com', '+91 9812345678', 'design', '2024-07-01', 'White Town, Puducherry', 'female'),
('Karthik Raja', 'karthik@example.com', '+91 9845123456', 'hr', '2024-08-10', 'Muthialpet, Puducherry', 'male');
