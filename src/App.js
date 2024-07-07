import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import About from "./Pages/About";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import { useContext } from "react";
import { AuthLoginContext } from "./Auth/Auth";
import AdminMidleware from "./Auth/AdminMidleware";
// import Category from "./Pages/Category";
import Admin from "./Pages/Admin.js/Admin";
import Category from "./Pages/Admin.js/Category";
import Product from "./Pages/Admin.js/Product";
import SingleProduct from "./Pages/SingleProduct";
import Cart from "./Pages/Cart";
import AdminDashbord from "./Pages/Admin.js/AdminDashbord";
import TotalOrderDetails from "./Pages/Admin.js/TotalOrderDetails";
import ShippingOrderDetails from "./Pages/Admin.js/ShippingOrderDetails";
import OutForDeliveyDetails from "./Pages/Admin.js/OutForDeliveyDetails";
import DeliveredDetails from "./Pages/Admin.js/DeliveredDetails";
import MyOrders from "./Pages/MyOrders";
function App() {
  const { Auth } = useContext(AuthLoginContext);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      <Route path="/myorders" element={<MyOrders />} />
      {Auth?.userData ? null : (
        <>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
      {/* //Admin Routes */}
      <Route path="admin/*" element={<AdminMidleware><Admin/></AdminMidleware>}>
        <Route path="" element={<AdminDashbord/>} />
        <Route path="add-category" element={<Category/>} />
        <Route path="add-product" element={<Product/>} />
        <Route path="totalorderdetails" element={<TotalOrderDetails/>} />
        <Route path="ShippingOrderDetails" element={<ShippingOrderDetails/>} />
        <Route path="OutForDeliveyDetails" element={<OutForDeliveyDetails/>} />
        <Route path="DeliveredDetails" element={<DeliveredDetails/>} />
      </Route>
      <Route path="/product-details" element={<SingleProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
export default App;
