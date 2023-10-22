import React, { useEffect } from "react";
import Hero from "./pages/Hero/Hero";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./pages/Footer/Footer";
import Login from "./pages/Login/Login";
import Navbar from "./pages/Navbar/Navbar";
import { login } from "./features/Employee";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Account from "./pages/Account/Account";
import NotFound from "./pages/NotFound/PageNotFound";
import ProtectedRoute from "./pages/Protected/ProtectedRoute";
import Testaccount from "./pages/Testaccount/Testaccount";
import UserNotFound from "./pages/NotFound/UserNotFound";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";

export default function App() {
  const dispatch = useDispatch();
  const employee = JSON.parse(localStorage.getItem("employee"));

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
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/accounts/:username"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/user-not-found" element={<UserNotFound />} />
        <Route path="/form" element={<Form/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
