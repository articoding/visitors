import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/config';
import { signOut } from 'firebase/auth';
import logo from '../assets/img/logo.png';
import Modal from '../components/Modal';

const Navbar = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to control the dropdown visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Toggle dropdown
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
      navigate('/'); // Redirect to the login page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

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
          <div className="flex items-center space-x-4 relative">
            <button
              className="bg-[#671E75] text-white py-3 px-5 rounded-lg font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              + Registrar
            </button>

            {/* User Icon with Dropdown Menu */}
            <div className="relative">
              <button
                className="text-gray-600 hover:text-purple-600"
                onClick={toggleDropdown}
              >
                <i className="fas fa-user-circle fa-2x"></i>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Navbar;
