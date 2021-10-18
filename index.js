const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const mysql = require('mysql2/promise');
const express = require("express")
require("dotenv").config()
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
console.log(`   
    ███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ████████╗██████╗  █████╗ ██╗  ██╗███████╗██████╗ 
    ██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██║ ██╔╝██╔════╝██╔══██╗
    █████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗         ██║   ██████╔╝███████║█████╔╝ █████╗  ██████╔╝
    ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝         ██║   ██╔══██╗██╔══██║██╔═██╗ ██╔══╝  ██╔══██╗
    ███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗       ██║   ██║  ██║██║  ██║██║  ██╗███████╗██║  ██║
    ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
`
)
const db = mysql.createConnection({host:'localhost', user: 'root', password: "", database: 'compony'});

function main() {
    // get the client
    // query database
    // const [employees] = await connection.query('SELECT first_name, id FROM employee ');
    // console.log(employees);
    
    
    inquirer.prompt({
        name:"command",
        type:"list",
        message:"Choose an action",
        choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department"]
    })
    .then(res => {
        switch(res.command){
            case "View all employees":
                getEmployee()
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
main()
const sql = "SELECT * FROM employee"
function getEmployee(){
    db.query(sql, (err, rows) => {
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

