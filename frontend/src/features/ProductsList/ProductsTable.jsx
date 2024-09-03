import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  THead,
  THeadRow,
  TBody,
  TRow,
  TData,
} from "./../../components/common/Table/Table";

import EditProductModal from "./EditProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { MdDelete, MdEdit } from "react-icons/md";

function ProductsTable({ products, onRowClick }) {
  const [isModalEditOpen, setModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null); // Estado para guardar el ID del producto seleccionado

  const handleEdit = (id) => {
    setSelectedProductId(id); // Guardar el ID del producto que se va a editar
    setModalEditOpen(true); // Abrir el modal de edición
  };

  const handleDelete = (id) => {
    setSelectedProductId(id); // Guardar el ID del producto que se va a eliminar
    setModalDeleteOpen(true); // Abrir el modal de confirmación de eliminación
  };

  return (
    <>
      <Table maxHeight={"200px"} height={"200px"}>
        <THead>
          <THeadRow>
            <TData>Nombre</TData>
            <TData>Descripción</TData>
            <TData>Tipo de Producto</TData>
            <TData className="w-24"></TData>
          </THeadRow>
        </THead>
        <TBody>
          {products?.map((product) => (
            <TRow
              key={product.id}
              onClick={() => onRowClick(product)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TData>{product.name}</TData>
              <TData>{product.description}</TData>
              <TData>{product.productType.name}</TData>
              <TData>
                <button className="mx-1" onClick={() => handleEdit(product.id)}><MdEdit color="orange" size={"1.2rem"}/></button>
                <button className="mx-1"onClick={() => handleDelete(product.id)}><MdDelete color="red" size={"1.2rem"}/></button>
              </TData>
            </TRow>
          ))}
        </TBody>
      </Table>
      <EditProductModal
        isModalOpen={isModalEditOpen}
        closeModal={() => setModalEditOpen(false)}
        initialValues={{ id: selectedProductId }} // Pasar el ID del producto seleccionado al modal de edición
      />
      <ConfirmDeleteModal
        isModalOpen={isModalDeleteOpen}
        closeModal={() => setModalDeleteOpen(false)}
        id={selectedProductId} // Pasar el ID del producto seleccionado al modal de confirmación de eliminación
      />
    </>
  );
}

ProductsTable.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func.isRequired,
};

export default ProductsTable;
