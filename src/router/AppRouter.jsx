import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../features/auth/Login";
import Signup from "../features/auth/Signup";
import Home from "../features/MainUserInterface/Home";
import ProtectedRoute from "../router/ProtectedRoute";
import ProductTable from "../features/products/ProductTable";
import CartPage from "../features/cart/CartPage";
import AddressBook from "../features/Address/AddressBook";
import AddressSelection from "../features/Address/AddressSelection";
import PaymentPage  from "../features/Payment/PaymentPage";
import OrderConfirmPage from "../features/OrderConfirmation/OrderConfirmPage";

export default function AppRouter() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>

      <Route
        path="/"
        element={user ? <Navigate to="/home" /> : <Navigate to="/login" />}
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>

        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductTable />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/address-book" element={<AddressBook />} />
        <Route path="/address" element={<AddressSelection />} />
        <Route path="/payment" element={<PaymentPage  />} />
        <Route path="/orderconfirm" element={<OrderConfirmPage />} />
        
        
        

      </Route>

      

    </Routes>
  );
}