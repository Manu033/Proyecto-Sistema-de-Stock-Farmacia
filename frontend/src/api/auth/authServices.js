import axiosInstance from './../../api/axiosInstance';

export const loginService = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login/', { email, password });
    return response.data; // Aquí deberías recibir el token y otros datos de la respuesta
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
