# Project Title: SpeedLane Task (Backend)
## Project Title: Employees Lookup Application

## Description: 
This is the backend part of the employee application, where users can browse, filter, search, create and delete employees. The backend is built using Node.js, Express.js, and PostgreSQL.

## Pre-requisite Instructions to set-up the project:
1. Install Node.js version v21.7.1 (run `node -v` in your terminal to check your current version)
2. Install Yarn package manager, any version should work I have `1.22.22` (run `yarn -v` in your terminal to check your current)
3. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/) (version 16)
4. Add postgres to your system path, on MacOS you can do this by adding the following line to your `.bash_profile` or `.zshrc` file:
    ```bash
    export PATH=/Library/PostgreSQL/16/bin:$PATH
    ```
    This will allow you to run `psql` from your terminal
6. Install NodeMon globally by running the following command in your terminal:
    ```bash
    # yarn
    yarn global add nodemon

    #npm 
    npm install -g nodemon
    ```
    This will allow auto-reloading of the server when changes are made (for faster development process)

5. Create a new database in PostgreSQL, you can do this by running `psql` then the following command in your terminal:
    ```sql
    CREATE DATABASE speedlane_backend_task;
    ```

6. Create a table in the database by running the following command in your terminal:
    ```sql
    CREATE TABLE employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        phone VARCHAR(100),
        salary INT,
        position VARCHAR(100),
        location VARCHAR(100),
        date_of_joining DATE,
        date_of_birth DATE,
        image_url VARCHAR(100)
    );
    ```

7. Create departments table in the database by running the following command in your terminal:
    ```sql
    CREATE TABLE departments (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100)
    );
    ```

8. Since there is a relationship between employee and department, add a department_id column to the employees table and add a foreign key constraint to the departments table by running the following command in your terminal:
    ```sql
    ALTER TABLE employees
    ADD COLUMN department_id INTEGER;

    ALTER TABLE employees
    ADD CONSTRAINT fk_department_id
    FOREIGN KEY (department_id)
    REFERENCES departments (id);
    ```
    ## EDIT: 
    There is no need to create the tables manually through psql, the tables will be created automatically when the server is started for the first time, the only thing you need to do is to create the database, the reason for this is that I added the ORM Sequelize to the project which will handle the creation of the tables and the relationships between them. So steps 6 to 8 can be skipped. 

## Instructions to run the project:
1. Clone the repository by running `git clone git@github.com:Jad-Jbara/speedlane-task-backend.git`
2. Run `yarn install` to install all the dependencies
3. Create a `.env` file in the root of the project and add the following variables: example
    ```
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_HOST=localhost
    DB_PORT=5432
    DB_DATABASE=speedlane_backend_task
    ```
4. Run `yarn dev` to start the server
5. The server will be running on `http://localhost:3000`
6. Make sure you have PostgreSQL running
7. You can now make requests to the server using Postman or running the frontend part of the application in parallel

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
