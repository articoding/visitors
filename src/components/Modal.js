import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import VisitorForm from './forms/VisitorForm';
import InternForm from './forms/InternForm';

const Modal = ({ isOpen, onClose }) => {
  const [activeForm, setActiveForm] = useState(null);

  if (!isOpen) return null;

  const handleBack = () => setActiveForm(null);

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

        {/* Header */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          {activeForm ? (
            activeForm === 'visitor' ? 'Registra un nuevo visitante' : 'Registra un nuevo practicante administrativo'
          ) : (
            'Registrar'
          )}
        </h2>

        {/* Content */}
        {activeForm ? (
          <>
            <button
              className="text-sm text-purple-600 mb-4"
              onClick={handleBack}
            >
              ← Volver
            </button>
            {/* Render the selected form */}
            {activeForm === 'visitor' ? (
              <VisitorForm />
            ) : (
              <InternForm />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            {/* Visitor Button with Icon */}
            <button
              className="flex items-center justify-center bg-[#671E75] text-white py-3 px-5 rounded-lg font-semibold w-full space-x-2"
              onClick={() => setActiveForm('visitor')}
            >
              <FontAwesomeIcon icon={faBriefcase} className="text-2xl" />
              <span>Visitante Externo</span>
            </button>

            {/* Intern Button with Icon */}
            <button
              className="flex items-center justify-center bg-[#671E75] text-white py-3 px-5 rounded-lg font-semibold w-full space-x-2"
              onClick={() => setActiveForm('intern')}
            >
              <FontAwesomeIcon icon={faGraduationCap} className="text-2xl" />
              <span>Practicante Administrativo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
