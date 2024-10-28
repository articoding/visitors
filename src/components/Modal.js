import React from 'react';
import RegisterCard from './RegisterCard';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // If modal is not open, don't render it

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Registrar</h2>
        
        {/* Register Cards */}
        <div className="flex justify-around space-x-6">
          <RegisterCard
            icon={faBriefcase}
            label="Visitante Externo"
            onClick={() => console.log('Registrar Visita')}
            iconColor="text-[#671E75]" // Changes the icon color to red
            />
          <RegisterCard
            icon={faGraduationCap}
            label="Practicante Administrativo"
            onClick={() => console.log('Registrar Práctica')}
            iconColor="text-[#671E75]" // Changes the icon color to red
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;