-- MySQL dump 10.13  Distrib 8.0.22, for osx10.15 (x86_64)
--
-- Host: hst-db.cttkkceqgfsb.ap-northeast-2.rds.amazonaws.com    Database: triptale
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `DAY_SKED`
--

DROP TABLE IF EXISTS `DAY_SKED`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `DAY_SKED` (
  `DAY_SKED_NO` bigint NOT NULL AUTO_INCREMENT COMMENT '일정 번호',
  `DAY_SKED_ORDER` int NOT NULL COMMENT '일차',
  `DAY_SKED_DESC` text COMMENT '일정 설명',
  `COLOR_CODE` varchar(10) DEFAULT NULL COMMENT '여행 일차 색상 코드',
  `TRIP_NO` bigint NOT NULL COMMENT '여행 번호',
  PRIMARY KEY (`DAY_SKED_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='일일 일정';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `FILE`
--

DROP TABLE IF EXISTS `FILE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `FILE` (
  `FILE_NO` bigint NOT NULL AUTO_INCREMENT COMMENT '파일 번호',
  `FILE_NM` varchar(500) DEFAULT NULL COMMENT '파일 명',
  PRIMARY KEY (`FILE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='파일';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `PLACE`
--

DROP TABLE IF EXISTS `PLACE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PLACE` (
  `PLACE_NO` int NOT NULL AUTO_INCREMENT COMMENT '장소 번호',
  `DAY_SCHEDULE_NO` bigint NOT NULL COMMENT '일정 번호',
  `PLACE_TITLE` varchar(100) NOT NULL,
  `PLACE_DESC` text COMMENT '장소 설명',
  `PLACE_NM` varchar(100) NOT NULL COMMENT '장소 명',
  `PLACE_THUMBNAIL_URL` varchar(300) DEFAULT NULL COMMENT '장소 썸네일 URL',
  `PLACE_TYPE` int NOT NULL COMMENT '장소 타입',
  `PLACE_START_TIME` time DEFAULT NULL COMMENT '장소 시작 시간',
  `PLACE_END_TIME` time DEFAULT NULL COMMENT '장소 종료 시간',
  `LATITUDE` double NOT NULL COMMENT '위도',
  `LONGITUDE` double NOT NULL COMMENT '경도',
  `PLACE_INFO_URL` varchar(300) DEFAULT NULL,
  `PLACE_ADDRESS` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PLACE_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='장소';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `TRIP`
--

DROP TABLE IF EXISTS `TRIP`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `TRIP` (
  `TRIP_NO` bigint NOT NULL AUTO_INCREMENT COMMENT '여행 번호',
  `TRIP_TITLE` varchar(100) NOT NULL COMMENT '여행 제목',
  `TRIP_DESC` text NOT NULL COMMENT '여행 설명',
  `TRIP_AREA` varchar(45) NOT NULL COMMENT '여행지',
  `LATITUDE` double NOT NULL,
  `LONGITUDE` double NOT NULL,
  `TRIP_THUMBNAIL_NO` bigint DEFAULT NULL COMMENT '여행 썸네일 번호',
  `TRIP_START_DATE` date NOT NULL COMMENT '여행 시작 일자',
  `TRIP_END_DATE` date NOT NULL COMMENT '여행 종료 일자',
  `TRIP_MATERIALS` text COMMENT '준비물',
  `REG_DATE` datetime NOT NULL COMMENT '등록일자',
  `REG_USER_NO` bigint NOT NULL,
  PRIMARY KEY (`TRIP_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='여행';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USER` (
  `USER_NO` bigint NOT NULL AUTO_INCREMENT COMMENT '사용자 번호',
  `USER_EMAIL` varchar(100) NOT NULL COMMENT '이메일',
  `USER_NICKNM` varchar(45) NOT NULL COMMENT '닉네임',
  `USER_PROFILE_IMG_URL` varchar(200) DEFAULT NULL COMMENT '프로필 이미지 URL',
  PRIMARY KEY (`USER_NO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='사용자';
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-29  0:40:54
