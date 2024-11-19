const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Rutas para verificar duplicados
router.get('/students/check-duplicate-dni', studentController.checkDuplicateDni);    // Verificar duplicado de DNI
router.get('/students/check-duplicate-email', studentController.checkDuplicateEmail); // Verificar duplicado de Email


// Rutas para estudiantes
router.get('/students', studentController.getAllStudents);       // Obtener todos los estudiantes con paginación y búsqueda
router.post('/students', studentController.createStudent);       // Crear un nuevo estudiante
router.get('/students/:id', studentController.getStudentById);   // Obtener estudiante por ID
router.delete('/students/:id', studentController.deleteStudent); // Eliminar un estudiante por ID

module.exports = router;
