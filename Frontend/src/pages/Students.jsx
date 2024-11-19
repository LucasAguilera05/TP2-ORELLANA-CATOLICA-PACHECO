import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import debounce from 'lodash/debounce';
import './Students.css';

const Students = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [students, setStudents] = useState([]);

  // Función para obtener los estudiantes del backend
  const fetchStudents = async (searchTerm = search) => {
    try {
      const response = await axios.get('http://localhost:3000/api/students', {
        params: {
          search: searchTerm,
          currentPage,
          pageSize: itemsPerPage
        }
      });
      console.log(response.data);  
      setStudents(response.data.students);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Debounce para la búsqueda
  const debouncedFetchStudents = useCallback(
    debounce((searchTerm) => fetchStudents(searchTerm), 500),
    [itemsPerPage, currentPage]
  );

  useEffect(() => {
    fetchStudents(search);
  }, [search, itemsPerPage, currentPage]);
  

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Función para eliminar un estudiante con confirmación
  const handleDelete = async (id, legajo, firstname, lastname) => {
    const confirmDelete = window.confirm(`¿Desea eliminar al estudiante: ${legajo} - ${lastname}, ${firstname}?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/students/${id}`);
      
      // Actualiza la lista de estudiantes después de la eliminación
      setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Ocurrió un error al eliminar el estudiante.');
    }
  };

  return (
    <div className="contentStudents">
      <div id="head-Students">
        <h1>Alumnos</h1>
        <button onClick={() => navigate('/students/add')}>Agregar</button>
      </div>

      <div id="bodyContent-Students">
        <div className="search">
          <input
            type="text"
            id="search"
            placeholder="Buscar apellido"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>Legajo</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody id="table-students">
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.legajo}</td>
                <td>{student.firstname}</td>
                <td>{student.lastname}</td>
                <td>
                  <button className="delete-button" onClick={() => handleDelete(student.id, student.legajo, student.firstname, student.lastname)}>
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="feetContent-Students">
          <div id="totalItems">
              <span>Total: {students.length} -</span>
          </div>
          <div id="item">
            <label htmlFor="itemsPerPage">Items por página:</label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>
          <div id="paginationControls">
            {totalPages > 1 && (
              <div id="paginationControls">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                  Anterior
                </button>
                <span>{currentPage} de {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students;
