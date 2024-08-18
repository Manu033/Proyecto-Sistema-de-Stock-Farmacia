import React from "react";
import { Form, Field } from "react-final-form";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, null, 2));
};

function MedicamentoForm() {
  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Formulario de Medicamento</h2>
      <Form
        onSubmit={onSubmit}
        initialValues={{
          producto: "Paracetamol",
          fechaCaducidad: "2025-12-01",
          cantidadDisponible: 100,
          hueco: "A1",
          lote: "Lote 123",
          unidad: "Caja",
          deposito: "Depósito Central",
          fechaCreacion: "2024-01-01",
          categoriaProducto: "Analgesico",
        }}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-gray-700">Producto</label>
                <Field
                  name="producto"
                  component="input"
                  type="text"
                  placeholder="Nombre del Producto"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Fecha de Caducidad</label>
                <Field
                  name="fechaCaducidad"
                  component="input"
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Cantidad Disponible</label>
                <Field
                  name="cantidadDisponible"
                  component="input"
                  type="number"
                  placeholder="Cantidad Disponible"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Hueco</label>
                <Field
                  name="hueco"
                  component="input"
                  type="text"
                  placeholder="Hueco de Almacenamiento"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Lote</label>
                <Field
                  name="lote"
                  component="input"
                  type="text"
                  placeholder="Número de Lote"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Unidad</label>
                <Field
                  name="unidad"
                  component="input"
                  type="text"
                  placeholder="Unidad"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Depósito</label>
                <Field
                  name="deposito"
                  component="input"
                  type="text"
                  placeholder="Depósito"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Fecha de Creación</label>
                <Field
                  name="fechaCreacion"
                  component="input"
                  type="date"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-gray-700">Categoría del Producto</label>
                <Field
                  name="categoriaProducto"
                  component="input"
                  type="text"
                  placeholder="Categoría del Producto"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                disabled={submitting || pristine}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
                className="ml-4 bg-gray-600 text-white px-6 py-2 rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Reset
              </button>
            </div>
            <pre className="mt-6 bg-gray-100 p-4 rounded-md">{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
}

export default MedicamentoForm;
