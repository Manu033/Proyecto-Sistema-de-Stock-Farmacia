// src/pages/MovementsPage.jsx
import React, { useState } from "react";
import MovementsTable from "../features/ProductsMovements/MovementsTable";
import Modal from "../components/common/Modal";
import NewProductMovementForm from "../features/ProductsMovements/NewProductMovement/NewProductMovementForm";
import { GrTransaction } from "react-icons/gr";

function MovementsPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className="space-y-2 p-2">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center">
          <GrTransaction className="inline mr-2 text-xl" />{" "}
          <h2 className="m-0 text-xl font-bold inline">Movimientos de Stock</h2>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Nuevo Movimiento
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <MovementsTable />
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NewProductMovementForm />
        </Modal>
      )}
    </div>
  );
}

export default MovementsPage;
