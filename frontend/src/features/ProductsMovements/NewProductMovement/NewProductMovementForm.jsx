import React, { useState } from "react";
import { Form, Field } from "react-final-form";
import TableEditable from "../../../components/common/Table/TableEditable";

function NewProductMovementForm() {
  const [products, setProducts] = useState([
    { producto: "", lote: "", cantidad: "" },
  ]);

  const onSubmit = (values) => {
    console.log("Form values:", { ...values, detalles: products });
    // Aquí puedes manejar la lógica para enviar los datos al backend o realizar otras acciones
  };

  const required = (value) => (value ? undefined : "Campo requerido");

  const addProduct = () => {
    setProducts([...products, { producto: "", lote: "", cantidad: "" }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = products.map((product, i) =>
      i === index ? { ...product, [field]: value } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div className="mx-auto p-4 bg-white">
      <h2 className="text-xl font-bold mb-3">Nuevo Movimiento de Producto</h2>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, pristine }) => (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Tipo de movimiento
                </label>
                <Field name="tipo" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <select
                        {...input}
                        className="w-full p-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Selecciona un tipo</option>
                        <option value="Traslado">Traslado</option>
                        <option value="Recepción">Recepción</option>
                        <option value="Despacho">Despacho</option>
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

              <div className="mb-2">
                <label className="block text-sm font-medium">Desde</label>
                <Field name="desde" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Depósito de origen"
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
                <label className="block text-sm font-medium">Hacia</label>
                <Field name="hacia" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input
                        {...input}
                        type="text"
                        placeholder="Depósito de destino"
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
            </div>

            <div className="mt-2">
              <label className="block text-sm font-medium mb-1">
                Detalles del Producto
              </label>
              <TableEditable
                maxHeight={"250px"}
                height={"250px"}
                fields={[
                  { name: "producto", label: "Producto" },
                  { name: "lote", label: "Lote" },
                  { name: "cantidad", label: "Cantidad" },
                ]}
                products={products}
                onChange={updateProduct}
                onDelete={removeProduct}
              />
              <button
                type="button"
                onClick={addProduct}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
              >
                Añadir Producto
              </button>
            </div>

            <div className="flex justify-end mt-3">
              <button
                type="submit"
                disabled={submitting || pristine}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
              >
                Registrar Movimiento
              </button>
            </div>
          </form>
        )}
      />
    </div>
  );
}

export default NewProductMovementForm;
