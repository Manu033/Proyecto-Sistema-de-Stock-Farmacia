import axiosInstance from "./../axiosInstance";


export const getAllProducts = async (page, limit) => {
  console.log(page);
  
  const params = {};
  if (page) {
    params.page = page;
  }
  if (limit) {
    params.limit = limit;
  }
  const response = await axiosInstance.get('/products', { params });
  return response.data;
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
};

export const deleteProduct = async (id) => {
  try {
    const result = await axiosInstance.delete(`/products/${id}`);
    return result.data;
  } catch (error) {
    console.error("Error deleting product", error);
    throw error;
  }
};

export const searchProductByName = async (productName) => {
  try {
    const result = await axiosInstance.get(
      `/products/search?query=${productName}`
    );
    return result.data;
  } catch (error) {
    console.error("Error searching product", error);
    throw error;
  }
};
