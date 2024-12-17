const express = require('express');
const router = express.Router();
let employees = require('../data/employees');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  res.status(200).send('Hello employees!');
});

router.get('/employees', (req, res, next) => {
  res.json(employees);
});

router.get('/employees/random', (req, res, next) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});

router.get('/employees/:id', (req, res, next) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

router.use((req, res, next) => {
  const token = req.header('authorization');
  if (token) {
    next();
  } else {
    res.status(403).send('Please log in');
  }
});

router.post('/employees', (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).send('Please provide a name for the employee.');
  }
  employees.push({ id: uuidv4(), name });
  res.send(employees);
});

module.exports = router;
