import React from "react";
import { Form, Field } from "react-final-form";
import SelectField from "../../components/common/SelectField/SelectField";
import { productTypes } from "../../utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../../api/products/productsServices";
import { toast } from "react-toastify";

const required = (value) => (value ? undefined : "Campo requerido");

function MedicamentoForm() {
  const { queryClient } = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (data) => createProduct(data), // Ejecuta createProduct con los datos proporcionados
    onSuccess: () => {
      toast.success("Producto creado correctamente");
      queryClient.invalidateQueries(["products"]);
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

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Formulario de Medicamento</h2>
      <Form
        onSubmit={onSubmit}
        initialValues={{}}
        render={({ handleSubmit, form, submitting, pristine, values }) => {
          // Obtener estado del formulario
          const { errors } = form.getState();
          const hasErrors = Object.keys(errors).length > 0; // Verificar si hay errores

          return (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-gray-700">Producto</label>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="Nombre del Producto"
                    validate={required} // Añade la función de validación aquí
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Field
                    name="name"
                    render={({ meta }) =>
                      meta.touched &&
                      meta.error && (
                        <span className="text-red-500 text-sm">
                          {meta.error}
                        </span>
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Descripción</label>
                  <Field
                    name="description"
                    component="input"
                    type="text"
                    placeholder="Descripción"
                    validate={required} // Añade la función de validación aquí
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <Field
                    name="description"
                    render={({ meta }) =>
                      meta.touched &&
                      meta.error && (
                        <span className="text-red-500 text-sm">
                          {meta.error}
                        </span>
                      )
                    }
                  />
                </div>
                <div>
                  <label className="block text-gray-700">
                    Tipo de producto
                  </label>
                  <Field
                    name="productTypeId"
                    validate={required} // Añade la función de validación aquí
                  >
                    {({ input, meta }) => (
                      <>
                        <SelectField
                          options={productTypes}
                          placeholder={"Tipo de producto"}
                          onSelect={(option) => input.onChange(option.value)} // Conecta la selección con el valor del campo
                        />
                        {meta.touched && meta.error && (
                          <span className="text-red-500 text-sm">
                            {meta.error}
                          </span>
                        )}
                      </>
                    )}
                  </Field>
                </div>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  type="submit"
                  disabled={submitting || pristine || hasErrors}
                  className={`px-6 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    submitting || pristine || hasErrors
                      ? "bg-gray-400 text-white cursor-not-allowed" // Estilo cuando está deshabilitado
                      : "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500" // Estilo cuando está habilitado
                  }`}
                >
                  Submit
                </button>
              </div>
              <pre className="mt-6 bg-gray-100 p-4 rounded-md">
                {JSON.stringify(values, null, 2)}
              </pre>
            </form>
          );
        }}
      />
    </div>
  );
}

export default MedicamentoForm;
