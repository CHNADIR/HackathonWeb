-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 25, 2022 at 11:38 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------
-- Database: `login_register_db`
-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `avis_activités`
--

CREATE TABLE `avis_activites` (
  `activite_id` INT(11) NOT NULL AUTO_INCREMENT,
  `nom_activite` VARCHAR(255) NOT NULL,
  `lien_activite` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`activite_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Ensuite, création de la table `evaluation` qui référence `avis_activites`
CREATE TABLE `evaluation` (
  `evaluation_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `activite_id` INT(11) NOT NULL,
  `Note` int NOT NULL,
  `Commentaire` text NOT NULL,
  PRIMARY KEY (`evaluation_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `tbl_user`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_activite_id` FOREIGN KEY (`activite_id`) REFERENCES `avis_activites`(`activite_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
COMMIT;
