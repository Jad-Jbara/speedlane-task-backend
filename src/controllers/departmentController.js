const DepartmentService = require('../services/departmentService')
const BaseController = require('./baseController')

class DepartmentController extends BaseController {
  constructor() {
    super()
    this.service = new DepartmentService()
  }

  async getDepartments(request, response) {
    this.performQuery(response, () => this.service.fetchDepartments())
  }
}

module.exports = DepartmentController
