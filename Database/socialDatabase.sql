-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: database-service-internal:3306
-- Generation Time: Oct 01, 2022 at 04:06 AM
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
  `id` int NOT NULL,
  `last_message` int NOT NULL,
  `last_message_sender_id` int NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Message`
--

CREATE TABLE `Message` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `message` longtext,
  `created_at` datetime NOT NULL,
  `conversation_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `profile_picture` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL,
  `phone_number` varchar(18) NOT NULL,
  `access_token` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `UserConversation`
--

CREATE TABLE `UserConversation` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `conversation_id` int NOT NULL,
  `last_message_seen` tinyint(1) NOT NULL
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
