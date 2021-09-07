INSERT INTO department(id,name)
VALUES (01,"01department");

INSERT INTO role(id, title, salary, department_id)
VALUES (01, "junior", 20.10, 01),
       (02, "manager", 25.55, 01);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES (01, "John", "Doe", 01, 02),
       (02, "Sam", "Jane", 02, 01);