const express = require('express')
const router = express.Router()
const DepartmentController = require('../controllers/departmentController')
const departmentController = new DepartmentController()

router.get('/', (request, response) => departmentController.getDepartments(request, response))

module.exports = router
