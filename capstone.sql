-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 08, 2016 at 09:33 PM
-- Server version: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `capstone`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer_itemlist`
--

CREATE TABLE `customer_itemlist` (
  `id` int(10) NOT NULL,
  `customer_id` varchar(10) NOT NULL,
  `item_id` varchar(10) NOT NULL,
  `date_of_purchase` varchar(50) NOT NULL,
  `instruction` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `customer_item_service`
--

CREATE TABLE `customer_item_service` (
  `id` int(10) NOT NULL,
  `customer_itemlist_id` int(10) NOT NULL,
  `services_date` varchar(255) NOT NULL,
  `feedback` varchar(255) NOT NULL,
  `serviceprovider` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_item_service`
--

INSERT INTO `customer_item_service` (`id`, `customer_itemlist_id`, `services_date`, `feedback`, `serviceprovider`) VALUES
(1, 6, '12/12/2016', 'No Feedback', '1'),
(2, 6, '10/11/2016', 'Well i did services and its not goes well.', '2'),
(8, 6, '10/11/2016', 'New logged in', '1');

-- --------------------------------------------------------

--
-- Table structure for table `customer_List`
--

CREATE TABLE `customer_List` (
  `id` int(10) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `ssn` varchar(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phonenumber` varchar(15) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pincode` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer_List`
--

INSERT INTO `customer_List` (`id`, `fname`, `lname`, `ssn`, `email`, `phonenumber`, `address`, `pincode`) VALUES
(6, 'vijay', 'panwar', '8767', 'vijay@gmail.com', '887766473', 'New Address', 94538);

-- --------------------------------------------------------

--
-- Table structure for table `itemlist`
--

CREATE TABLE `itemlist` (
  `id` int(10) NOT NULL,
  `item_code` varchar(20) NOT NULL,
  `quantity` varchar(10) NOT NULL,
  `price` varchar(10) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `itemlist`
--

INSERT INTO `itemlist` (`id`, `item_code`, `quantity`, `price`, `description`) VALUES
(1, 'I101', '10', '300', 'New item updated');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(10) NOT NULL,
  `email_id` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `phonenumber` varchar(15) NOT NULL,
  `ssn` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pincode` varchar(8) NOT NULL,
  `state` varchar(255) NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email_id`, `password`, `fname`, `lname`, `phonenumber`, `ssn`, `role`, `address`, `pincode`, `state`, `user_type`) VALUES
(1, 'vijay@gmail.com', '12345678', 'vijay', 'panwar', '5109446256', '8767', '0', '40640 high street', '94538', 'CA', 'admin'),
(2, 'rajveer@gmail.com', '12345678', 'Rajveer', 'Solanki', '4859990993', '7897', '1', '40640 High St, apt 602', '99009', 'CA', 'marketing'),
(3, 'aamir@gmail.com', 'Rpn)2O6F', 'Aamit', 'Memon', '887766473', '8767', '', '43878 random house', '94538', 'CA', 'service provider');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer_itemlist`
--
ALTER TABLE `customer_itemlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `customer_item_service`
--
ALTER TABLE `customer_item_service`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `customer_List`
--
ALTER TABLE `customer_List`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `itemlist`
--
ALTER TABLE `itemlist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer_itemlist`
--
ALTER TABLE `customer_itemlist`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `customer_item_service`
--
ALTER TABLE `customer_item_service`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `customer_List`
--
ALTER TABLE `customer_List`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `itemlist`
--
ALTER TABLE `itemlist`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
