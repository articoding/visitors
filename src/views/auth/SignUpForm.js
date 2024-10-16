import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { auth, db } from '../../firebase/config'; // Ensure db is correctly imported
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import logo from '../../assets/img/logo.png'; // Adjust path to your logo image

const SignupForm = () => {
  // State variables to manage form inputs and messages
  const [fullName, setFullName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // This function handles the signup process
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        fullName,
        lastName,
        email,
        department,
        createdAt: new Date(),
      });

      console.log('User registered and data saved in Firestore');
      setMessage('Cuenta creada con éxito.');
      setError('');
      alert('Cuenta creada con éxito. ¡Bienvenido!');
    } catch (error) {
      // Handle errors such as if the email is already in use
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado. Por favor, inicia sesión.');
        alert('Este correo ya está registrado. Por favor, inicia sesión.');
      } else {
        setError('No se pudo crear la cuenta. Inténtalo de nuevo.');
        alert('No se pudo crear la cuenta. Inténtalo de nuevo.');
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <img
          src={logo}
          alt="Christus Muguerza Hospital Reynosa"
          className="w-4/4 mx-auto mb-8"
        />
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Nombre"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Apellidos"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            >
              <option value="" disabled>
                Selecciona un departamento
              </option>
              <option value="HR">Recursos Humanos</option>
              <option value="IT">Tecnologías de la Información</option>
              <option value="Quality">Calidad y Experiencias del Consumidor</option>
              <option value="Commerce">Comercialización</option>
              <option value="Medicine">Área Médica</option>
              <option value="Admin">Administrativo</option>
              <option value="Client">Servicio al Cliente</option>
              <option value="Nurse">Enfermería</option>
              {/* Add more departments as needed */}
            </select>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {message && <p className="text-green-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-600"
          >
            Crear cuenta
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/" className="text-purple-600">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
