import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

const InternForm = () => {
  const [departments, setDepartments] = useState([]);

  // Fetch departments from Firestore when the component mounts
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const departmentCollection = collection(db, 'departments');
        const departmentSnapshot = await getDocs(departmentCollection);
        const departmentList = departmentSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setDepartments(departmentList);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <form className="space-y-4">
      <div>
        <label className="block text-gray-700 font-medium">Foto de perfil</label>
        <input
          type="file"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Nombre</label>
        <input
          type="text"
          placeholder="Nombre del practicante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Apellidos</label>
        <input
          type="text"
          placeholder="Apellidos del practicante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Número de celular</label>
        <input
          type="text"
          placeholder="Número de celular del practicante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Departamento</label>
        <select className="w-full px-4 py-2 border rounded-lg focus:outline-none">
          <option value="">Selecciona un departamento</option>
          {departments.map(department => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 w-full">
        Registrar
      </button>
    </form>
  );
};

export default InternForm;