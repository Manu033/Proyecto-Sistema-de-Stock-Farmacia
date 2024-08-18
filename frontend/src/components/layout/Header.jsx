import React from "react";
import { Link } from "react-router-dom";
const options = [
  { label: "Nuevo Medicamento", path: "/admin/new" },
  { label: "Medicamentos", path: "/admin" },
  { label: "Movimientos", path: "/admin/movements" },
];
const Header = () => {
  return (
    <header className="bg-gray-800 p-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/logo.png"
            alt="Logo de la Empresa"
            className="h-6 w-6"
          />
        </div>
        <nav className="flex justify-center space-x-4">
          {options.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              className="text-gray-300 hover:text-white"
            >
              {option.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
