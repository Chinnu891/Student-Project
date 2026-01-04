-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 14, 2025 at 05:00 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_registration`
--
CREATE DATABASE IF NOT EXISTS `student_registration` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `student_registration`;

-- --------------------------------------------------------

--
-- Table structure for table `colleges`
--

CREATE TABLE `colleges` (
  `id` int(11) NOT NULL,
  `college_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `colleges`
--

INSERT INTO `colleges` (`id`, `college_name`) VALUES
(10, 'Aditya Engineering College'),
(4, 'Andhra University'),
(13, 'ANITS'),
(22, 'Bapatla Enginnering College'),
(19, 'CHIRALA ENGINEERING COLLEGE'),
(14, 'Gayatri Vidya Parishad'),
(3, 'Gitam University'),
(9, 'GVP College of Engineering'),
(18, 'IIT Bombay - Indian Institute of Technology - [IITB], Mumbai'),
(2, 'JNTU Kakinada'),
(12, 'K L University'),
(16, 'Lakireddy Bali Reddy College of Engineering'),
(21, 'Manikanta College'),
(23, 'Nagarjana University College'),
(6, 'Pragati Engineering College'),
(11, 'Raghu Engineering College'),
(5, 'SRKR Engineering College'),
(24, 'SRM College'),
(1, 'St. Ann\'s College of Engineering'),
(8, 'Vasavi College of Engineering'),
(7, 'Vignan\'s Institute of Information Technology'),
(15, 'VR Siddhartha Engineering College'),
(20, 'VRS & YRN College');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL,
  `department_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`department_id`, `department_name`) VALUES
(1, 'Education'),
(4, 'Human Resources'),
(2, 'IT'),
(3, 'Legal');

-- --------------------------------------------------------

--
-- Table structure for table `designations`
--

CREATE TABLE `designations` (
  `designation_id` int(11) NOT NULL,
  `designation_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `designations`
--

INSERT INTO `designations` (`designation_id`, `designation_name`) VALUES
(6, 'Director'),
(4, 'Assistant Manager'),
(1, 'Clerk'),
(5, 'Manager'),
(2, 'Officer'),
(3, 'Software Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `employee_id` varchar(20) NOT NULL,
  `employee_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `salary` decimal(10,2) NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `designation_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`employee_id`, `employee_name`, `dob`, `salary`, `department_id`, `designation_id`) VALUES
('112', 'Pinjala Samba Siva Rao', '1983-02-02', 18000.00, 4, 1),
('123', 'STEPHEN', '2013-03-01', 23456.00, 3, 5),
('255', 'PAUL', '1997-03-03', 6544.00, 4, 6),
('3401', 'jabrila', '1989-03-06', 78653.00, 1, 1),
('3432', 'jabrila', '1989-03-06', 78653.00, 1, 1),
('344', 'PAUL', '1997-03-03', 6544.00, 4, 6),
('3445', 'kareem', '1997-05-04', 6543.00, 1, 2),
('389', 'SAMBA', '1989-01-18', 5677.00, 1, 2),
('432', 'ram', '2025-07-01', 6543.00, 4, 3),
('43244', 'kareem', '1993-10-02', 56789.00, 3, 1),
('566', 'YOHAN', '1996-11-06', 7654.00, 4, 4),
('758', 'kareem', '1997-05-04', 6543.00, 4, 5),
('787', 'NAGARAJ', '1993-09-23', 50000.00, 3, 5),
('809', 'Sali Stephen Son', '1979-02-09', 80000.00, 1, 4),
('890', 'VIVEK', '1991-07-07', 98766.00, 2, 4),
('891', 'Sali Stephen Son', '1979-02-09', 80000.00, NULL, NULL),
('895', 'kareem', '1990-10-09', 454678.00, 4, 5),
('896', 'VIVEK', '1991-07-07', 98766.00, 4, 5),
('897', 'Charan', '1997-03-12', 70000.00, 4, 1),
('958', 'kareem', '1997-05-04', 6543.00, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `student_id` varchar(20) NOT NULL,
  `student_name` varchar(100) NOT NULL,
  `dob` date NOT NULL,
  `college_id` int(11) NOT NULL,
  `discipline` varchar(100) NOT NULL,
  `branch` varchar(100) NOT NULL,
  `father_id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`student_id`, `student_name`, `dob`, `college_id`, `discipline`, `branch`, `father_id`) VALUES
('22F01A4601', 'Prabhakar', '2004-01-06', 1, 'Engineering Technology', 'ECE', '566'),
('22F01A4602', 'Ravi Teja', '2005-12-09', 23, 'Diploma College', 'Diploma EEE', '897'),
('22F01A4612', 'K Vinod', '2004-10-19', 16, 'Engineering Technology', 'EEE', '890'),
('22F01A4622', 'Vinay', '2003-01-12', 6, 'Engineering Technology', 'CSE', '890'),
('22F01A4641', 'PULLA RAO', '1994-03-12', 3, 'Engineering Technology', 'CSE', '958'),
('22F01A4642', 'Pinjala Jey Sankar Sai', '2005-04-04', 1, 'Engineering Technology', 'ECE', '112'),
('22F01A4643', 'Sri Ram', '2001-02-21', 23, 'Engineering Technology', 'EEE', '787'),
('22F01A4644', 'PRABHAKAR', '2004-10-19', 1, 'Engineering Technology', 'Civil', '389'),
('22F01A465', 'Venkatesh', '2002-04-22', 13, 'Engineering Technology', 'CSE', '255'),
('22F01A4651', 'SALI SIEMEN', '2004-01-22', 19, 'Engineering Technology', 'ECE', '123'),
('22F01A4654', 'Sali Siemen', '2004-01-22', 24, 'Diploma College', 'Diploma EEE', '891'),
('22F01A4689', 'Sali Siemen', '2004-01-22', 2, 'Engineering Technology', 'CSE', '809'),
('22F01A4691', 'PRABHAKAR', '2004-10-19', 9, 'Medical College', 'BDS', '566'),
('22KFJOSIF', 'K Karthik', '2004-01-22', 20, 'Science & Arts College', 'BSc', '566'),
('23F05A4602', 'GOPAL KRISHNA', '1998-07-08', 19, 'Engineering Technology', 'CSE', '344'),
('23F05A4604', 'CH VAMSI KRISHNA', '2004-01-22', 19, 'Engineering Technology', 'CSE', '566');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `colleges`
--
ALTER TABLE `colleges`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `college_name` (`college_name`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`department_id`),
  ADD UNIQUE KEY `department_name` (`department_name`);

--
-- Indexes for table `designations`
--
ALTER TABLE `designations`
  ADD PRIMARY KEY (`designation_id`),
  ADD UNIQUE KEY `designation_name` (`designation_name`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`employee_id`),
  ADD KEY `department_id` (`department_id`),
  ADD KEY `designation_id` (`designation_id`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `college_id` (`college_id`),
  ADD KEY `father_id` (`father_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `colleges`
--
ALTER TABLE `colleges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `department_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `designations`
--
ALTER TABLE `designations`
  MODIFY `designation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employee`
--
ALTER TABLE `employee`
  ADD CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`department_id`),
  ADD CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`designation_id`) REFERENCES `designations` (`designation_id`);

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`college_id`) REFERENCES `colleges` (`id`),
  ADD CONSTRAINT `students_ibfk_2` FOREIGN KEY (`father_id`) REFERENCES `employee` (`employee_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
