import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import logo from "../../Image/logo.png";
import Home from "../../Pages/home/Home";
import Login from "../../Pages/Login/index";
import List from "../../Pages/list/List";
import ListService from "../../Pages/ListService/List";
import Single from "../../Pages/single/Single";
import New from "../../Pages/new/New";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "../../formSource";
import "../../style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
const { Header, Content, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const DefaultLayoutComponent = () => {
  const { i18n } = useTranslation();
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(window.location.pathname);
    }
  }, []);
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="users">
          <Route index element={<List />} />
        </Route>
        <Route path="services">
          <Route index element={<ListService />} />
        </Route>
        {/* <Route
              exact
              path="/userManagement/create"
              element={<RegisterForm />}
            />
            <Route
              exact
              path="/userManagement/edit"
              element={<EditUserPage />}
            />

            <Route
              exact
              path="/ServiceManagement/systemServices"
              element={<SystemService />}
            />
            <Route
              exact
              path="/ServiceManagement/listBookingServices"
              element={<BookingService />}
            />
            <Route exact path="/configuration" element={<Configuration />} /> */}
      </Routes>
      {/* <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes> */}
    </div>
  );
};

const DefaultLayout = withTranslation()(DefaultLayoutComponent);
export default DefaultLayout;
