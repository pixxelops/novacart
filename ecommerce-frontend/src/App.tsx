import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthProvider";



function App() {
  return (
    <AuthProvider>
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
        <Route path="/cart" element={<div>Cart</div>} />
<Route path="/account" element={<div>Account</div>} />
      </Routes>
    </BrowserRouter>
   
    </AuthProvider>
    
  );


}

export default App;