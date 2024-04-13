# Project Title: SpeedLane Task
## Project Title: Employees Lookup Application

## Description: 
This is the backend part of the employee application, where users can browse, filter, search, create and delete employees. The backend is built using Node.js, Express.js, and PostgreSQL.

## Instructions to run the project:
1. Clone the repository
2. Run `yarn install` to install all the dependencies
3. Run `yarn dev` to start the server
4. The server will be running on `http://localhost:3000`
5. Postgres database is required to run this project
6. Create a `.env` file and add the following variables:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_DATABASE=your_db_name
```

## Progress on project and changes done
1. Created the project structure
2. Added the database connection
3. Started with Vanilla Node.js in the beginning then switched to Express.js and afterwards the addition of ORM sequelize: small example on the changes that were done: (I left out some commented out code in some files since changes were not commited to the repository, so history doesn't show)
```javascript
// Vanilla Node.js
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello World');
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});


// Express.js
const express = require('express')
const app = express()

const employeeRouter = require('./src/routes/employee')
const departmentRouter = require('./src/routes/department')

app.use(express.json())

app.use('/employees', employeeRouter)
app.use('/departments', departmentRouter)

app.listen(3000, () => {
  console.log('Server listening on port 3000')
})

// EmployeeService.js

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE
})

const createEmployee = async (data) => {
  const client = await pool.connect()
  const columns = Object.keys(data).join(', ')
  const placeholders = Object.keys(data).map((key, index) => `$${index + 1}`).join(', ')

  const query = `INSERT INTO ${this.table} (${columns}) VALUES (${placeholders}) RETURNING *`

  const values = Object.values(data)
  try {
    const { rows } = await client.query(query, values)
    return rows[0]
  } finally {
    client.release()
  }
}

// Express.js with Sequelize

  createEmployee = async (data) => {
    return await this.post(data, this.customEmployeeQuery)
  }


  async post(data, customQuery = {}) {
    const result = await this.model.create(this.cleanParams(data), customQuery)
    return this.buildResponse(result)
  }

  buildResponse(data) {
    return {
      status: 'success',
      success: true,
      data: JSON.parse(JSON.stringify(data))
    }
  }

```

# Future changes to be done
## Future changes:
1. Add more routes and functionalities
2. Add more validations
3. Add tests
4. Add proper error handling
5. Add more documentation

