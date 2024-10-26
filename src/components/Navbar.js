import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md py-4 px-10 flex justify-between items-center">
      {/* Left section: Logo */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Christus Muguerza Hospital Reynosa"
          className="h-16 w-18 mr-4"
        />
      </div>

      {/* Right section: Navigation links and buttons */}
      <div className="flex items-center space-x-12">
        {/* Navigation Links */}
        <ul className="flex space-x-12 ml-auto">
          <li>
            <Link to="/admin/dashboard" className="text-purple-600 font-semibold">
              Panel
            </Link>
          </li>
          <li>
            <Link to="/admin/practicantes" className="text-gray-600 hover:text-purple-600">
              Practicantes
            </Link>
          </li>
          <li>
            <Link to="/admin/visitantes" className="text-gray-600 hover:text-purple-600">
              Visitantes
            </Link>
          </li>
        </ul>
        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-purple-700 text-white py-2 px-4 rounded-lg">
            + Registrar
          </button>
          <button className="text-gray-600 hover:text-purple-600">
            <i className="fas fa-user-circle fa-2x"></i> {/* Font Awesome Icon */}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;