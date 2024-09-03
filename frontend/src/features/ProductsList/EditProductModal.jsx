import React from "react";
import { Form, Field } from "react-final-form";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Modal from "../../components/common/Modal";
import { updateProduct } from "../../api/products/productsServices";

function EditProductModal({ isModalOpen, closeModal, initialValues }) {
  const { queryClient } = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => updateProduct(data),
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries(["products"]);
      toast.success("Producto modificado correctamente");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error al crear el producto");
    },
  });

  const onSubmit = async (values) => {
    const data = JSON.stringify(values);
    mutate(data);
  };

  const required = (value) => (value ? undefined : "Campo requerido");

  return (
    <>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <div className="mx-auto p-4 bg-white">
            <h2 className="text-xl font-bold mb-3">Editar Producto</h2>
            <Form
              initialValues={initialValues}
              onSubmit={onSubmit}
              render={({ handleSubmit, submitting, pristine }) => (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Nombre
                      </label>
                      <Field name="nombre" validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <input
                              {...input}
                              type="text"
                              placeholder="Nombre del producto"
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            />
                            {meta.error && meta.touched && (
                              <span className="text-red-500 text-xs">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Descripción
                      </label>
                      <Field name="descripcion" validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <textarea
                              {...input}
                              placeholder="Descripción del producto"
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            />
                            {meta.error && meta.touched && (
                              <span className="text-red-500 text-xs">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>

                    <div className="mb-2">
                      <label className="block text-sm font-medium">
                        Tipo de Producto
                      </label>
                      <Field name="tipoProducto" validate={required}>
                        {({ input, meta }) => (
                          <div>
                            <select
                              {...input}
                              className="w-full p-1 border border-gray-300 rounded text-sm"
                            >
                              <option value="">Selecciona un tipo</option>
                              <option value="Medicamento">Medicamento</option>
                              <option value="Cosmético">Cosmético</option>
                              <option value="Suplemento">Suplemento</option>
                            </select>
                            {meta.error && meta.touched && (
                              <span className="text-red-500 text-xs">
                                {meta.error}
                              </span>
                            )}
                          </div>
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="flex justify-end mt-3">
                    <button
                      type="submit"
                      disabled={submitting || pristine}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </form>
              )}
            />
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditProductModal;
