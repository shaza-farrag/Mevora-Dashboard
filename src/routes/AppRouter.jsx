<<<<<<< HEAD

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
=======
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../components/layout/DashboardLayout";
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import ViewProduct from "../pages/ViewProduct";
import Orders from "../pages/Orders";
import Carts from "../pages/Carts";
import Settings from "../pages/Settings";
import Wishlist from "../pages/Wishlist";

<<<<<<< HEAD
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div className="min-h-screen">
      <Sidebar />

      <div className="min-h-screen">
        <Navbar />

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

=======
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
<<<<<<< HEAD
            <Route
              path="/"
              element={<Navigate to="/dashboard" replace />}
            />
=======
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/add" element={<AddProduct />} />
<<<<<<< HEAD
            <Route
              path="/products/edit/:id"
              element={<EditProduct />}
            />
            <Route
              path="/products/:id"
              element={<ViewProduct />}
            />
=======
            <Route path="/products/edit/:id" element={<EditProduct />} />
            <Route path="/products/:id" element={<ViewProduct />} />
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
            <Route path="/orders" element={<Orders />} />
            <Route path="/carts" element={<Carts />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Route>
        </Route>

<<<<<<< HEAD
        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
=======
        <Route path="*" element={<Navigate to="/" replace />} />
>>>>>>> bec28bfeec5abafaedd5d6bb2070e2d780565267
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
