-- ==============================================================
-- PONDICHERRY UNIVERSITY - MCA LAB EXERCISE 8
-- Contact Management Application Database Schema (phpMyAdmin / MySQL)
-- Database Name: contacts_db
-- Table Name: contacts
-- ==============================================================

CREATE DATABASE IF NOT EXISTS contacts_db;
USE contacts_db;

CREATE TABLE IF NOT EXISTS contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100) NOT NULL,
    category ENUM('Work', 'Personal', 'Family', 'Friends', 'Other') DEFAULT 'Personal',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Contacts
INSERT INTO contacts (name, phone, email, category, notes) VALUES
('Vishal Jaganathan', '+91 9876543210', 'vishal@example.com', 'Work', 'MCA Student & Full Stack Developer'),
('Aravind Kumar', '+91 9845123456', 'aravind.k@example.com', 'Friends', 'College Project Partner'),
('Dr. R. Subramanian', '+91 9443219870', 'hod.cs@pondiuni.ac.in', 'Work', 'Head of Department, Computer Science'),
('Sneha Reddy', '+91 9811223344', 'sneha.reddy@example.com', 'Personal', 'UI/UX Designer');
