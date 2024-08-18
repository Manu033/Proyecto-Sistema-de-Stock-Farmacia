// src/features/ProductsMovements/MovementsTable.jsx
import React, { useState } from "react";
import {
  Table,
  THead,
  THeadRow,
  TBody,
  TRow,
  TData,
} from "../../components/common/Table/Table.jsx";
import MovementDetails from "./MovementDetails.jsx";
import { movements, movementDetails } from "./data.js";
import classNames from 'classnames';

function MovementsTable() {
  const [filters, setFilters] = useState({
    desde: "",
    hacia: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [selectedMovement, setSelectedMovement] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null); // Estado para almacenar la fila seleccionada

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleRowClick = (movementId) => {
    setSelectedMovement(movementDetails[movementId]);
    setSelectedRowId(movementId); // Establece la fila seleccionada
  };

  const filteredMovements = movements.filter((movement) => {
    const startDate = filters.fechaInicio ? new Date(filters.fechaInicio) : null;
    const endDate = filters.fechaFin ? new Date(filters.fechaFin) : null;
    const movementDate = new Date(movement.fecha);

    const matchesDesde = filters.desde ? movement.desde === filters.desde : true;
    const matchesHacia = filters.hacia ? movement.hacia === filters.hacia : true;
    const matchesDate =
      (!startDate || movementDate >= startDate) &&
      (!endDate || movementDate <= endDate);

    return matchesDesde && matchesHacia && matchesDate;
  });

  return (
    <div className="flex flex-col space-y-4">
      {/* Bloque de filtros */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="flex flex-col h-full items-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Desde depósito
          </label>
          <select
            name="desde"
            value={filters.desde}
            onChange={handleFilterChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            style={{ minHeight: "42px" }}
          >
            <option value="">Todos</option>
            <option value="Depósito Central">Depósito Central</option>
            <option value="Depósito Secundario">Depósito Secundario</option>
            <option value="Depósito Norte">Depósito Norte</option>
          </select>
        </div>

        <div className="flex flex-col h-full items-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Hacia depósito
          </label>
          <select
            name="hacia"
            value={filters.hacia}
            onChange={handleFilterChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            style={{ minHeight: "42px" }}
          >
            <option value="">Todos</option>
            <option value="Depósito Central">Depósito Central</option>
            <option value="Depósito Secundario">Depósito Secundario</option>
            <option value="Depósito Norte">Depósito Norte</option>
          </select>
        </div>

        <div className="flex flex-col h-full items-start">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rango de fechas
          </label>
          <div className="grid grid-cols-2 gap-2 w-full">
            <input
              type="date"
              name="fechaInicio"
              value={filters.fechaInicio}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
            <input
              type="date"
              name="fechaFin"
              value={filters.fechaFin}
              onChange={handleFilterChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Tabla de movimientos */}
      <Table maxHeight={"200px"} height={"200px"}>
        <THead>
          <THeadRow>
            <TData>Tipo de movimiento</TData>
            <TData>Descripción</TData>
            <TData>Desde</TData>
            <TData>Hacia</TData>
            <TData>Fecha</TData>
          </THeadRow>
        </THead>
        <TBody>
          {filteredMovements.map((movement) => (
            <TRow
              key={movement.id}
              onClick={() => handleRowClick(movement.id)}
              className={classNames(
                movement.id === selectedRowId && "bg-primary hover:bg-primary",
                "cursor-pointer"
              )}
            >
              <TData>{movement.tipo}</TData>
              <TData>{movement.descripcion}</TData>
              <TData>{movement.desde}</TData>
              <TData>{movement.hacia}</TData>
              <TData>{movement.fecha}</TData>
            </TRow>
          ))}
        </TBody>
      </Table>

      {/* Detalle del movimiento */}
      <MovementDetails movement={selectedMovement} />
    </div>
  );
}

export default MovementsTable;
