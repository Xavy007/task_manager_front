import React from 'react';
import { Link } from 'react-router-dom'; // Si usas react-router para la navegación

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">Manejador de Tareas</Link>
        </div>
        <ul className="flex space-x-6 text-white">
          <li>
            <Link to="/" className="hover:text-yellow-400">Inicio</Link>
          </li>
          <li>
            <Link to="/users" className="hover:text-yellow-400">Usuarios</Link>
          </li>
          <li>
            <Link to="/tasks" className="hover:text-yellow-400">Tareas</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
