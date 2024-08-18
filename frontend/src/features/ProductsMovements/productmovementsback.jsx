import React, { useState } from "react";
import { Table, THead, THeadRow, TBody, TRow, TData } from "./../../components/common/Table/Table";
import Modal from "./../../components/common/Modal/Modal"; // Asegúrate de importar correctamente tu Modal

function MovementsTable() {
  const [filters, setFilters] = useState({
    desde: "",
    hacia: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const [selectedMovement, setSelectedMovement] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const movements = [
    { id: 1, tipo: "Traslado", descripcion: "Paracetamol a Depósito Secundario", desde: "Depósito Central", hacia: "Depósito Secundario", fecha: "2024-08-15" },
    { id: 2, tipo: "Recepción", descripcion: "Ibuprofeno desde Depósito Secundario", desde: "Depósito Secundario", hacia: "Depósito Central", fecha: "2024-08-14" },
    { id: 3, tipo: "Despacho", descripcion: "Amoxicilina a Depósito Norte", desde: "Depósito Central", hacia: "Depósito Norte", fecha: "2024-08-13" },
  ];

  const movementDetails = {
    1: {
      tipo: "Traslado",
      descripcion: "Paracetamol a Depósito Secundario",
      desde: "Depósito Central",
      hacia: "Depósito Secundario",
      fecha: "2024-08-15",
      realizadoPor: "Juan Pérez",
      productos: [
        { id: 1, nombre: "Paracetamol", lote: "A123", cantidad: 50 },
        { id: 2, nombre: "Paracetamol", lote: "A124", cantidad: 25 },
      ],
    },
    2: {
      tipo: "Recepción",
      descripcion: "Ibuprofeno desde Depósito Secundario",
      desde: "Depósito Secundario",
      hacia: "Depósito Central",
      fecha: "2024-08-14",
      realizadoPor: "María López",
      productos: [
        { id: 1, nombre: "Ibuprofeno", lote: "B456", cantidad: 30 },
      ],
    },
    3: {
      tipo: "Despacho",
      descripcion: "Amoxicilina a Depósito Norte",
      desde: "Depósito Central",
      hacia: "Depósito Norte",
      fecha: "2024-08-13",
      realizadoPor: "Carlos García",
      productos: [
        { id: 1, nombre: "Amoxicilina", lote: "C789", cantidad: 100 },
      ],
    },
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleRowClick = (movementId) => {
    setSelectedMovement(movementDetails[movementId]);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Movimientos de Stock</h2>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Desde depósito</label>
          <select
            name="desde"
            value={filters.desde}
            onChange={handleFilterChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="Depósito Central">Depósito Central</option>
            <option value="Depósito Secundario">Depósito Secundario</option>
            <option value="Depósito Norte">Depósito Norte</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Hacia depósito</label>
          <select
            name="hacia"
            value={filters.hacia}
            onChange={handleFilterChange}
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Todos</option>
            <option value="Depósito Central">Depósito Central</option>
            <option value="Depósito Secundario">Depósito Secundario</option>
            <option value="Depósito Norte">Depósito Norte</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rango de fechas</label>
          <div className="grid grid-cols-2 gap-2">
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
      <Table>
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
            <TRow key={movement.id} onClick={() => handleRowClick(movement.id)} className="cursor-pointer hover:bg-gray-100">
              <TData>{movement.tipo}</TData>
              <TData>{movement.descripcion}</TData>
              <TData>{movement.desde}</TData>
              <TData>{movement.hacia}</TData>
              <TData>{movement.fecha}</TData>
            </TRow>
          ))}
        </TBody>
      </Table>

      {isModalOpen && selectedMovement && (
        <Modal onClose={handleCloseModal}>
          <div className="p-6">
            <h3 className="text-2xl font-semibold mb-4 text-primary-dark">Detalles del Movimiento</h3>
            <div className="flex flex-wrap justify-between mb-6">
              <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
                <p><strong>Tipo de movimiento:</strong> {selectedMovement.tipo}</p>
                <p><strong>Desde:</strong> {selectedMovement.desde}</p>
              </div>
              <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
                <p><strong>Hacia:</strong> {selectedMovement.hacia}</p>
                <p><strong>Fecha:</strong> {selectedMovement.fecha}</p>
              </div>
              <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
                <p><strong>Realizado por:</strong> {selectedMovement.realizadoPor}</p>
                <p><strong>Descripción:</strong> {selectedMovement.descripcion}</p>
              </div>
            </div>
            <Table>
              <THead>
                <THeadRow>
                  <TData>Producto</TData>
                  <TData>Lote</TData>
                  <TData>Cantidad</TData>
                </THeadRow>
              </THead>
              <TBody>
                {selectedMovement.productos.map((producto) => (
                  <TRow key={producto.id}>
                    <TData>{producto.nombre}</TData>
                    <TData>{producto.lote}</TData>
                    <TData>{producto.cantidad}</TData>
                  </TRow>
                ))}
              </TBody>
            </Table>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-primary-dark transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MovementsTable;
