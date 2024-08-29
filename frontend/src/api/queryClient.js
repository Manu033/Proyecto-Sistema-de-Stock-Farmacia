// src/api/queryClient.js
import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Reintentar automáticamente fallas 2 veces
      refetchOnWindowFocus: false, // No refetch cuando la ventana recobra foco
    },
  },
});

export default queryClient;
