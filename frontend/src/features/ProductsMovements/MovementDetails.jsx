// src/features/ProductsMovements/MovementDetails.jsx
import React from "react";
import PropTypes from "prop-types";
import { Table, THead, THeadRow, TBody, TRow, TData } from "./../../components/common/Table/Table";

function MovementDetails({ movement }) {
  if (!movement) {
    return <p className="text-gray-500">Selecciona un movimiento para ver los detalles.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-dark">Detalles del Movimiento</h3>
      <div className="flex flex-wrap justify-between mb-0">
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Tipo de movimiento:</strong> {movement.tipo}</p>
          <p><strong>Desde:</strong> {movement.desde}</p>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Hacia:</strong> {movement.hacia}</p>
          <p><strong>Fecha:</strong> {movement.fecha}</p>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Realizado por:</strong> {movement.realizadoPor}</p>
          <p><strong>Descripción:</strong> {movement.descripcion}</p>
        </div>
      </div>
      <Table maxHeight={"150px"}>
        <THead>
          <THeadRow>
            <TData>Producto</TData>
            <TData>Lote</TData>
            <TData>Cantidad</TData>
          </THeadRow>
        </THead>
        <TBody>
          {movement.productos.map((producto) => (
            <TRow key={producto.id}>
              <TData>{producto.nombre}</TData>
              <TData>{producto.lote}</TData>
              <TData>{producto.cantidad}</TData>
            </TRow>
          ))}
        </TBody>
      </Table>
    </div>
  );
}

MovementDetails.propTypes = {
  movement: PropTypes.object,
};

export default MovementDetails;
