const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const mysql = require('mysql2');
require("dotenv").config()


console.log(`   ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ████████╗██████╗  █████╗ ██╗  ██╗███████╗██████╗ 
    ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██╔══██╗
    █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗         ██║   ██████╔╝███████║█████╔╝ █████╗  ██████╔╝
    ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝         ██║   ██╔══██╗██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗
    ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗       ██║   ██║  ██║██║  ██║██║  ██╗███████╗██║  ██║
    ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`
)
const connection = mysql.createConnection({
    host:'localhost',
    user: 'root', 
    password: "", 
    database: 'compony'
});
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    main();
});
function main() {
    inquirer.prompt({
        name:"command",
        type:"list",
        message:"Choose an action",
        choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department"]
    })
    .then(answers => {
        switch (answers.command) {
            case "Add employee":
                addEmployee()
                break;
            case "Add department":
                addDepartment()
                break;

            case "Add role":
                addRole()
                break;

            case "View all departments":
                viewDepartments()
                break;

            case "View all employees":
                viewEmployees()
                break;

            case "Update employee role":
                updateEmployeeRole()
                break;
            case "View all roles":
                viewRole()
                break;
            
            default:
                connection.end()
                break;
        }
    })
    
    // console.log(commandChoses)
    // const {employeeChosen} = await inquirer.prompt({
    //     name:"employeeChosen",
    //     type:"list",
    //     message:"delete which employee?",
    //     choices:employees.map(employee => ({name: employee.first_name, value: employee}))
        
    // })
    // console.log(command)
    // console.log(employeeChosen);
    // console.log(employeeChosen.first_name);
    // console.log(employeeChosen.employeeNumber);
    // const  [employee] = await connection.query('select * FROM employees where id = ?', employeeChosen.employeeNumber);
    // console.log(command.action)
    
}

const sql = "SELECT * FROM employee"
function getEmployee(){
    connection.query(sql, (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
}
function viewRole(){
    connection.query("SELECT * FROM roles", function (err, data) {
        console.table(data);
        main();
    })
}
function addEmployee() {
    inquirer.prompt([{
            type: "input",
            name: "firstName",
            message: "What is the employees first name?"
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employees last name?"
        },
        {
            type: "number",
            name: "roleId",
            message: "What is the employees role ID?"
        },
        {
            type: "number",
            name: "managerId",
            message: "What is the employees manager's ID?"
        }
    ]).then(function(res) {
        connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [res.firstName, res.lastName, res.roleId, res.managerId], function(err, data) {
            if (err) throw err;
            console.table("Successful");
            main();
        })
    })
}

function addDepartment() {
    inquirer.prompt([{
        type: "input",
        name: "department",
        message: "What is the department that you want to add?"
    }, ]).then(function(res) {
        connection.query('INSERT INTO department (name) VALUES (?)', [res.department], function(err, data) {
            if (err) throw err;
            console.table("Successfully Inserted");
            main();
        })
    })
}

function addRole() {
    inquirer.prompt([
        {
            message: "enter title:",
            type: "input",
            name: "title"
        }, {
            message: "enter salary:",
            type: "number",
            name: "salary"
        }, {
            message: "enter department ID:",
            type: "number",
            name: "department_id"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department_id) values (?, ?, ?)", [response.title, response.salary, response.department_id], function (err, data) {
            console.table(data);
        })
        main();
    })

}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        main();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        main();
    })
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (use first name only for now)",
            type: "input",
            name: "name"
        }, {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        main();
    })

}
// inquirer
// .prompt([
//     {
//         name: "action",
//         type: "list",
//         message: "Choose an action",
//         choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department"]
//     }
// ])
// .then ((answer) => {
//     if (answer.action === "View all employees"){
//         console.log("TEST View all employees")
//         viewEmployee();
//     }
//     if (answer.action === "Add employee"){
//         console.log("TEST Add employee")
//         addEmployee();
//     }
//     if (answer.action === "Update employee role"){
//         console.log("TEST Update employee role")
//         updateEmployee();
//     }
//     if (answer.action === "View all roles"){
//         console.log("TEST View all roles")
//         viewRoles();
//     }
//     if (answer.action === "Add role"){
//         console.log("TEST Add role")
//         addRoles();
//     }
//     if (answer.action === "View all departments"){
//         console.log("TEST View all departments")
//         viewDeparment();
//     }
//     if (answer.action === "Add department"){
//         console.log("TEST Add department")
//         addDeparment();
//     }
// });
// const addEmployee = () =>
//     inquirer
//     .prompt([
//     {
//         name: "add_employee",
//         type: "input",
//         message: ""
//     }
// ])

