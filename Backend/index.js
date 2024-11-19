const express = require('express');
const sequelize = require('./config/config'); 
const cors = require('cors'); 
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración del middleware CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:5173' 
}));

// Middlewares
app.use(express.json());

// Importa el archivo de rutas para estudiantes
const path = require('path');
const studentsRoutes = require(path.join(__dirname, 'routes', 'studentsRoutes'));

app.use('/api', studentsRoutes);

app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// Iniciar el servidor
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
  try {
    // Sincroniza la base de datos
    await sequelize.sync();
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
});
