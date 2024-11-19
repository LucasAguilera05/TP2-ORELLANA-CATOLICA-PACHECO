import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ firstnamename: '', lastName: '', dni: '', email: '' });
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  
    // Patrón de validación para el email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  // Estados adicionales para mensajes de "campo requerido" y validación de formato
  const [nameError, setNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [dniError, setDniError] = useState('');
  const [emailRequiredError, setEmailRequiredError] = useState('');
  const [dniFormatError, setDniFormatError] = useState('');
  const [nameFormatError, setNameFormatError] = useState('');
  const [lastNameFormatError, setLastNameFormatError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'dni') {
      if (/^\d*$/.test(value) && value.length <= 10) {
        setDniFormatError(''); 
        setDniError(value ? '' : 'DNI es requerido'); 
        setFormData({ ...formData, [name]: value });
      } else {
        setDniFormatError('El DNI debe contener solo números y hasta 10 caracteres');
        setDniError(''); 
      }
    } else if (name === 'name') {
      // Expresión para incluir letras con tildes y ñ
      if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value) && value.length <= 100) {
        setNameFormatError(''); 
        setNameError(value ? '' : 'Nombre es requerido');
        setFormData({ ...formData, [name]: value });
      } else {
        setNameFormatError('El nombre debe contener solo letras y hasta 100 caracteres');
        setNameError(''); 
      }
    } else if (name === 'lastName') {
      // Expresión para incluir letras con tildes y ñ
      if (/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]*$/.test(value) && value.length <= 100) {
        setLastNameFormatError(''); 
        setLastNameError(value ? '' : 'Apellido es requerido');
        setFormData({ ...formData, [name]: value });
      } else {
        setLastNameFormatError('El apellido debe contener solo letras y hasta 100 caracteres');
        setLastNameError(''); 
      }
    } else if (name === 'email') {
      if (value && !emailPattern.test(value)) {
        setEmailError('Email no válido');
        setEmailRequiredError('');
      } else {
        setEmailError('');
        setEmailRequiredError(value ? '' : 'Email es requerido'); 
      }
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

  

  // Función para verificar duplicados de DNI
  const checkDuplicateDni = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students/check-duplicate-dni', {
        params: { dni: formData.dni }
      });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking duplicate DNI:', error);
      return false;
    }
  };

  // Función para verificar duplicados de Email
  const checkDuplicateEmail = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/students/check-duplicate-email', {
        params: { email: formData.email }
      });
      return response.data.exists;
    } catch (error) {
      console.error('Error checking duplicate Email:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validación de campos vacíos
    setNameError(formData.name ? '' : 'Nombre es requerido');
    setLastNameError(formData.lastName ? '' : 'Apellido es requerido');
    setDniError(formData.dni ? '' : 'DNI es requerido');
    setEmailRequiredError(formData.email ? '' : 'Email es requerido');
    
    if (!formData.name || !formData.lastName || !formData.dni || !formData.email) return;

    // Verificar duplicados por separado
    const dniExists = await checkDuplicateDni();
    const emailExists = await checkDuplicateEmail();

    if (dniExists || emailExists) {
      let errorMessage = 'No se pudo agregar el estudiante. ';
      if (dniExists) errorMessage += 'DNI ya registrado. ';
      if (emailExists) errorMessage += 'Email ya registrado.';
      alert(errorMessage);
      return;
    }

    // Enviar formulario al backend
    try {
      const response = await axios.post('http://localhost:3000/api/students', {
        firstname: formData.name,
        lastname: formData.lastName,
        dni: formData.dni,
        email: formData.email
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 201) {
        alert('Estudiante agregado');
        navigate('/students');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
      alert('No se pudo conectar con el servidor. Verifica tu conexión.');
    }
  };

  return (
    <div className="contentForm">
      <div id="head-Form">
        <h1>Agregar Alumnos</h1>
        <button onClick={() => navigate('/students')}>Atrás</button>
      </div>
      <div id="bodyContent-Form">
        <form id="myForm" noValidate onSubmit={handleSubmit}>
          <div className='form-field'>
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              maxLength="100"
              value={formData.name}
              onChange={handleChange}
            />
            {nameError && <p className="error-message">{nameError}</p>}
            {nameFormatError && <p className="error-message">{nameFormatError}</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="lastName">Apellido:</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              required
              maxLength="100"
              value={formData.lastName}
              onChange={handleChange}
            />
            {lastNameError && <p className="error-message">{lastNameError}</p>}
            {lastNameFormatError && <p className="error-message">{lastNameFormatError}</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="dni">DNI:</label>
            <input 
              type="number"
              name="dni"
              id="dni"
              required
              maxLength="10"
              value={formData.dni}
              onChange={handleChange}
            />
            {dniError && <p className="error-message">{dniError}</p>}
            {dniFormatError && <p className="error-message">{dniFormatError}</p>}
          </div>
          <div className='form-field'>
            <label htmlFor="email">E-mail:</label>
            <input 
              type="text"
              name="email"
              id="email"
              required
              maxLength="100"
              value={formData.email}
              onChange={handleChange}
            />
            {emailError && <p className="error-message">{emailError}</p>}
            {emailRequiredError && <p className="error-message">{emailRequiredError}</p>}
          </div>

          <button type="submit" id="save" disabled={!!emailError || !!dniFormatError}>Agregar</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Form;
