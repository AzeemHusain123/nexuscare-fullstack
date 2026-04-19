-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Apr 19, 2026 at 10:34 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nexuscare_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
CREATE TABLE IF NOT EXISTS `complaints` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `status` enum('Open','Resolved') DEFAULT 'Open',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `complaints`
--

INSERT INTO `complaints` (`id`, `username`, `description`, `status`, `created_at`) VALUES
(13, 'azaam', 'i have exam today, but my wifi is too much slow now', 'Resolved', '2025-12-20 14:27:03'),
(2, 'azeem', 'There is a water leakage from the main pipe near the community park entrance. It\'s causing muddy patches and mosquitoes are increasing.', 'Open', '2025-12-11 04:45:30'),
(3, 'azeem', 'Garbage collection has been irregular this week. Bins are overflowing near Building 5, and it\'s starting to smell bad.', 'Open', '2025-12-11 04:45:39'),
(4, 'azeem', 'The elevator in Tower C has been making strange noises and stops between floors occasionally. Please get it checked urgently.', 'Open', '2025-12-11 04:45:51'),
(5, 'azeem', 'Noise from ongoing construction work after 10 PM is disturbing residents. Kindly enforce the permitted timing rules.', 'Open', '2025-12-11 04:46:05'),
(6, 'askee', 'The main gate security camera is not working properly since yesterday. It keeps flickering, and the night vision is completely dark. This is a serious security concern for the entire community.', 'Open', '2025-12-11 05:10:47'),
(7, 'askee', 'There is a broken street light pole near the children\'s play area in Block B. The light has been out for a week, and the pole is leaning dangerously. Kids play there in the evening, and it\'s a safety hazard.', 'Resolved', '2025-12-11 05:11:08'),
(10, 'azeem', 'security issue', 'Resolved', '2025-12-11 11:05:22'),
(11, 'azaam', 'Internet is not working', 'Resolved', '2025-12-20 13:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'azeem', '$2b$12$MBl025bPGjMuXJrJwVKayuVw0JhlXiqLzoXnyl7TCn8CIQVdtU1Py', 'user'),
(2, 'askee', '$2b$12$GS2Ekk8nRumYb3xMZkvWhukExbowBVza.v5nQvkBNT3A4DCsMoNBq', 'user'),
(4, 'admin', '$2b$12$t4liqW2L.gpqKuH0fd3iOeedQTQoEqEIBNTgd4VuBCWwSwIxI/7y.', 'admin'),
(5, 'azaam', '$2b$12$I3qvTgURobuSNhjc3Di12esuNMdzprvSsLNa8LdVuSKB9LewpzFUm', 'user');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
