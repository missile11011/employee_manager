DROP DATABASE IF EXISTS compony;
CREATE DATABASE compony;
USE compony;

CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    name VARCHAR(30)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(id),
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

