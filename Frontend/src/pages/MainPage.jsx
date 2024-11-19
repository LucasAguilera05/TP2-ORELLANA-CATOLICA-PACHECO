import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-page">
      <div id="head-main-page">
        <h1>Página Principal</h1>
      </div>
      <div id="bodyContent-main-page">
        <button onClick={() => navigate('/students')}>Módulo Alumnos</button>
      </div>
    </div>
  );
};

export default MainPage;
