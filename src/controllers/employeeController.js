const EmployeeService = require('../services/employeeService')
const BaseController = require('./baseController')

class EmployeeController extends BaseController {
  constructor() {
    super()
    this.employeeService = new EmployeeService()
  }

  async getEmployees(request, response) {
    const params = request.query
    this.performQuery(response, () => this.employeeService.fetchEmployees(params))
  }

  async getEmployeeDetails(request, response) {
    this.performQuery(response, () => this.employeeService.fetchEmployeeById(request.params.id))
  }

  async updateEmployee(request, response) {
    this.performQuery(response, () => this.employeeService.updateEmployee(request.params.id, request.body))
  }

  async deleteEmployee(request, response) {
    this.performQuery(response, () => this.employeeService.deleteEmployee(request.params.id))
  }

  async createEmployee(request, response) {
    this.performQuery(response, () => this.employeeService.createEmployee(request.body))
  }
}

module.exports = EmployeeController
