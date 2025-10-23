import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Menu from "./pages/Menu";
import Crud from "./pages/Crud";
import Cashier from "./pages/Cashier";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<p>ری اکت</p>} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/crud" element={<Crud />} />
          <Route path="/Cashier" element={<Cashier />} />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
