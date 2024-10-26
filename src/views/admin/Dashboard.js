import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config'; // Make sure the path to your config is correct
import { collection, getDocs } from 'firebase/firestore';
import Navbar from '../../components/Navbar';


const Dashboard = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch data from Firestore
  const fetchVisitors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'visitors')); // Adjust collection name if needed
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVisitors(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data from Firestore:', error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchVisitors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Todas las personas</h1>
        <p className="text-gray-600 mb-8">
          Todos los que están actualmente en las instalaciones del hospital
        </p>
        <div className="mb-6 flex space-x-4">
          <input
            type="text"
            placeholder="Buscar"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
          />
          <input
            type="text"
            placeholder="Estatus"
            className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
          />
          <input
            type="text"
            placeholder="Tipo"
            className="w-1/3 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visitors.map((visitor) => (
            <div
              key={visitor.id}
              className="bg-white p-6 rounded-lg shadow-md space-y-4"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-500">{visitor.type}</span>
                <span className="bg-green-200 text-green-700 text-sm px-2 py-1 rounded-full">
                  {visitor.status}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-800">{visitor.name}</h2>
              {visitor.visiting && (
                <p className="text-gray-600">
                  Visitando a: <span className="font-semibold">{visitor.visiting}</span>
                </p>
              )}
              <p className="text-gray-600">
                Departamento: <span className="font-semibold">{visitor.department}</span>
              </p>
              {visitor.purpose && (
                <p className="text-gray-600">
                  Motivo de la visita: <span className="font-semibold">{visitor.purpose}</span>
                </p>
              )}
              <p className="text-gray-600">
                Hora de entrada: <span className="font-semibold">{visitor.checkInTime}</span>
              </p>
              <div className="flex justify-between items-center">
                <button className="bg-red-100 text-red-500 py-2 px-4 rounded-lg">
                  Registrar salida
                </button>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-purple-600">
                    <i className="fas fa-edit"></i> {/* Font Awesome Edit Icon */}
                  </button>
                  <button className="text-gray-500 hover:text-red-600">
                    <i className="fas fa-trash-alt"></i> {/* Font Awesome Delete Icon */}
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

export default Dashboard;