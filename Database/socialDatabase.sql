-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: mingle
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ChatHistory`
--

DROP TABLE IF EXISTS `ChatHistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ChatHistory` (
  `idChatHistory` int NOT NULL,
  `idProfileTwo` int DEFAULT NULL,
  `idProfileOne` int DEFAULT NULL,
  `groupChatID` int DEFAULT NULL,
  PRIMARY KEY (`idChatHistory`),
  KEY `userOne_idx` (`idProfileOne`),
  KEY `userTwo_idx` (`idProfileTwo`),
  KEY `groupID_idx` (`groupChatID`),
  CONSTRAINT `groupID` FOREIGN KEY (`groupChatID`) REFERENCES `GroupChats` (`idGroupChat`),
  CONSTRAINT `userOne` FOREIGN KEY (`idProfileOne`) REFERENCES `Users` (`idProfile`),
  CONSTRAINT `userTwo` FOREIGN KEY (`idProfileTwo`) REFERENCES `Users` (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ChatHistory`
--

LOCK TABLES `ChatHistory` WRITE;
/*!40000 ALTER TABLE `ChatHistory` DISABLE KEYS */;
/*!40000 ALTER TABLE `ChatHistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `GroupChats`
--

DROP TABLE IF EXISTS `GroupChats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GroupChats` (
  `idGroupChat` int NOT NULL,
  `Name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idGroupChat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GroupChats`
--

LOCK TABLES `GroupChats` WRITE;
/*!40000 ALTER TABLE `GroupChats` DISABLE KEYS */;
/*!40000 ALTER TABLE `GroupChats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Members`
--

DROP TABLE IF EXISTS `Members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Members` (
  `idMember` int NOT NULL,
  `idGroupChat` int NOT NULL,
  `idProfile` int NOT NULL,
  PRIMARY KEY (`idMember`,`idGroupChat`,`idProfile`),
  KEY `idGroupChatMembers_idx` (`idGroupChat`),
  KEY `idProfileMember_idx` (`idProfile`),
  CONSTRAINT `idGroupChatMembers` FOREIGN KEY (`idGroupChat`) REFERENCES `GroupChats` (`idGroupChat`),
  CONSTRAINT `idProfileMember` FOREIGN KEY (`idProfile`) REFERENCES `Users` (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Members`
--

LOCK TABLES `Members` WRITE;
/*!40000 ALTER TABLE `Members` DISABLE KEYS */;
/*!40000 ALTER TABLE `Members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Messages`
--

DROP TABLE IF EXISTS `Messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Messages` (
  `idMessage` int NOT NULL,
  `groupID` int DEFAULT NULL,
  `idProfile` int NOT NULL,
  `message` longtext,
  `createdAt` datetime NOT NULL,
  PRIMARY KEY (`idMessage`,`idProfile`,`createdAt`),
  KEY `idProfileMessage_idx` (`idProfile`),
  KEY `idGroupMessage_idx` (`groupID`),
  CONSTRAINT `idGroupMessage` FOREIGN KEY (`groupID`) REFERENCES `GroupChats` (`idGroupChat`),
  CONSTRAINT `idProfileMessage` FOREIGN KEY (`idProfile`) REFERENCES `Users` (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Messages`
--

LOCK TABLES `Messages` WRITE;
/*!40000 ALTER TABLE `Messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `Messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Pictures`
--

DROP TABLE IF EXISTS `Pictures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Pictures` (
  `idProfile` int NOT NULL,
  `pictureLink` varchar(200) DEFAULT NULL,
  KEY `idProfile_idx` (`idProfile`),
  CONSTRAINT `idProfilePictures` FOREIGN KEY (`idProfile`) REFERENCES `Users` (`idProfile`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pictures`
--

LOCK TABLES `Pictures` WRITE;
/*!40000 ALTER TABLE `Pictures` DISABLE KEYS */;
/*!40000 ALTER TABLE `Pictures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `idProfile` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `profilePicture` varchar(200) DEFAULT NULL,
  `bio` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`idProfile`,`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-09-29  0:31:32
