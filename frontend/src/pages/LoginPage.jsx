// src/pages/LoginPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { loginService } from './../api/auth/authServices';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.username.value;
    const password = e.target.password.value;

    try {
      const data = await loginService(email, password);

      // Suponiendo que el token está en data.token
      const token = data.token;

      // Almacenar el token en localStorage
      localStorage.setItem('token', token);

      // Actualizar el estado de autenticación en Redux
      dispatch(login({ user: data.user, token }));

      // Navegar al dashboard de admin
      navigate('/admin');
    } catch (error) {
      console.error('Error during login:', error);
      // Manejar el error aquí, mostrar un mensaje al usuario, etc.
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('./output_image.jpeg')" }}
    >
      <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Logo" className="mx-auto h-12 w-auto" />
        </div>
        <h2 className="text-center text-2xl font-bold text-gray-700">Iniciar Sesión</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="username" className="sr-only">Usuario</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Usuario"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-500 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
