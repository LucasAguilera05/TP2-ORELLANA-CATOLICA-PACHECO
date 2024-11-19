-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-11-2024 a las 03:48:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alumnos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `deleted` tinyint(4) DEFAULT 0,
  `legajo` bigint(20) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `dni` bigint(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `students`
--

INSERT INTO `students` (`id`, `lastname`, `deleted`, `legajo`, `firstname`, `dni`, `email`, `createdAt`, `updatedAt`) VALUES
(1, 'aguilera', 0, 52594, 'lucas', 44070121, 'lucasaguilera', NULL, '2024-11-14 02:09:45'),
(2, 'orellana', 0, 52593, 'luc', 44070122, 'lucas@gmail.com', NULL, '0000-00-00 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `legajo` (`legajo`),
  ADD UNIQUE KEY `dni` (`dni`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `legajo_2` (`legajo`),
  ADD UNIQUE KEY `dni_2` (`dni`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `legajo_3` (`legajo`),
  ADD UNIQUE KEY `dni_3` (`dni`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `legajo_4` (`legajo`),
  ADD UNIQUE KEY `dni_4` (`dni`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `legajo_5` (`legajo`),
  ADD UNIQUE KEY `dni_5` (`dni`),
  ADD UNIQUE KEY `email_5` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
