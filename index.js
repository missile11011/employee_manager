const inquirer = require('inquirer');
const sequelize = require('./config/connection');
const sql = require('mysql2');
const express = require("express")
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
inquirer
.prompt([
    {
        name: "action",
        type: "list",
        message: "Choose an action",
        choices: ["View all employees", "Add employee", "Update employee role", "View all roles", "Add role", "View all departments", "Add department"]
    }
])
.then ((answer) => {
    if (answer.action === "View all employees"){
        console.log("TEST View all employees")
        viewEmployee();
    }
    if (answer.action === "Add employee"){
        console.log("TEST Add employee")
        addEmployee();
    }
    if (answer.action === "Update employee role"){
        console.log("TEST Update employee role")
        updateEmployee();
    }
    if (answer.action === "View all roles"){
        console.log("TEST View all roles")
        viewRoles();
    }
    if (answer.action === "Add role"){
        console.log("TEST Add role")
        addRoles();
    }
    if (answer.action === "View all departments"){
        console.log("TEST View all departments")
        viewDeparment();
    }
    if (answer.action === "Add department"){
        console.log("TEST Add department")
        addDeparment();
    }
});
const addEmployee = () =>
    inquirer
    .prompt([
    {
        name: "add_employee",
        type: "input",
        message: ""
    }
])

