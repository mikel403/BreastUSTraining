import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";
import router from "./routing/routes";
import useAuthStore from "./store/store";
import refreshRequest from "./api/refreshRequest";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

const queryClient = new QueryClient();
//
// const intervalRef = useRef();

const Root = () => {
  const refreshToken = useAuthStore((state) => state.refreshtoken);

  useEffect(() => {
    if (refreshToken) {
      const intervalId = setInterval(() => {
        refreshRequest();
      }, 4 * 60 * 1000); // 4 minutes

      // Cleanup interval on unmount
      return () => clearInterval(intervalId);
    }
  }, [refreshToken]);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ChakraProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
