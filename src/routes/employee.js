
const express = require('express')
const router = express.Router()
const EmployeeController = require('../controllers/employeeController')
const employeeController = new EmployeeController()

router.get('/', (request, response) => employeeController.getEmployees(request, response))
router.get('/:id', (request, response) => employeeController.getEmployeeDetails(request, response))
router.put('/:id', (request, response) => employeeController.updateEmployee(request, response))
router.delete('/:id', (request, response) => employeeController.deleteEmployee(request, response))
router.post('/', (request, response) => employeeController.createEmployee(request, response))

module.exports = router
