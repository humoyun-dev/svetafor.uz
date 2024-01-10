import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Category, CategoryDetail, Home, Order } from "@/pages";
import { useSavedCartItems } from "@/util/loader.ts";

const App = () => {
  useSavedCartItems();
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/category`} element={<Category />} />
        <Route path={`/category/:slug`} element={<CategoryDetail />} />
        <Route path={`/order/check`} element={<Order />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
