const Student = require('../models/student');
const { Op } = require('sequelize');

exports.getAllStudents = async (req, res) => {
  const { search = '', currentPage = 1, pageSize = 5 } = req.query;
  const offset = (currentPage - 1) * pageSize;
  
  try {
    const { count, rows } = await Student.findAndCountAll({
      where: {
        ...(search && {
          lastname: {
            [Op.substring]: search,
          },
        })
        
        // deleted: 0,
      },
      limit: parseInt(pageSize),
      offset: parseInt(offset),
    });
    console.log('Students retrieved:', rows);


    res.status(200).json({
      totalItems: count,
      students: rows,
      totalPages: Math.ceil(count / pageSize),
      currentPage: parseInt(currentPage),
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching students' });
  }
};


exports.getStudentById = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (student && student.deleted === 0) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: 'Error fetching student' });
  }
};



exports.createStudent = async (req, res) => {
  try {
    const { firstname, lastname, dni, email } = req.body;

    // Validación en el backend
    if (!firstname || !lastname || !dni || !email) {
      return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    // Validación del formato de email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Formato de email inválido.' });
    }

    // Verificar si el DNI ya existe
    const dniExists = await Student.findOne({
      where: { dni: dni, deleted: 0 },
    });
    if (dniExists) {
      return res.status(409).json({ error: 'El DNI ya está registrado.' });
    }

    // Verificar si el Email ya existe
    const emailExists = await Student.findOne({
      where: { email: email, deleted: 0 },
    });
    if (emailExists) {
      return res.status(409).json({ error: 'El email ya está registrado.' });
    }

    // Obtener el último legajo y asignar uno nuevo
    const lastStudent = await Student.findOne({ order: [['legajo', 'DESC']] });
    const legajo = lastStudent ? lastStudent.legajo + 1 : 1;

    // Crear el nuevo estudiante
    const student = await Student.create({ legajo, firstname, lastname, dni, email });
    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error:'Error creating student: ${error.message}' });
  }
};



exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findByPk(id);
    if (student) {
      student.deleted = 1;
      await student.save();
      res.status(200).json({ message: 'Student deleted successfully' });
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting student' });
  }
};


exports.checkDuplicateDni = async (req, res) => {
  const { dni } = req.query;

  try {
    const student = await Student.findOne({
      where: {
        dni: dni,
        deleted: 0,
      },
    });

    res.status(200).json({ exists: !!student });
  } catch (error) {
    console.error("Error checking duplicate DNI:", error);
    res.status(500).json({ error: 'Error checking duplicate DNI' });
  }
};


exports.checkDuplicateEmail = async (req, res) => {
  const { email } = req.query;

  try {
    const student = await Student.findOne({
      where: {
        email: email,
        deleted: 0,
      },
    });

    res.status(200).json({ exists: !!student });
  } catch (error) {
    console.error("Error checking duplicate Email:", error);
    res.status(500).json({ error: 'Error checking duplicate Email' });
  }
};



