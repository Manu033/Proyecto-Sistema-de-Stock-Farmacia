import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
const options = [
  { label: "Nuevo Medicamento", path: "/admin/new" },
  { label: "Medicamentos", path: "/admin" },
  { label: "Movimientos", path: "/admin/movements" },
  { label: "Logistica Salida", path: "/admin/logistics" },
];

const Header = () => {
  const navigate = useNavigate();
  const user =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));
  const closeSession = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <header className="bg-gray-800 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo de la Empresa" className="h-6 w-6" />
          <h3 className="text-white text-md ml-2 tracking-wider">
            Bienvenido <span className="font-semibold">{user?.name}</span>
          </h3>
        </div>
        <nav className="flex justify-center space-x-4">
          {options.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              className="text-gray-300 hover:text-white transition transform hover:scale-105 duration-200 ease-in"
            >
              {option.label}
            </Link>
          ))}
        </nav>
        <button
          onClick={closeSession}
          className="flex items-center transition transform hover:scale-105 duration-200 ease-in"
        >
          <CiLogin className="inline mr-2 text-xl text-white" />
          <span className="text-white">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
