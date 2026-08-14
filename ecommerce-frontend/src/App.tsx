import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthProvider";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartProvider";



function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
        <Route path="/cart" element={<Cart/>} />
<Route path="/account" element={<div>Account</div>} />
      </Routes>
    </BrowserRouter>
      </CartProvider>
      
   
    </AuthProvider>
    
  );


}

export default App;