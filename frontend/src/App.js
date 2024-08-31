import React from "react";
import ReactDOM from "react-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient"; // Asegúrate de que queryClient esté correctamente exportado
import AppRouter from "./app/AppRouter";
import { Provider } from "react-redux";
import store from "./app/store";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={true}
          theme="colored"
        />
        {/* Same as */}
        <ToastContainer />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
