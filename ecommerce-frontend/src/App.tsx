import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";
import { AuthProvider } from "./context/AuthProvider";
import Cart from "./pages/Cart/Cart";
import { CartProvider } from "./context/CartProvider";
import Checkout from "./pages/Checkout/Checkout";
import OrderSuccess from "./pages/OrderSuccess/OrderSuccess";
import Orders from "./pages/Orders/Orders";
import OrderDetails from "./pages/OrderDetails/OrderDetails";
import AdminProducts from "./pages/admin/AdminProducts";
import { useAuth } from "./context/useAuth";



function AdminProductsRoute(){
  const {isAuthenticated, isAdmin} = useAuth();


  if(!isAuthenticated){
    return <Navigate to= "/login" replace />
    
  }


  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <AdminProducts />;
  
}

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
        <Route
  path="/checkout"
  element={<Checkout />}
/>
<Route
  path="/order-success/:orderId"
  element={<OrderSuccess />}
/>
<Route
  path="/orders"
  element={<Orders />}
/>

<Route
  path="/orders/:orderId"
  element={<OrderDetails />}
/>
<Route path="/account" element={<div>Account</div>} />


  <Route 
  path = "/admin/products"
  element = {
    <AdminProductsRoute/>
  }
  />
      </Routes>
    </BrowserRouter>
      </CartProvider>
      
   
    </AuthProvider>




    
  );




  }




export default App;