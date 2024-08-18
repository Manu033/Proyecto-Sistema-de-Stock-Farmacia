import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient"; // Asegúrate de que queryClient esté correctamente exportado
import AppRouter from "./app/AppRouter";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
