import axiosInstance from "./../axiosInstance";

export const getAllProducts = async () => {
  try {
    const result = await axiosInstance.get("/products");
    return result.data;
  } catch (error) {
    console.error("Error fetching products", error);
    throw error; // Lanza el error para que React Query lo capture
  }
};

export const createProduct = async (data) => {
  try {
    const result = await axiosInstance.post("/products", data);
    return result.data;
  } catch (error) {
    console.error("Error creating product", error);
    throw error;
  }
};

export const updateProduct = async (data) => {
  try {
    const result = await axiosInstance.put(`/products/${data.id}`, data);
    return result.data;
  } catch (error) {
    console.error("Error updating product", error);
    throw error;
  }
}

export const deleteProduct = async (id) => {
  try {
    const result = await axiosInstance.delete(`/products/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
}