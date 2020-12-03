CREATE DATABASE `nx-study`;
CREATE USER `nx-study`@'%' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON `nx-study`.* TO 'nx-study'@'%' IDENTIFIED BY 'mysql';
GRANT ALL PRIVILEGES ON `nx-study`.* TO 'nx-study'@'localhost' IDENTIFIED BY 'mysql';
