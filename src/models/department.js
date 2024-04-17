const sequelize = require('../Config/Database')
const { DataTypes } = require('sequelize')

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'departments',
  timestamps: false,
})

Department.sync()

module.exports = Department