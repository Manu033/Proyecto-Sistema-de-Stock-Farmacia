import React, { useState } from "react";
import TableEditable from "../components/common/Table/TableEditable";
import SelectField from "../components/common/SelectField/SelectField";
import { MdLocalShipping } from "react-icons/md";

function LogisticsDispatchPage() {
  const [tableData, setTableData] = useState([
    { producto: "", cantidad: "", desdeDeposito: "" },
  ]);

  const handleTableChange = (index, field, value) => {
    const updatedData = tableData.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    setTableData(updatedData);
  };

  const handleTableDelete = (index) => {
    setTableData(tableData.filter((_, i) => i !== index));
  };

  const handleTableAdd = () => {
    setTableData([
      ...tableData,
      { producto: "", cantidad: "", desdeDeposito: "" },
    ]);
  };

  // Ejemplos de opciones para SelectField
  const depositosOptions = [
    { value: "1", label: "Depósito Central" },
    { value: "2", label: "Depósito Secundario" },
  ];

  const productosOptions = [
    { value: "1", label: "Producto 1" },
    { value: "2", label: "Producto 2" },
  ];

  return (
    <div className="space-y-2 p-2">
      <div className="flex items-center px-2">
        <MdLocalShipping className="inline mr-2 text-xl" />{" "}
        <h2 className="m-0 text-xl font-bold inline">
          Remito Logistico de Salida
        </h2>
      </div>
      <div className="flex flex-col h-screen">
        {/* Primer Bloque */}
        <div className="flex-1 p-4 border-b border-gray-300 bg-white space-y-4 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium">Desde Depósito</label>
            <SelectField
              options={depositosOptions}
              onSelect={(option) =>
                console.log("Desde Depósito seleccionado:", option)
              }
              placeholder="Selecciona un depósito"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Destino</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Introduce el destino"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Descripción</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              placeholder="Descripción del remito"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">
              Dirección de Entrega
            </label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Introduce la dirección de entrega"
            />
          </div>
        </div>

        {/* Segundo Bloque */}
        <div className="flex-1 p-4 bg-white space-y-4 overflow-y-auto">
          <TableEditable
            height={"250px"}
            maxHeight={"250px"}
            fields={[
              {
                name: "producto",
                label: "Producto",
                type: "select",
                options: productosOptions,
              },
              { name: "cantidad", label: "Cantidad" },
              {
                name: "desdeDeposito",
                label: "Desde Depósito",
                type: "select",
                options: depositosOptions,
              },
            ]}
            products={tableData}
            onChange={handleTableChange}
            onDelete={handleTableDelete}
          />
          <button
            type="button"
            onClick={handleTableAdd}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Añadir Producto
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogisticsDispatchPage;
