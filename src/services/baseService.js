// const pool = require('../config/database')
const { Op } = require('sequelize')
const sequelize = require('../config/database')
class BaseService {
  table
  model
  constructor(table, model) {
    this.table = table
    this.model = model
  }

  async getSingle(id, customQuery = {}) {
    const result = await this.model.findByPk(id, customQuery)
    return this.buildResponse(result)
    // const client = await pool.connect()
    // try {
    //   const result = await client.query(`SELECT * FROM ${this.table} WHERE id = $1`, [id])
    //   return this.buildResponse(result.rows[0])
    // } finally {
    //   client.release()
    // }
  }

  cleanParams(params) {
    return Object.fromEntries(
      Object.entries(params).filter(([key, value]) => value !== undefined && value !== null && value !== '' && value !== 'null' && value !== 'undefined'))
  }


  async get(params, customQuery = {}) {
    // how to include limit and offset in the query using sequelize
    const { limit = 10, offset = 0, search, ...paramsWithoutLimitAndOffset } = params || {}
    let searchQuery = {}
    const newParams = Object.keys(this.cleanParams(paramsWithoutLimitAndOffset))
    const areNewParamsEmpty = newParams.length === 0 && !search
    if (search) {
      searchQuery = {
        name: {
          [Op.iLike]: `%${search}%`
        }
      }
    }
    if (newParams.some(key => key.includes('date'))) {
      newParams.forEach(key => {
        const searchDate = new Date(paramsWithoutLimitAndOffset[key])

        // Extract only the date portion (without the time)
        const searchDateWithoutTime = new Date(searchDate.getFullYear(), searchDate.getMonth(), searchDate.getDate())
        if (key.includes('date')) {
          searchQuery = {
            ...searchQuery,
            [key]: {
              [Op.gte]: searchDateWithoutTime,
              [Op.lt]: new Date(searchDateWithoutTime.getTime() + 24 * 60 * 60 * 1000)
            }
          }
        }
      })
    }

    const result = await this.model.findAll({
      where: areNewParamsEmpty ? undefined : {
        ...this.cleanParams(paramsWithoutLimitAndOffset),
        ...searchQuery,
      },
      limit: parseInt(limit),
      offset: parseInt(offset),
      ...customQuery
    })

    return this.buildResponse(result)
    // const client = await pool.connect()
    // try {
    //   // should build the query based on the params object (can include limit and offset + other query params related to the table columns)
    //   const { query, values } = this.buildFetchQuery(params)
    //   console.log(query)
    //   const result = await client.query(query, values)
    //   return this.buildResponse(result.rows)
    // } finally {
    //   client.release()
    // }
  }

  async post(data, customQuery = {}) {
    const result = await this.model.create(this.cleanParams(data), customQuery)
    return this.buildResponse(result)
    // const client = await pool.connect()
    // try {
    //   const { query, values } = this.buildCreateQuery(data)
    //   const result = await client.query(query, values)
    //   return this.buildResponse(result.rows[0])
    // } finally {
    //   client.release()
    // }
  }

  async put(id, data, customQuery = {}) {
    const result = await this.model.update(data, {
      where: {
        id,
      },
      returning: true,
      plain: true,
      ...customQuery,
    })
    const newResult = JSON.parse(JSON.stringify(result)).find(data => data !== null)
    return this.buildResponse(newResult)

    // const client = await pool.connect()
    // try {
    //   const { query, values } = this.buildUpdateQuery(id, data)
    //   const result = await client.query(query, values)
    //   return this.buildResponse(result.rows[0])
    // } finally {
    //   client.release()
    // }
  }

  async delete(id, customQuery = {}) {
    const result = await this.model.destroy({
      where: {
        id,
      },
      ...customQuery,
    })

    return this.buildResponse(result)
    // const client = await pool.connect()
    // try {
    //   await client.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
    //   return this.buildResponse(null)
    // } finally {
    //   client.release()
    // }
  }

  buildResponse(data) {
    return {
      status: 'success',
      success: true,
      data: JSON.parse(JSON.stringify(data))
    }
  }

  // buildFetchQuery(params) {
  //   let query = `SELECT * FROM ${this.table}`
  //   const conditions = []
  //   const values = []

  //   if (params) {
  //     Object.keys(params).forEach((key, index) => {
  //       console.log(key)
  //       if (key === 'offset' || key === 'limit') {
  //         return // Skip pagination parameters for filtering conditions
  //       }
  //       conditions.push(`${key} = $${values.length + 1}`)
  //       values.push(params[key])
  //     })

  //     if (conditions.length > 0) {
  //       query += ' WHERE ' + conditions.join(' AND ')
  //     }

  //     if (params.offset !== undefined) {
  //       query += ` OFFSET $${values.length + 1}`
  //       values.push(params.offset)
  //     }

  //     if (params.limit !== undefined) {
  //       query += ` LIMIT $${values.length + 1}`
  //       values.push(params.limit)
  //     }
  //   }

  //   return { query, values }
  // }

  // buildCreateQuery(data) {
  //   const columns = Object.keys(data).join(', ')
  //   const placeholders = Object.keys(data).map((key, index) => `$${index + 1}`).join(', ')
  //   return {
  //     query: `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`,
  //     values: Object.values(data)
  //   }
  // }

  // buildUpdateQuery(id, data) {
  //   const columns = Object.keys(data).map((key, index) => `${key} = $${index + 1}`).join(', ')
  //   const values = Object.values(data)
  //   return {
  //     query: `UPDATE ${this.table} SET ${columns} WHERE id = $${id} RETURNING *`,
  //     values
  //   }
  // }
}

module.exports = BaseService