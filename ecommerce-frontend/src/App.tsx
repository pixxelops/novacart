import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";



function App() {
  return (
    <BrowserRouter>
    <Navbar/>

    <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<Products />} />


        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
   
  );


}

export default App;