-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ecommerce_app_db
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6oue0maw421roerltnxn16a38` (`cart_id`,`product_id`),
  KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`),
  CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKpcttvuq4mxppo8sxggjtn5i2c` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK64t7ox312pqal3p7fg9o503c2` (`user_id`),
  CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (1,'2026-08-13 21:51:58.405938','2026-08-13 21:51:58.405938',5),(2,'2026-10-17 20:13:31.192853','2026-10-17 20:13:31.192853',3),(3,'2026-11-06 01:12:02.461099','2026-11-06 01:12:02.461099',6);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKt8o6pivur7nn124jehx7cygw5` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'2026-08-04 22:44:24.311280','Electronic Updated description Items','Electronics','2026-08-04 22:47:35.305575'),(2,'2026-08-09 21:55:54.262798','Clothing, footwear and accessories','Fashion','2026-08-09 21:55:54.262798'),(3,'2026-08-09 21:58:06.982953','Sports equipment and fitness gear','Sports & Fitness','2026-08-09 21:58:06.982953');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `subtotal` decimal(10,2) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,74999.00,2,149998.00,1,13),(2,3499.00,3,10497.00,1,16),(3,5499.00,2,10998.00,2,14),(4,8495.00,1,8495.00,2,15),(5,114900.00,1,114900.00,3,5),(6,7290.00,1,7290.00,4,17),(7,1799.00,1,1799.00,5,19),(8,59900.00,1,59900.00,6,7),(9,9999.00,1,9999.00,6,12),(10,7290.00,1,7290.00,7,17),(11,179999.00,2,359998.00,8,2),(12,9995.00,1,9995.00,9,10),(13,8495.00,1,8495.00,10,15),(14,134999.00,1,134999.00,11,3),(15,7290.00,1,7290.00,12,17),(16,3499.00,1,3499.00,13,16),(17,9999.00,1,9999.00,14,12),(18,74999.00,1,74999.00,15,13),(19,74999.00,2,149998.00,16,13),(20,54227.00,1,54227.00,16,22),(21,1799.00,1,1799.00,17,19),(22,1799.00,1,1799.00,18,19),(23,54227.00,1,54227.00,19,22),(24,3499.00,1,3499.00,20,16),(25,1799.00,1,1799.00,21,19),(26,3499.00,3,10497.00,22,16),(27,3499.00,3,10497.00,23,16),(28,3499.00,3,10497.00,24,16),(29,179999.00,2,359998.00,25,2),(30,9995.00,3,29985.00,25,10),(31,6999.00,1,6999.00,25,18),(32,7290.00,2,14580.00,26,17);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `status` enum('CANCELLED','CONFIRMED','DELIVERED','PENDING','SHIPPED') NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  `payment_status` enum('FAILED','PAID','PENDING','REFUNDED') NOT NULL,
  `razorpay_order_id` varchar(255) DEFAULT NULL,
  `razorpay_payment_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKa6lcukl97obp0fbd2hqauihcu` (`razorpay_order_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2026-08-23 16:06:05.580317','CANCELLED',160495.00,'2026-08-23 16:11:27.130450',5,'PENDING',NULL,NULL),(2,'2026-08-25 14:19:38.238377','PENDING',19493.00,'2026-08-25 14:19:38.238377',5,'PENDING',NULL,NULL),(3,'2026-08-26 17:01:12.317754','CANCELLED',114900.00,'2026-08-27 15:42:12.905792',5,'PENDING',NULL,NULL),(4,'2026-08-27 15:43:04.747065','PENDING',7290.00,'2026-09-14 21:42:15.355278',5,'PENDING','order_TbyinhKeVUIzFf',NULL),(5,'2026-09-02 22:13:04.653469','PENDING',1799.00,'2026-09-02 22:13:04.653469',5,'PENDING',NULL,NULL),(6,'2026-09-20 12:15:30.617615','CONFIRMED',69899.00,'2026-09-20 12:22:05.583347',5,'PAID','order_TeCGsBpKqRdvYO','pay_TeCNLbOecGy5ff'),(7,'2026-09-20 12:24:35.514016','CONFIRMED',7290.00,'2026-09-20 12:29:25.890233',5,'PAID','order_TeCQSZqwKOnQnB','pay_TeCVDVkuEI2Eya'),(8,'2026-09-20 12:49:07.272427','CONFIRMED',359998.00,'2026-09-20 12:50:08.388665',5,'PAID','order_TeCqN0SBrTXN5f','pay_TeCr6jNB8lJPlc'),(9,'2026-09-25 21:02:36.432469','CANCELLED',9995.00,'2026-09-26 15:03:08.994736',5,'PAID','order_TgJvKdJThnh9zE','pay_TgJxGVE7nO3STg'),(10,'2026-09-26 15:06:24.373127','CANCELLED',8495.00,'2026-09-26 15:09:41.645147',5,'PAID','order_TgcOBM5e02Q6SF','pay_TgcPz9CrjTYWsa'),(11,'2026-09-27 16:07:01.536695','PENDING',134999.00,'2026-09-27 16:07:13.015862',5,'FAILED','order_Th1xJ2cu00xFsk',NULL),(12,'2026-09-27 20:11:44.459545','PENDING',7290.00,'2026-09-27 20:14:56.936463',5,'FAILED','order_Th67oZ7K4oXYV3',NULL),(13,'2026-09-27 20:19:53.700510','PENDING',3499.00,'2026-09-27 20:22:07.035425',5,'FAILED','order_Th6GPH1jDAmpbM',NULL),(14,'2026-09-27 21:49:40.427835','PENDING',9999.00,'2026-09-27 21:53:08.028277',5,'FAILED','order_Th7nPf4rQwWsK2',NULL),(15,'2026-09-27 22:16:02.614181','DELIVERED',74999.00,'2026-10-02 20:17:38.292010',5,'PAID','order_Th8FFuxO12ybyc','pay_Th8H284Xk0xznt'),(16,'2026-10-17 20:15:21.779513','CONFIRMED',204225.00,'2026-10-17 20:16:38.108761',3,'PAID','order_Tp0s0J2LKHZ1Fd','pay_Tp0t03314bNSqe'),(17,'2026-10-17 20:22:59.350837','PENDING',1799.00,'2026-10-24 21:05:52.341650',3,'PENDING','order_TrnTBiNISrQ3Nt',NULL),(18,'2026-10-17 20:24:24.304794','CONFIRMED',1799.00,'2026-10-17 20:24:58.938243',3,'PAID','order_Tp11Y0PvgBSzRA','pay_Tp11oASZFJuJEm'),(19,'2026-10-24 21:38:31.644607','CONFIRMED',54227.00,'2026-10-24 21:39:37.828973',3,'PAID','order_Tro1hPJWwCn3Dd','pay_Tro2SSW1q20XUx'),(20,'2026-10-28 00:14:12.467743','CONFIRMED',3499.00,'2026-10-28 00:16:39.079405',5,'PAID','order_Tt2HxpFhg5aD2K','pay_Tt2JR7P4o4bscA'),(21,'2026-10-28 00:23:05.350667','CONFIRMED',1799.00,'2026-10-28 00:25:14.081621',5,'PAID','order_Tt2R7ALkLcI724','pay_Tt2SlztSFVk70P'),(22,'2026-10-28 22:00:06.955479','PENDING',10497.00,'2026-10-28 22:00:44.453007',5,'FAILED','order_TtOX3UHFgQblfu',NULL),(23,'2026-10-28 22:01:27.547837','PENDING',10497.00,'2026-10-28 22:02:20.676707',5,'FAILED','order_TtOYOV9L7umZXD',NULL),(24,'2026-10-28 22:02:36.452660','CONFIRMED',10497.00,'2026-10-28 22:03:12.015869',5,'PAID','order_TtOZbgGwxYWW5t','pay_TtOZsQR03CJKdb'),(25,'2026-10-30 00:40:20.093608','CONFIRMED',396982.00,'2026-10-30 00:41:57.349331',3,'PAID','order_TtpnLQiJ23ehZr','pay_TtpogGdbN4DdgJ'),(26,'2026-10-30 00:43:09.193156','CONFIRMED',14580.00,'2026-10-30 00:44:13.951846',3,'PAID','order_TtpqMUp2QZVrox','pay_Ttpr28hqGX5u6v');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) NOT NULL,
  `image_type` varchar(255) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqnq71xsohugpqwf3c9gxmsuy` (`product_id`),
  CONSTRAINT `FKqnq71xsohugpqwf3c9gxmsuy` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,'edeaf038-a052-4d54-b32a-346816b59dd5.jpg','image/jpeg','/uploads/edeaf038-a052-4d54-b32a-346816b59dd5.jpg',2),(2,'63507d9d-534a-49e1-b0e5-3e8d922fb100.jpg','image/jpeg','/uploads/63507d9d-534a-49e1-b0e5-3e8d922fb100.jpg',2),(3,'65359c01-d564-4623-aee7-bcf448b3c54b.jpg','image/jpeg','/uploads/65359c01-d564-4623-aee7-bcf448b3c54b.jpg',2),(4,'3ec3c071-b125-4e8a-9fdb-f1f4ac5378bd.jpg','image/jpeg','/uploads/3ec3c071-b125-4e8a-9fdb-f1f4ac5378bd.jpg',3),(5,'ee41a613-a271-4cfc-98ad-6e98f6fc1300.jpg','image/jpeg','/uploads/ee41a613-a271-4cfc-98ad-6e98f6fc1300.jpg',3),(6,'14aceefa-5b7b-4110-8ab1-2a23a6623456.jpg','image/jpeg','/uploads/14aceefa-5b7b-4110-8ab1-2a23a6623456.jpg',3),(7,'8906add5-e3ad-4fb5-8133-acdb57f64220.jpg','image/jpeg','/uploads/8906add5-e3ad-4fb5-8133-acdb57f64220.jpg',4),(8,'ea10b594-691f-4d17-8411-d0dc169c9530.jpg','image/jpeg','/uploads/ea10b594-691f-4d17-8411-d0dc169c9530.jpg',4),(9,'97365683-6e32-4878-bf27-07cfd1fbc5c6.jpg','image/jpeg','/uploads/97365683-6e32-4878-bf27-07cfd1fbc5c6.jpg',4),(10,'c7eb2613-1b77-4cef-a809-a64c17743cae.webp','image/webp','/uploads/c7eb2613-1b77-4cef-a809-a64c17743cae.webp',5),(11,'de7040ac-dead-4293-81aa-85efef00025a.webp','image/webp','/uploads/de7040ac-dead-4293-81aa-85efef00025a.webp',5),(12,'43bd4910-5cd6-4072-85f0-cfcdab6f7fa8.webp','image/webp','/uploads/43bd4910-5cd6-4072-85f0-cfcdab6f7fa8.webp',5),(13,'90c7fbcd-5937-420c-befe-735a1893cd96.png','image/png','/uploads/90c7fbcd-5937-420c-befe-735a1893cd96.png',6),(14,'66a20545-ff6a-4d8b-a024-efca5f8c31af.png','image/png','/uploads/66a20545-ff6a-4d8b-a024-efca5f8c31af.png',6),(15,'6ef8c171-1e44-404b-a7e9-73a0563020dc.jpg','image/jpeg','/uploads/6ef8c171-1e44-404b-a7e9-73a0563020dc.jpg',6),(16,'315a726d-61ba-44f8-a6aa-378a7eca69c5.webp','image/webp','/uploads/315a726d-61ba-44f8-a6aa-378a7eca69c5.webp',7),(17,'c3c1fb6d-849e-4113-b381-0fb385797c98.webp','image/webp','/uploads/c3c1fb6d-849e-4113-b381-0fb385797c98.webp',7),(18,'e665d4ef-22f4-49dc-9b66-85a1ad7d18cb.webp','image/webp','/uploads/e665d4ef-22f4-49dc-9b66-85a1ad7d18cb.webp',7),(19,'5ff80f77-ce4d-4843-9c56-6d72630b3ec2.jpg','image/jpeg','/uploads/5ff80f77-ce4d-4843-9c56-6d72630b3ec2.jpg',8),(20,'ec7bf681-6778-48ee-a994-94783f8ebdb6.jpg','image/jpeg','/uploads/ec7bf681-6778-48ee-a994-94783f8ebdb6.jpg',8),(21,'89269d8a-c677-4266-be78-6b97c43fa2d0.jpg','image/jpeg','/uploads/89269d8a-c677-4266-be78-6b97c43fa2d0.jpg',8),(22,'afd00694-f853-43cf-affc-941bef0e5d7a.jpg','image/jpeg','/uploads/afd00694-f853-43cf-affc-941bef0e5d7a.jpg',9),(23,'e02794cc-766e-4e97-b8bb-c9273e1c8a41.jpg','image/jpeg','/uploads/e02794cc-766e-4e97-b8bb-c9273e1c8a41.jpg',9),(24,'5f9509f4-a803-48fb-87d1-3c31856f3e9f.jpg','image/jpeg','/uploads/5f9509f4-a803-48fb-87d1-3c31856f3e9f.jpg',9),(25,'0feef1f1-8a1a-4add-a9df-a17fb49139e5.jpg','image/jpeg','/uploads/0feef1f1-8a1a-4add-a9df-a17fb49139e5.jpg',10),(26,'a2084c86-a9e0-47b2-ab51-8e25c7527828.jpg','image/jpeg','/uploads/a2084c86-a9e0-47b2-ab51-8e25c7527828.jpg',10),(27,'f9bdec44-65c7-4faf-94bb-ceddddaa9ed3.jpg','image/jpeg','/uploads/f9bdec44-65c7-4faf-94bb-ceddddaa9ed3.jpg',10),(28,'9c4028a5-7bb7-4cef-939d-1a729c39fac8.jpg','image/jpeg','/uploads/9c4028a5-7bb7-4cef-939d-1a729c39fac8.jpg',11),(29,'c03ed200-5518-4503-831b-a7f0df7a8b72.jpg','image/jpeg','/uploads/c03ed200-5518-4503-831b-a7f0df7a8b72.jpg',11),(30,'0451d9b9-18b4-4b6c-884c-e1f5f152bbec.jpg','image/jpeg','/uploads/0451d9b9-18b4-4b6c-884c-e1f5f152bbec.jpg',11),(31,'44ed806d-3ef3-410a-8d14-22f16f9391cb.jpg','image/jpeg','/uploads/44ed806d-3ef3-410a-8d14-22f16f9391cb.jpg',11),(32,'fae6e59f-0441-476e-96ae-63cbf5838144.jpg','image/jpeg','/uploads/fae6e59f-0441-476e-96ae-63cbf5838144.jpg',12),(33,'3df7705f-61a4-4498-a070-b61af9979579.jpg','image/jpeg','/uploads/3df7705f-61a4-4498-a070-b61af9979579.jpg',12),(34,'acdbccc7-6466-438b-a392-4275afe4e7cc.jpg','image/jpeg','/uploads/acdbccc7-6466-438b-a392-4275afe4e7cc.jpg',12),(35,'a11830b5-7890-48da-8a97-c7af139cb2bc.jpg','image/jpeg','/uploads/a11830b5-7890-48da-8a97-c7af139cb2bc.jpg',13),(36,'9eaa8620-6ea0-4bc1-8fc6-a977467f1348.jpg','image/jpeg','/uploads/9eaa8620-6ea0-4bc1-8fc6-a977467f1348.jpg',13),(37,'44f543b0-ce47-415f-a8f2-c8e99992b856.jpg','image/jpeg','/uploads/44f543b0-ce47-415f-a8f2-c8e99992b856.jpg',13),(38,'241d007b-8290-47af-aa86-f2638a1695be.jpg','image/jpeg','/uploads/241d007b-8290-47af-aa86-f2638a1695be.jpg',14),(39,'1cabcdf3-4c42-4938-acee-d5e8298bf689.jpg','image/jpeg','/uploads/1cabcdf3-4c42-4938-acee-d5e8298bf689.jpg',14),(40,'f32724d8-c9a2-4537-82b7-42564d9e3ab1.jpg','image/jpeg','/uploads/f32724d8-c9a2-4537-82b7-42564d9e3ab1.jpg',14),(41,'6504f45b-9dd4-42fb-a215-191292ae03cf.webp','image/webp','/uploads/6504f45b-9dd4-42fb-a215-191292ae03cf.webp',15),(42,'4e401c83-95e9-4230-ae9f-d652d4cde8b5.webp','image/webp','/uploads/4e401c83-95e9-4230-ae9f-d652d4cde8b5.webp',15),(43,'5ce5e090-b5c0-4c2a-a6a1-1d8d9eee45db.webp','image/webp','/uploads/5ce5e090-b5c0-4c2a-a6a1-1d8d9eee45db.webp',15),(44,'cac454b5-5135-4dcc-ae4b-94a9a849ec08.jpg','image/jpeg','/uploads/cac454b5-5135-4dcc-ae4b-94a9a849ec08.jpg',16),(45,'5b68086b-15bd-459a-8cd7-714e18226fa8.jpg','image/jpeg','/uploads/5b68086b-15bd-459a-8cd7-714e18226fa8.jpg',16),(46,'eec59c33-92a7-49fc-ada6-905481aef2c5.jpg','image/jpeg','/uploads/eec59c33-92a7-49fc-ada6-905481aef2c5.jpg',16),(47,'ed5ff668-5b32-41e1-ae47-1a2f053f982d.png','image/png','/uploads/ed5ff668-5b32-41e1-ae47-1a2f053f982d.png',17),(48,'3dc322c5-5a6b-4d12-b8d1-86bbd8172d69.png','image/png','/uploads/3dc322c5-5a6b-4d12-b8d1-86bbd8172d69.png',17),(49,'eaea1114-1fac-45ab-9132-57f9bc5a9a65.png','image/png','/uploads/eaea1114-1fac-45ab-9132-57f9bc5a9a65.png',17),(50,'63a7b009-d1d1-4482-b529-353c1213e411.jpg','image/jpeg','/uploads/63a7b009-d1d1-4482-b529-353c1213e411.jpg',18),(51,'afeae13a-aeda-449d-9801-530247522421.webp','image/webp','/uploads/afeae13a-aeda-449d-9801-530247522421.webp',19),(52,'faba17ad-4fb7-4789-bae1-2c094cf89e54.webp','image/webp','/uploads/faba17ad-4fb7-4789-bae1-2c094cf89e54.webp',19),(53,'0566fda2-c679-49cb-a743-d9ccb918a06c.webp','image/webp','/uploads/0566fda2-c679-49cb-a743-d9ccb918a06c.webp',19),(61,'c8c6b30e-9772-4480-9161-019ed808a676.jpg','image/jpeg','/uploads/c8c6b30e-9772-4480-9161-019ed808a676.jpg',22),(62,'78df42e8-34e0-4e59-8b83-c199b8fc717e.jpg','image/jpeg','/uploads/78df42e8-34e0-4e59-8b83-c199b8fc717e.jpg',22),(63,'a62adb8a-f5e3-4c5e-8617-d3a2168a25c1.jpeg','image/jpeg','/uploads/a62adb8a-f5e3-4c5e-8617-d3a2168a25c1.jpeg',22);
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `description` varchar(2000) DEFAULT NULL,
  `discount_percentage` double NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(38,2) NOT NULL,
  `stock_quantity` int NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,_binary '','Apple','2026-08-05 23:12:20.544293','Latest Apple Phone',5,'iPhone 17 Pro',179999.00,46,'2026-10-30 00:41:57.288565',1),(3,_binary '','Samsung','2026-08-06 22:18:11.146140','Samsung\'s flagship smartphone with S Pen and AI features',3,'Samsung Galaxy S25 Ultra',134999.00,35,'2026-08-06 22:18:11.146140',1),(4,_binary '','Sony','2026-08-09 21:44:46.689507','Industry-leading noise cancelling wireless headphones',10,'Sony WH-1000XM5',29990.00,50,'2026-08-09 21:44:46.689507',1),(5,_binary '','Apple','2026-08-09 21:45:20.368983','13-inch laptop with Apple M3 chip, 8GB RAM, 256GB SSD',5,'Apple MacBook Air M3',114900.00,20,'2026-08-27 15:42:12.912989',1),(6,_binary '','Dell','2026-08-09 21:46:47.519104','Compact ultrabook with InfinityEdge display, Intel Core i7',8,'Dell XPS 13',129990.00,15,'2026-08-09 21:46:47.519104',1),(7,_binary '','Apple','2026-08-09 21:46:56.240950','10.9-inch tablet with M1 chip, Wi-Fi + Cellular',4,'Apple iPad Air (5th Gen)',59900.00,39,'2026-09-20 12:22:05.400688',1),(8,_binary '','Apple','2026-08-09 21:47:05.102195','GPS smartwatch with always-on Retina display',6,'Apple Watch Series 10',41900.00,45,'2026-08-09 21:47:05.102195',1),(9,_binary '','boAt','2026-08-09 21:53:42.434009','True wireless earbuds with 42H playback and ENx tech',15,'boAt Airdopes 141',1299.00,120,'2026-08-09 21:53:42.434009',1),(10,_binary '','Logitech','2026-08-09 21:53:57.618500','Wireless performance mouse with quiet clicks and 8K DPI',12,'Logitech MX Master 3S',9995.00,57,'2026-10-30 00:41:57.303423',1),(11,_binary '','Samsung','2026-08-09 21:54:10.813615','Crystal display, 4K UHD resolution with smart TV features',20,'Samsung 55-inch Crystal 4K UHD Smart TV',46990.00,18,'2026-08-09 21:54:10.813615',1),(12,_binary '','JBL','2026-08-09 21:54:21.434141','Portable waterproof Bluetooth speaker with punchy sound',10,'JBL Flip 6',9999.00,69,'2026-09-20 12:22:05.403010',1),(13,_binary '','Canon','2026-08-09 21:54:30.924974','Mirrorless camera with 24.2MP APS-C sensor, ideal for content creators',7,'Canon EOS R50',74999.00,9,'2026-10-17 20:16:38.097922',1),(14,_binary '','Amazon','2026-08-09 21:54:39.430767','Smart speaker with Alexa, improved audio and thermometer',25,'Amazon Echo Dot (5th Gen)',5499.00,88,'2026-08-25 14:19:38.285203',1),(15,_binary '','Nike','2026-08-09 21:56:16.783406','Classic white leather sneakers with iconic silhouette',5,'Nike Air Force 1 \'07',8495.00,54,'2026-09-26 15:09:41.645147',2),(16,_binary '','Levi\'s','2026-08-09 21:56:33.940346','Slim fit stretch denim jeans in classic blue wash',20,'Levi\'s 511 Slim Fit Jeans',3499.00,76,'2026-10-28 22:03:12.015869',2),(17,_binary '','Ray-Ban','2026-08-09 21:56:50.717689','Gold-frame aviator sunglasses with green G-15 lenses',10,'Ray-Ban Aviator Classic',7290.00,36,'2026-10-30 00:44:13.951846',2),(18,_binary '','Yonex','2026-08-09 21:58:26.506598','Lightweight racket designed for fast swing and control',8,'Yonex Nanoflare 800 Badminton Racket',6999.00,24,'2026-10-30 00:41:57.323070',3),(19,_binary '','boAt','2026-08-09 21:58:41.380247','Fitness band with heart rate monitor and sleep tracking',30,'boAt Fastrax X1 Smart Fitness Band',1799.00,97,'2026-10-28 00:25:14.081621',3),(22,_binary '','HP','2026-10-17 20:08:05.762803','HP 15, Intel Core Ultra 5 125H (16GB DDR5, 1TB SSD) FHD, IPS, 15.6\'\'/39.6cm, Win11, M365 Basic(1yr)*Office24, Silver, 1. + HP Care Pack 2 Years Additional Warranty with Onsite Support',7,'HP 15 Laptop',54227.00,87,'2026-10-24 21:39:37.828973',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKofx66keruapi6vyqpv6f2or37` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'ROLE_ADMIN'),(2,'ROLE_USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UKdu5v5sr43g5bfnji4vb8hg5s3` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'2026-08-02 11:52:59.375062','harsh@gmail.com','Harsh','Pidurkar','password123','9876543210','2026-08-02 11:52:59.375062'),(2,'2026-08-02 13:42:21.916033','kevin@gmail.com','Kevin','Bollinger','password123','9876543211','2026-08-02 13:42:21.916033'),(3,'2026-08-02 14:22:19.771027','Ivy@gmail.com','Ivy','Jackson','$2a$10$pqTjeO8qHqhwiz6bmiAkmOymdA9zxbhm333q7YKA6NSPbicfh8J4.','9876543212','2026-08-02 14:22:19.771027'),(4,'2026-08-02 22:21:16.570079','crystal@gmail.com','Crystal','Bell','$2a$10$ZBlDSrJCd/kcDxsPF7haBuxaebRZwmh0DtTSi2nTCCidFYAusNNru','9876543213','2026-08-02 22:21:16.570079'),(5,'2026-08-03 23:05:40.295625','hanna@gmail.com','Hanna','Grey','$2a$10$Lo8vwybgvzw9gsHsZKzx.Oo0Rm5nt4RUoZ8waOda0GhEJOV2zGtD.','9876543214','2026-08-03 23:05:40.295874'),(6,'2026-11-06 01:08:18.645812','jack@gmail.com','Jack','Forest','$2a$10$D7677oAVCLPd6hzvlMSTxunbmAMSDffpHCJm4tzMUP2gSLsNQ79Py','8293138311','2026-11-06 01:08:18.645812');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `FKj6m8fwv7oqv74fcehir1a9ffy` (`role_id`),
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKj6m8fwv7oqv74fcehir1a9ffy` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES (1,1),(5,1),(1,2),(2,2),(3,2),(4,2),(5,2),(6,2);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ecommerce_app_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-11  1:25:31
