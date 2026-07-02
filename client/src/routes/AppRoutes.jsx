import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import VerifyEmail from "../pages/user/VerifyEmail";
import Profile from "../pages/user/Profile";
import PizzaBuilder from "../pages/user/PizzaBuilder";
import ProtectedRoute from "../components/ProtectedRoute";
import Checkout from "../pages/user/Checkout";
import Orders from "../pages/user/Orders";
import Cart from "../pages/user/Cart";
import Dashboard from "../pages/admin/Dashboard";
import Inventory from "../pages/admin/Inventory";
import AdminOrders from "../pages/admin/Orders";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email/:token" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
        <Route
  path="/pizza-builder"
  element={
    <ProtectedRoute>
      <PizzaBuilder />
    </ProtectedRoute>
  }
/>
        <Route
  path="/cart"
  element={
    <ProtectedRoute>
      <Cart />
    </ProtectedRoute>
  }
/>
        <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
        <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

        {/* Admin Routes */}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/inventory" element={<Inventory />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
