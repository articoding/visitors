import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { db } from '../../firebase/config'; // Ensure the path to your Firebase config is correct
import { collection, getDocs } from 'firebase/firestore';

const Practicantes = () => {
  const [practicantes, setPracticantes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Practicantes data from Firestore
  const fetchPracticantes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'practicantes')); // Adjust collection name if needed
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPracticantes(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchPracticantes();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Todos los practicantes</h1>
        <p className="text-gray-600 mb-8">
          Todos los practicantes que están actualmente realizando sus prácticas profesionales en el hospital
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

        {/* Practicantes Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {practicantes.map((practicante) => (
            <div
              key={practicante.id}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex items-center">
                <img
                  src={practicante.photoUrl || 'https://via.placeholder.com/150'} // Placeholder image if no URL
                  alt={practicante.name}
                  className="h-24 w-24 rounded-full object-cover mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold text-gray-800">{practicante.name}</h2>
                  <span className="text-gray-500">{practicante.department}</span>
                  <div className="mt-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        practicante.status === 'Entrada registrada'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {practicante.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">
                  Fecha de {practicante.status === 'Entrada registrada' ? 'entrada' : 'salida'}:{' '}
                  <span className="font-semibold">{practicante.date}</span>
                </p>
              </div>
              <div className="flex justify-between items-center">
                {practicante.status === 'Entrada registrada' ? (
                  <button className="bg-red-100 text-red-500 py-2 px-4 rounded-lg">
                    Registrar salida
                  </button>
                ) : (
                  <button className="bg-green-100 text-green-500 py-2 px-4 rounded-lg">
                    Registrar entrada
                  </button>
                )}
                <button className="bg-purple-100 text-purple-600 py-2 px-4 rounded-lg">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Practicantes;