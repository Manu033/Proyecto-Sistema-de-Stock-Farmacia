import React, { useState } from "react";
import ProductsTable from "../features/ProductsList/ProductsTable";
import ProductDetails from "../features/ProductsList/ProductDetails";
import { GrList } from "react-icons/gr";
import {
  getAllProducts,
  searchProductByName,
} from "../api/products/productsServices";
import { toast } from "react-toastify";
import LoaderComponent from "../utils/LoaderComponent";
import { useQuery } from "@tanstack/react-query";
import SearchInput from "../components/common/Search/SearchInput";

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch de todos los productos
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 300000,
    onError: (error) => {
      console.error(error);
      toast.error("Error al cargar los productos");
    },
  });

  const products = data?.data.products || [];


  // Fetch de productos por nombre
  const { data: dataFiltered, isFetching: isSearching } = useQuery({
    queryKey: ["searchProducts", searchTerm], // Clave única para la consulta
    queryFn: () => searchProductByName(searchTerm), // Función de consulta
    enabled: !!searchTerm, // Solo ejecutar la consulta si hay un término de búsqueda
    onError: (error) => {
      console.error(error);
      toast.error("Error al buscar los productos");
    },
  });

  const filteredData = dataFiltered?.data.products;

  // Función de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="space-y-4 p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <div className="flex items-center">
          <GrList className="inline mr-2 text-2xl text-primary" />
          <h2 className="m-0 text-2xl font-semibold text-gray-800">
            Listado de Productos
          </h2>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition duration-300">
          Nuevo Producto
        </button>
      </div>

      <SearchInput onSearch={handleSearch} />

      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        {isLoading || isSearching ? (
          <div className="h-[200px] flex items-center justify-center">
            <LoaderComponent />
          </div>
        ) : (
          <ProductsTable
            products={filteredData ? filteredData : products}
            onRowClick={handleRowClick}
          />
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <ProductDetails product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductsPage;
