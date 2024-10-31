import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase/config'; // Ensure the path to your Firebase config is correct
import { collection, getDocs } from 'firebase/firestore';

const Visitantes = () => {
  const [visitantes, setVisitantes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Visitantes data from Firestore
  const fetchVisitantes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'visitors')); // Updated to fetch from the 'visitors' collection
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVisitantes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchVisitantes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Todos los visitantes</h1>
        <p className="text-gray-600 mb-8">
          Todos los visitantes externos que están actualmente en el hospital
        </p>
        
        {/* Search and Filter Inputs */}
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
          />
          <input
            type="text"
            placeholder="Departamento"
            className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
          />
          <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 focus:outline-none">
            + Agregar
          </button>
        </div>

        {/* Visitantes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visitantes.map((visitante) => (
            <div
              key={visitante.id}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div>
                <span className="text-gray-500">Visitante</span>
                <div className="mt-2">
                  <h2 className="text-xl font-bold text-gray-800">{visitante.name || 'Nombre no disponible'}</h2>
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      visitante.status === 'Entrada registrada'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {visitante.status || 'Estado desconocido'}
                  </span>
                </div>
              </div>
              <div>
                <p className="text-gray-600">
                  Visitando a: <span className="font-semibold">{visitante.visiting || 'Desconocido'}</span>
                </p>
                <p className="text-gray-600">
                  Departamento: <span className="font-semibold">{visitante.department || 'Desconocido'}</span>
                </p>
                <p className="text-gray-600">
                  Motivo de la visita: <span className="font-semibold">{visitante.visitReason || 'No especificado'}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                {visitante.status === 'Entrada registrada' ? (
                  <button className="bg-red-100 text-red-500 py-2 px-4 rounded-lg">
                    Registrar salida
                  </button>
                ) : (
                  <button className="bg-green-100 text-green-500 py-2 px-4 rounded-lg">
                    Registrar entrada
                  </button>
                )}
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-purple-600">
                    <i className="fas fa-edit"></i> {/* Edit Icon */}
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <i className="fas fa-trash-alt"></i> {/* Delete Icon */}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Visitantes;
