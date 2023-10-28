import React, { useEffect } from "react";
import Hero from "./pages/Hero/Hero";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Footer from "./pages/Footer/Footer";
import Login from "./pages/Login/Login";
import Navbar from "./pages/Navbar/Navbar";
import Employee, { login } from "./features/Employee";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Account from "./pages/Account/Account";
import NotFound from "./components/NotFound/PageNotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Testaccount from "./pages/Testaccount/Testaccount";
import UserNotFound from "./components/NotFound/UserNotFound";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import Spinnerf from "./components/Spinnerf";
import AdminRoute from "./components/AdminRoute";
import Admin from "./pages/Admin/Admin";
import Dashboard from "./pages/Dashboard/Dashboard";
import PublicRoute from "./components/PublicRoute";

export default function App() {
  const dispatch = useDispatch();

  const employee = JSON.parse(localStorage.getItem("employee"));

  let { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (employee) {
      dispatch(
        login({
          email: employee.email,
          token: employee.token,
          first_name: employee.first_name,
          isauthenticated: true,
        })
      );
    }
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Spinnerf />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/accounts/:username"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <AdminRoute>
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route path="/user-not-found" element={<UserNotFound />} />
            <Route path="/form" element={<Form />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {window.location.pathname !== "/dashboard" && <Footer />}
        </>
      )}
    </BrowserRouter>
  );
}
