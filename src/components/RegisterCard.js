import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config'; // Ensure path to Firebase config is correct

const RegisterCard = ({ icon, label, type, onClick }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    visitReason: '',
    photo: '',
    lastName: '',
    phoneNumber: ''
  });

  // Fetch departments from Firestore
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentCollection = collection(db, 'departments');
        const departmentSnapshot = await getDocs(departmentCollection);
        const departmentList = departmentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log("Fetched Departments:", departmentList); // Add this line to see if data is fetched
        setDepartments(departmentList);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
  
    fetchDepartments();
  }, []);
  
  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white border-2 border-gray-200 rounded-lg shadow-lg p-6 w-80 space-y-4">
      {/* Icon Section */}
      <div className="text-purple-600 text-4xl text-center mb-4">
        <FontAwesomeIcon icon={icon} />
      </div>

      {/* Conditional Form */}
      <h2 className="text-center text-lg font-semibold mb-4">
        {type === 'visitor' ? 'Registra un nuevo visitante' : 'Registra un nuevo practicante administrativo'}
      </h2>

      <form className="space-y-4">
        {/* Common Fields */}
        <div>
          <label className="block text-gray-700 font-medium">Nombre completo</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nombre del visitante/practicante"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          />
        </div>

        {type === 'intern' && (
          <>
            <div>
              <label className="block text-gray-700 font-medium">Apellidos</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Apellidos del practicante"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium">Número de celular</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Número de celular del practicante"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              />
            </div>
          </>
        )}

        <div>
          <label className="block text-gray-700 font-medium">Departamento</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          >
            <option value="">Selecciona un departamento</option>
            {departments.map(department => (
              <option key={department.id} value={department.name}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        {type === 'visitor' && (
          <div>
            <label className="block text-gray-700 font-medium">Motivo de la visita</label>
            <select
              name="visitReason"
              value={formData.visitReason}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            >
              <option value="">Selecciona un motivo</option>
              <option value="Entrevista">Entrevista</option>
              <option value="Reunión">Reunión</option>
              <option value="Otro">Otro</option>
            </select>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="button"
          onClick={() => onClick(formData)} // Handle submission
          className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 w-full"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterCard;