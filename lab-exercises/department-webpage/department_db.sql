-- ==============================================================
-- PONDICHERRY UNIVERSITY - MCA LAB EXERCISE 6
-- Department Webpage Database Schema (phpMyAdmin / MySQL)
-- Database Name: department_db
-- ==============================================================

CREATE DATABASE IF NOT EXISTS department_db;
USE department_db;

-- 1. Students Table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reg_no VARCHAR(50) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    program VARCHAR(50) NOT NULL,
    semester VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Announcements / Notices Table
CREATE TABLE IF NOT EXISTS notices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    publish_date DATE NOT NULL,
    details TEXT NOT NULL
);

-- Initial Mock Data
INSERT INTO students (reg_no, full_name, email, program, semester, password_hash) VALUES
('24MCA001', 'Vishal Jaganathan', 'vishal@pondiuni.ac.in', 'MCA', 'Semester III', '$2y$10$demoHashedPasswordForLabExam'),
('24MCA002', 'Priya Sundaram', 'priya@pondiuni.ac.in', 'MCA', 'Semester III', '$2y$10$demoHashedPasswordForLabExam');

INSERT INTO notices (title, category, publish_date, details) VALUES
('CSCA 514: Web Technologies Lab Practical Exam Schedule', 'Academic', '2026-11-10', 'Internet & Web Technologies Lab practical examinations commence from Nov 15, 2026.'),
('International Conference on Artificial Intelligence and Web Systems', 'Conference', '2026-11-20', 'Department of Computer Science invites research papers for ICAIWS 2026.'),
('Campus Placement Drive by Top IT Companies', 'Placement', '2026-11-25', 'Registration opens for MCA & M.Sc Computer Science students for final semester campus drives.');
