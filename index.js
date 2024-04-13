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
