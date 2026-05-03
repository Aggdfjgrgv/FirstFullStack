import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { system } from "./Theme/theme";
import { Router } from "./router/Router";
import { Toaster } from "./components/ui/toaster";

export default function App() {
  return (
    <ChakraProvider value={system}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </ChakraProvider>
  )
}
