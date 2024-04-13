const pool = require('../config/database')
const BaseService = require('./baseService')
const Employee = require('../models/employee')
const Department = require('../models/department')

class EmployeeService extends BaseService {
  // Employee:
  // - id: number
  // - name: string
  // - email: string
  // - phone: string
  // - salary: number
  // - position: string
  // - location: string
  // - date_of_joining: string
  // - date_of_birth: string
  // - image_url: string
  constructor() {
    super('employees', Employee)
    this.fetchEmployees = this.fetchEmployees.bind(this)
    this.fetchEmployeeById = this.fetchEmployeeById.bind(this)
    this.updateEmployee = this.updateEmployee.bind(this)
    this.deleteEmployee = this.deleteEmployee.bind(this)
    this.createEmployee = this.createEmployee.bind(this)
  }

  fetchEmployees = async (params) => {
    console.log('GETTING EMPLOYEES', params)
    return await this.get(params, this.customEmployeeQuery)
  }

  fetchEmployeeById = async (id) => {
    return await this.getSingle(id, this.customEmployeeQuery)
  }

  updateEmployee = async (id, data) => {
    return await this.put(id, data, this.customEmployeeQuery)
  }

  deleteEmployee = async (id) => {
    return await this.delete(id)

    // const client = await pool.connect()
    // try {
    //   await client.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
    // } finally {
    //   client.release()
    // }
  }

  createEmployee = async (data) => {
    // const client = await pool.connect()
    // const columns = Object.keys(data).join(', ')
    // const placeholders = Object.keys(data).map((key, index) => `$${index + 1}`).join(', ')

    // const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`

    // const values = Object.values(data)
    // try {
    //   const { rows } = await client.query(query, values)
    //   return rows[0]
    // } finally {
    //   client.release()
    // }

    return await this.post(data, this.customEmployeeQuery)
  }

  get customEmployeeQuery() {
    return {
      include: {
        model: Department,
        as: 'department',
      }
    }
  }
}

module.exports = EmployeeService
