const { DataTypes } = require('sequelize');
const sequelize = require('../config/config'); 

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  legajo: { 
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
  },
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Permite letras con tildes, ñ y espacios
        msg: "El nombre solo debe contener letras y espacios, incluyendo letras con tildes",
      },
      len: {
        args: [1, 100],
        msg: "El nombre debe tener entre 1 y 100 caracteres",
      },
    },
  },
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      is: {
        args: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, // Permite letras con tildes, ñ y espacios
        msg: "El apellido solo debe contener letras y espacios, incluyendo letras con tildes",
      },
      len: {
        args: [1, 100],
        msg: "El apellido debe tener entre 1 y 100 caracteres",
      },
    },
  },
  dni: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    validate: {
      isNumeric: {
        args: true,
        msg: "El DNI solo debe contener números",
      },
      len: {
        args: [1, 10],
        msg: "El DNI debe tener entre 1 y 10 caracteres",
      },
    }, 
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  deleted: {
    type: DataTypes.TINYINT,
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  }
});

module.exports = Student;

