import { Provider } from "react-redux";
import { store } from "./store";
import AppRoutes from "./routes/index";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "./components/common/ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
         <Toaster  />
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
