import React from "react";
import PropTypes from "prop-types";
import { Table, THead, THeadRow, TBody, TRow, TData } from "./../../components/common/Table/Table";

function ProductsTable({ products, onRowClick }) {

  return (
    <Table maxHeight={"200px"} height={"200px"}>
      <THead>
        <THeadRow>
          <TData>Nombre</TData>
          <TData>Categoría</TData>
          <TData>Precio</TData>
          <TData>Stock</TData>
        </THeadRow>
      </THead>
      <TBody>
        {products.map((product) => (
          <TRow key={product.id} onClick={() => onRowClick(product)} className="cursor-pointer hover:bg-gray-100">
            <TData>{product.nombre}</TData>
            <TData>{product.categoria}</TData>
            <TData>{product.precio}</TData>
            <TData>{product.stock}</TData>
          </TRow>
        ))}
      </TBody>
    </Table>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default ProductsTable;
