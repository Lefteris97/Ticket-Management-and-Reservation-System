CREATE DATABASE f1tickets;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `google_id` varchar(255) DEFAULT 'none',
  `fname` varchar(100) NOT NULL,
  `lname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'user',
  `created_at` date NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `circuit_name` varchar(255) NOT NULL,
  `event_date` varchar(45) NOT NULL,
  `event_time` varchar(45) NOT NULL,
  `total_capacity` int NOT NULL,
  `flag_icon` varchar(255) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `circuit_map` varchar(255) NOT NULL,
  `completed` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`event_id`),
  UNIQUE KEY `event_id_UNIQUE` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `stands` (
  `stand_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `stand_name` varchar(255) NOT NULL,
  `price` int DEFAULT NULL,
  `capacity` int NOT NULL,
  PRIMARY KEY (`stand_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `stands_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `tickets` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `stand_id` int NOT NULL,
  `user_id` int NOT NULL,
  `attended` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ticket_id`),
  KEY `event_id` (`event_id`),
  KEY `stand_id` (`stand_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `tickets_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `tickets_ibfk_2` FOREIGN KEY (`stand_id`) REFERENCES `stands` (`stand_id`),
  CONSTRAINT `tickets_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
