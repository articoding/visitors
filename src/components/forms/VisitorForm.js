import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';

const VisitorForm = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    visitReason: ''
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      const departmentCollection = collection(db, 'departments');
      const departmentSnapshot = await getDocs(departmentCollection);
      const departmentList = departmentSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDepartments(departmentList);
    };

    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const visitorsCollection = collection(db, 'visitors');
      await addDoc(visitorsCollection, formData);
      alert('Visitante registrado con éxito');
    } catch (error) {
      console.error("Error al registrar un visitante: ", error);
      alert('Ocurrió un error al registrar un visitante');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-gray-700 font-medium">Nombre completo</label>
        <input
          type="text"
          name="name"
          placeholder="Nombre del visitante"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Departamento</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          style={{
            WebkitAppearance: 'none', // Remove default Safari styling
            MozAppearance: 'none', // Remove default Firefox styling
            appearance: 'none', // Remove default browser styling
            backgroundColor: 'white',
            paddingRight: '1.5rem', // Ensure padding for consistency
            fontSize: '1rem',
            lineHeight: '1.5',
          }}
          required
        >
          <option value="">Selecciona un departamento</option>
          {departments.map(department => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium">Motivo de la visita</label>
        <select
          name="visitReason"
          value={formData.visitReason}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          style={{
            WebkitAppearance: 'none', // Remove default Safari styling
            MozAppearance: 'none', // Remove default Firefox styling
            appearance: 'none', // Remove default browser styling
            backgroundColor: 'white',
            paddingRight: '1.5rem', // Ensure padding for consistency
            fontSize: '1rem',
            lineHeight: '1.5',
          }}
          required
        >
          <option value="">Selecciona un motivo</option>
          <option value="Entrevista">Entrevista</option>
          <option value="Reunión">Reunión</option>
          <option value="Otro">Otro</option>
        </select>
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600 w-full"
      >
        Registrar
      </button>
    </form>
  );
};

export default VisitorForm;
