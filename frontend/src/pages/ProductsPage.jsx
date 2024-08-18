import React, { useState } from "react";
import ProductsTable from "../features/ProductsList/ProductsTable";
import ProductDetails from "../features/ProductsList/ProductDetails";
import { GrList } from "react-icons/gr";

function ProductsPage() {
  // Ejemplo de datos de productos
  const products = [
    {
      id: 1,
      nombre: "Ibuprofeno 400mg",
      categoria: "Medicamento",
      precio: "$10",
      stock: 50,
      descripcion: "Analgésico y antiinflamatorio",
      lotes: [
        {
          id: 1,
          numero: "Lote A1",
          cantidad: 20,
          fechaVencimiento: "2025-01-01",
        },
        {
          id: 2,
          numero: "Lote B2",
          cantidad: 30,
          fechaVencimiento: "2025-06-01",
        },
      ],
    },
    {
      id: 2,
      nombre: "Paracetamol 500mg",
      categoria: "Medicamento",
      precio: "$8",
      stock: 75,
      descripcion: "Analgésico y antipirético",
      lotes: [
        {
          id: 1,
          numero: "Lote C3",
          cantidad: 40,
          fechaVencimiento: "2024-12-01",
        },
        {
          id: 2,
          numero: "Lote D4",
          cantidad: 35,
          fechaVencimiento: "2025-03-01",
        },
      ],
    },
    // Agrega más productos aquí
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="space-y-2 p-2">
      <div className="flex justify-between items-center px-2">
      <div className="flex items-center">
          <GrList className="inline mr-2 text-xl" />{" "}
          <h2 className="m-0 text-xl font-bold inline">Listado de Productos</h2>
        </div>
        <button
          // onClick={openModal}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
        >
          Nuevo Producto
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <ProductsTable products={products} onRowClick={handleRowClick} />
      </div>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <ProductDetails product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductsPage;
