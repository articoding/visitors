// src/views/auth/LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import logo from '../../assets/img/logo.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully:', userCredential.user);
      navigate('/admin/dashboard');
    } catch (error) {
      setError('Correo electrónico o contraseña incorrectos');
      console.error('Login error:', error);
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
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700">Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="usuario@christus.mx"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring focus:ring-purple-600"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="text-right">
            <a href="/forgot-password" className="text-purple-600 text-sm">
              ¿Olvidaste la contraseña?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 focus:outline-none focus:ring focus:ring-purple-600"
          >
            Inicia Sesión
          </button>
        </form>
        <p className="text-center text-sm mt-4">
          ¿No tienes cuenta?{' '}
          <Link to="/signup" className="text-purple-600">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
