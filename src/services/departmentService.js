const sequelize = require('../config/database')
const Department = require('../models/department')
const BaseService = require('./baseService')

class DepartmentService extends BaseService {
  // Department:
  // - id: number
  // - name: string

  constructor() {
    super('departments', Department)
    this.fetchDepartments = this.fetchDepartments.bind(this)
  }

  fetchDepartments = async () => {
    //   const client = await pool.connect()
    //   try {
    //     const result = await client.query(`SELECT * FROM ${this.table}`)
    //     return result.rows
    //   } finally {
    //     client.release()
    //   }
    // }
    return await this.get()
  }
}

module.exports = DepartmentService
