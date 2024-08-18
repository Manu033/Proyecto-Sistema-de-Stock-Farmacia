import React from "react";
import PropTypes from "prop-types";
import { Table, THead, THeadRow, TBody, TRow, TData } from "./../../components/common/Table/Table";

function ProductDetails({ product }) {
  if (!product) {
    return <p className="text-gray-500">Selecciona un producto para ver los detalles.</p>;
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-dark">Detalles del Producto</h3>
      <div className="flex flex-wrap justify-between mb-0">
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Nombre:</strong> {product.nombre}</p>
          <p><strong>Categoría:</strong> {product.categoria}</p>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Precio:</strong> {product.precio}</p>
          <p><strong>Stock:</strong> {product.stock}</p>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Descripción:</strong> {product.descripcion}</p>
        </div>
      </div>
      <Table maxHeight={"150px"}>
        <THead>
          <THeadRow>
            <TData>Lote</TData>
            <TData>Cantidad</TData>
            <TData>Fecha de Vencimiento</TData>
          </THeadRow>
        </THead>
        <TBody>
          {product.lotes.map((lote) => (
            <TRow key={lote.id}>
              <TData>{lote.numero}</TData>
              <TData>{lote.cantidad}</TData>
              <TData>{lote.fechaVencimiento}</TData>
            </TRow>
          ))}
        </TBody>
      </Table>
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object,
};

export default ProductDetails;
