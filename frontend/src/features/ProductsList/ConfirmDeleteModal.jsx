import React from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../api/products/productsServices";
import Modal from "./../../components/common/Modal";

function ConfirmDeleteModal({ isModalOpen, closeModal, id }) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries(["products"]);
      toast.success("Producto eliminado correctamente");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error al eliminar el producto");
    },
  });

  const handleConfirmDelete = async () => {
    mutate(id);
  };

  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal} className="h-48">
          <div className="mx-auto p-4 bg-white">
            <h2 className="text-xl font-bold mb-3">Eliminar Producto</h2>
            <p className="text-sm text-gray-500 mb-3">
              ¿Estás seguro que deseas eliminar este producto?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Eliminar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

export default ConfirmDeleteModal;
