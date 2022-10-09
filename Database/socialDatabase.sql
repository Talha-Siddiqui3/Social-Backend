-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: database-service-internal:3306
-- Generation Time: Oct 09, 2022 at 06:50 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `main`
--

-- --------------------------------------------------------

--
-- Table structure for table `Conversation`
--

CREATE TABLE `Conversation` (
  `id` varchar(50) NOT NULL,
  `last_message` longtext,
  `last_message_sender_id` varchar(50) DEFAULT NULL,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_message_sent_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Message`
--

CREATE TABLE `Message` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `message` longtext,
  `created_at` datetime DEFAULT NULL,
  `conversation_id` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` varchar(50) NOT NULL,
  `first_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `profile_picture` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `phone_number` varchar(18) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `access_token` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `last_name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `first_name`, `profile_picture`, `bio`, `is_active`, `phone_number`, `access_token`, `last_name`) VALUES
('b0553a25-51eb-46cd-ad21-2547aebaa151', 'talha', 'https://storage.googleapis.com/social-app-data/profile-pictures/87d45c52-1af6-46f5-ad2d-b4a11bca4982cc37e459-e5ac-4339-b825-1de46a9ec66d', NULL, NULL, '+14039788236', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZU51bWJlciI6IisxNDAzOTc4ODIzNiIsImlhdCI6MTY2NTE1MzE5OSwiZXhwIjoxNjk2NzEwMTUxfQ.jNqQ0SYnPDe7hgD06LQdiMCGrV0tpExxV3xhkBpmDe0', 'siddiqui'),
('b0553a25-51eb-46cd-ad21-2547aebaa691', 'Sam', 'https://storage.googleapis.com/social-app-data/profile-pictures/87d45c52-1af6-46f5-ad2d-b4a11bca4982cc37e459-e5ac-4339-b825-1de46a9ec66d', NULL, NULL, '+1123456789', '', 'Harris');

-- --------------------------------------------------------

--
-- Table structure for table `UserConversation`
--

CREATE TABLE `UserConversation` (
  `id` varchar(50) NOT NULL,
  `user_id` varchar(50) DEFAULT NULL,
  `conversation_id` varchar(50) DEFAULT NULL,
  `last_message_seen` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Conversation`
--
ALTER TABLE `Conversation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_Conversation_User` (`last_message_sender_id`);

--
-- Indexes for table `Message`
--
ALTER TABLE `Message`
  ADD PRIMARY KEY (`id`) USING BTREE,
  ADD KEY `idProfileMessage_idx` (`user_id`),
  ADD KEY `FK_Message_Conversation` (`conversation_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indexes for table `UserConversation`
--
ALTER TABLE `UserConversation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_UserConversation_User` (`user_id`),
  ADD KEY `FK_UserConversation_Conversation` (`conversation_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Conversation`
--
ALTER TABLE `Conversation`
  ADD CONSTRAINT `FK_Conversation_User` FOREIGN KEY (`last_message_sender_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `Message`
--
ALTER TABLE `Message`
  ADD CONSTRAINT `FK_Message_Conversation` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_Message_User` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `UserConversation`
--
ALTER TABLE `UserConversation`
  ADD CONSTRAINT `FK_UserConversation_Conversation` FOREIGN KEY (`conversation_id`) REFERENCES `Conversation` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `FK_UserConversation_User` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
