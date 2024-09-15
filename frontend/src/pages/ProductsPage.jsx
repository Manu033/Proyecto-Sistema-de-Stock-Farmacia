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
import Pager from "../components/common/Pager";

function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch de todos los productos con paginación
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", currentPage], // El queryKey incluye currentPage
    queryFn: () => getAllProducts(currentPage), // Asegúrate de que pase el límite (2 productos por página)
    keepPreviousData: true, // Mantener datos previos durante el cambio de página
    staleTime: 300000, // 5 minutos de caché
    onError: (error) => {
      console.error(error);
      toast.error("Error al cargar los productos");
    },
  });

  // Carga si los productos están en búsqueda o aún no han sido cargados
  const isLoadingData = isLoading || isFetching;

  const products = data?.data.products || [];
  const productsPagination = data?.pagination;

  // Fetch de productos por nombre
  const { data: dataFiltered, isFetching: isSearching } = useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => searchProductByName(searchTerm),
    enabled: !!searchTerm,
    onError: (error) => {
      console.error(error);
      toast.error("Error al buscar los productos");
    },
  });

  const filteredData = dataFiltered?.data.products;

  // Función de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedProduct(null);
  };

  // Función para manejar el click en una fila de producto
  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

  // Función para cambiar la página
  const handlePageChange = (page) => {
    setCurrentPage(page); // Actualiza el estado de la página actual
  };

  return (
    <div className="space-y-2 p-2 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center bg-white p-2 rounded-lg shadow-md">
        <div className="flex items-center">
          <GrList className="inline mr-2 text-xl text-primary" />
          <h2 className="m-0 text-lg font-semibold text-gray-800">
            Listado de Productos
          </h2>
        </div>
        <button className="bg-primary text-white px-4 py-2 rounded-lg shadow hover:bg-primary-dark transition duration-300">
          Nuevo Producto
        </button>
      </div>

      <div className="flex justify-between w-full items-end">
        <SearchInput onSearch={handleSearch} />
        <Pager
          pagination={productsPagination} // Paginación desde el backend
          onPageChange={handlePageChange} // Cambia de página
          currentPage={currentPage} // Página actual en el estado
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        {isLoadingData || isSearching ? (
          <div className="h-[200px] flex items-center justify-center">
            <LoaderComponent />
          </div>
        ) : (
          <>
            <ProductsTable
              products={filteredData ? filteredData : products} // Datos de productos o filtrados
              onRowClick={handleRowClick}
            />
          </>
        )}
      </div>

      <div className="bg-white shadow-lg rounded-lg border border-gray-200 p-4">
        <ProductDetails product={selectedProduct} />
      </div>
    </div>
  );
}

export default ProductsPage;
