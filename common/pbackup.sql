-- PostgreSQL dump
--
-- Host: localhost    Database: findgames
-- ------------------------------------------------------
-- Server version: 13

-- Create the database
CREATE DATABASE findgames;
\c findgames;

-- Table structure for table `event_users`
DROP TABLE IF EXISTS event_users;
CREATE TABLE event_users (
  event_id int NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY (event_id, user_id),
  FOREIGN KEY (event_id) REFERENCES events (id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Dumping data for table `event_users`
INSERT INTO event_users (event_id, user_id) VALUES (1, 3), (1, 4);

-- Table structure for table `events`
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start TIMESTAMP NOT NULL,
  end TIMESTAMP NOT NULL,
  allDay BOOLEAN DEFAULT FALSE,
  location_id int,
  description TEXT,
  category VARCHAR(50),
  color VARCHAR(7),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (location_id) REFERENCES locations (id)
);

-- Dumping data for table `events`
INSERT INTO events (id, title, start, end, allDay, location_id, description, category, color, createdAt, updatedAt) VALUES
(1, 'Partida de D&D', '2025-02-01 18:00:00', '2025-02-01 21:00:00', FALSE, 1, 'Sesión semanal de D&D en Avinguda Diagonal.', 'partida', '#ff5733', '2025-02-04 16:18:48', '2025-02-04 16:18:48'),
(3, 'Gaming', '2025-02-03 12:30:00', '2025-02-03 20:30:00', FALSE, 2, 'Valorant', 'partida', '#ff5733', '2025-02-04 20:24:02', '2025-02-07 15:24:28'),
(4, 'DnD Game', '2025-02-06 17:00:00', '2025-02-06 20:30:00', FALSE, 2, 'Session 34', '', '', '2025-02-06 15:49:24', '2025-02-06 15:49:24'),
(5, 'Vampire The Maquerade', '2025-02-06 12:00:00', '2025-02-07 20:00:00', FALSE, 1, 'Join us!', '', '', '2025-02-06 18:23:13', '2025-02-06 18:23:13'),
(7, 'DND Sharks', '2025-02-20 15:00:00', '2025-02-20 19:00:00', FALSE, 4, 'The pink sharks strike again', '', '', '2025-02-07 15:28:38', '2025-02-07 15:41:32'),
(8, 'Pathfinder', '2025-02-11 14:00:00', '2025-02-11 20:00:00', FALSE, 5, 'Join our pe2 game!', '', '', '2025-02-07 18:44:53', '2025-02-07 18:44:53'),
(9, 'Trivia Nigth', '2025-03-03 20:00:00', '2025-03-03 22:30:00', FALSE, 1, 'Trivia nigth', '', '', '2025-02-10 15:23:58', '2025-02-10 15:23:58');

-- Table structure for table `locations`
DROP TABLE IF EXISTS locations;
CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  place VARCHAR(50) CHECK (place IN ('Shop', 'Private Table')),
  lng FLOAT,
  lat FLOAT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dumping data for table `locations`
INSERT INTO locations (id, name, place, lng, lat, createdAt, updatedAt) VALUES
(1, 'Kaburi', 'Shop', 2.17832, 41.3925, '2025-02-06 16:34:44', '2025-02-06 16:34:44'),
(2, 'Dungeon Marvels', 'Shop', 2.13064, 41.3958, '2025-02-06 16:34:44', '2025-02-06 16:34:44'),
(3, 'Carrer Cristobal de Moura', 'Private Table', 2.205, 41.4118, '2025-02-06 16:34:44', '2025-02-06 16:34:44'),
(4, 'Carrer de Verdaguer', 'Private Table', 2.1762, 41.3869, '2025-02-06 18:25:23', '2025-02-06 18:25:23'),
(5, 'El Nucli', 'Shop', 2.13725, 41.3783, '2025-02-07 17:35:32', '2025-02-07 17:35:32');

-- Table structure for table `users`
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  nickname VARCHAR(45),
  email VARCHAR(255) UNIQUE,
  level VARCHAR(50) CHECK (level IN ('Advanced', 'Beginner')),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dumping data for table `users`
INSERT INTO users (id, nickname, email, level, createdAt, updatedAt) VALUES
(1, 'Alice', 'alice.martinez@email.com', 'Advanced', '2025-02-02 12:20:40', '2025-02-02 12:20:40'),
(2, 'Carlos', 'carlos.lopez@email.com', 'Beginner', '2025-02-02 12:20:40', '2025-02-02 12:20:40'),
(3, 'Edu', 'eduard@email.com', 'Advanced', '2025-02-02 13:16:50', '2025-02-10 11:42:56'),
(4, 'Lara', 'laraa@email.com', 'Advanced', '2025-02-02 13:20:47', '2025-02-10 11:42:42');
