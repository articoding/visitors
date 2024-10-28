import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const RegisterCard = ({ icon, label, onClick, iconColor = 'text-purple-600' }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center space-y-4 w-60 h-60">
      {/* Icon Section with customizable color */}
      <div className={`${iconColor} text-4xl`}>
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* Button Section */}
      <button
        onClick={onClick}
        className="bg-green-100 text-green-700 py-2 px-5 rounded-lg font-semibold hover:bg-green-200"
      >
        {label}
      </button>
    </div>
  );
};

export default RegisterCard;