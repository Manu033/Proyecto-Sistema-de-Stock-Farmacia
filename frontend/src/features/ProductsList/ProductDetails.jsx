import React from "react";
import PropTypes from "prop-types";
import { Table, THead, THeadRow, TBody, TRow, TData } from "./../../components/common/Table/Table";
import { formatDateTime } from "../../utils/helpers";

function ProductDetails({ product }) {
  if (!product) {
    return <p className="text-gray-500">Selecciona un producto para ver los detalles.</p>;
  }

  const totalQuantity = product.lots.reduce((acc, lot) => acc + lot.quantity, 0);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-primary-dark">Detalles del Producto</h3>
      <div className="flex flex-wrap justify-between mb-0">
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Nombre:</strong> {product.name}</p>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Stock:</strong> {totalQuantity}</p>
        </div>
        <div className="flex flex-col w-full sm:w-1/2 lg:w-1/3 mb-4">
          <p><strong>Descripción:</strong> {product.description}</p>
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
          {product.lots.map((lot) => (
            <TRow key={lot.id}>
              <TData>{lot.lotCode}</TData>
              <TData>{lot.quantity}</TData>
              <TData>{formatDateTime(lot.dueDate)}</TData>
            </TRow>
          ))}
        </TBody>
      </Table>
      {product.lots.length === 0 && <p className="text-gray-500 text-center my-2">No hay lotes para este producto.</p>}
    </div>
  );
}

ProductDetails.propTypes = {
  product: PropTypes.object,
};

export default ProductDetails;