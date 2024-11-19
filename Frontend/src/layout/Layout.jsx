import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  return (
    <div className="layout-root">
      <div>
      <nav className="layout-menu">
        <h2>Registro Alumnos</h2>
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}
            >
              Página Principal
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) => (isActive ? 'menu-link active' : 'menu-link')}
            >
              Alumnos
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
      <div className='layout-main-content'>
        <Outlet/>
      </div>
    </div>
  );
};

export default Layout;
