import React, { useState } from "react";
import ProductsTable from "../features/ProductsList/ProductsTable";
import ProductDetails from "../features/ProductsList/ProductDetails";
import { GrList } from "react-icons/gr";
import { getAllProducts } from "../api/products/productsServices";
import { toast } from "react-toastify";
import LoaderComponent from "../utils/LoaderComponent";
import { useQuery } from "@tanstack/react-query";

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Configura la cache con 'staleTime' para evitar múltiples llamadas
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 300000, // 5 minutos
    onError: (error) => {
      console.error(error);
      toast.error("Error al cargar los productos");
    },
  });

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="space-y-2 p-2">
      <div className="flex justify-between items-center px-2">
        <div className="flex items-center">
          <GrList className="inline mr-2 text-xl" />
          <h2 className="m-0 text-xl font-bold inline">Listado de Productos</h2>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
          Nuevo Producto
        </button>
      </div>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <LoaderComponent />
          </div>
        ) : (
          <ProductsTable products={products} onRowClick={handleRowClick} />
        )}
      </div>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <ProductDetails product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductsPage;
