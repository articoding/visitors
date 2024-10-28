import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import Modal from '../components/Modal'; // Import the Modal component

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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
              <Link
                to="/admin/dashboard"
                className={`${
                  currentPath === '/admin/dashboard' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Panel
              </Link>
            </li>
            <li>
              <Link
                to="/admin/practicantes"
                className={`${
                  currentPath === '/admin/practicantes' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Practicantes
              </Link>
            </li>
            <li>
              <Link
                to="/admin/visitantes"
                className={`${
                  currentPath === '/admin/visitantes' ? 'text-purple-600 font-semibold' : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                Visitantes
              </Link>
            </li>
          </ul>
          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button
              className="bg-[#671E75] text-white py-3 px-5 rounded-lg font-semibold"
              onClick={() => setIsModalOpen(true)} // Open the modal
            >
              + Registrar
            </button>
            <button className="text-gray-600 hover:text-purple-600">
              <i className="fas fa-user-circle fa-2x"></i> {/* Font Awesome Icon */}
            </button>
          </div>
        </div>
      </nav>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;