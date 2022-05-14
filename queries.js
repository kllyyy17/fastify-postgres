const { Client } = require('pg')
const { v4:uuidv4 } = require('uuid') 
require('dotenv').config() 
const client = new Client({ 
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    port: 5432, 
}) 

client.connect();

const getEmployees = (request, response) => {
    client.query("SELECT * FROM public.employees", (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows)
    })
    client.end;
}

const getEmployeeById = (request, response) => {
    const {id} = request.params
    client.query("SELECT * FROM public.employees WHERE id = $1", 
    [id], 
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(results.rows)
    })
}

const createEmployee = (request, response) => {
    const id = uuidv4()
    const {name, dob, phone, address} = request.body
    client.query("INSERT INTO public.employees (id, name, dob, phone, address) VALUES ($1, $2, $3, $4, $5)",
    [id, name, dob, phone, address], 
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Employee added with ID: ${id}`)
    })
}

const updateEmployee = (request, response) => {
    const {id} = request.params
    const {name, dob, phone, address} = request.body
    client.query("UPDATE public.employees SET name = $1, dob = $2, phone = $3, address = $4 WHERE id = $5",
    [name, dob, phone, address, id], 
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Employee updated with ID: ${id}`)
    })
}

const deleteEmployee = (request, response) => {
    const {id} = request.params
    client.query("DELETE FROM public.employees WHERE id = $1",
    [id], 
    (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).send(`Employee deleted with ID: ${id}`)
    })
}

module.exports = {getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee};