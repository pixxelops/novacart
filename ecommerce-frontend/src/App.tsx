import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";



function App() {
  return (
    <BrowserRouter>
    <Navbar/>

    <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />
      </Routes>
    </BrowserRouter>
   
  );


}

export default App;