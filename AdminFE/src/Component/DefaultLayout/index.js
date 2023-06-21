import {
  SmileOutlined,
  FileOutlined,
  FieldTimeOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PicRightOutlined,
  CheckSquareOutlined,
  FormOutlined,
  TableOutlined,
  SettingOutlined,
  PoweroffOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import "./style/home.css";
import { useNavigate } from "react-router-dom";
import { Layout, Menu, Dropdown } from "antd";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";
import UserManagement from "../../Pages/UserManagement";
import SystemService from "../../Pages/SystemService";
import BookingService from "../../Pages/BookingService";
import Feedback from "../../Pages/Feedbacks";
import Configuration from "../../Pages/Configuration";
import News from "../../Pages/News";
import FormOnlinePage from "../../Pages/FormOnline";
import RegisterForm from "../../Pages/UserManagement/registerForm";
import EditUserPage from "./../../Pages/UserManagement/editUser";
import { useTranslation, withTranslation } from "react-i18next";
import logo from "../../Image/logo.png";
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
  const [collapsed, setCollapsed] = useState(false);
  const { i18n } = useTranslation();
  const [selectedKey, setSelectedKey] = useState([]);
  const menu1 = (
    <Menu
      items={[
        {
          key: "1",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.antgroup.com"
            >
              {i18n.t("changePass")}
            </a>
          ),
          icon: <SettingOutlined />,
        },
        {
          key: "2",
          label: (
            <a
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
            >
              {i18n.t("logout")}
            </a>
          ),
          icon: <PoweroffOutlined />,
        },
      ]}
    />
  );
  const menu2 = (
    <Menu
      items={[
        {
          key: "1",
          label: <a onClick={() => changeLanguage("vi")}>vi Vietnamese</a>,
        },
        {
          key: "2",
          label: <a onClick={() => changeLanguage("en")}>en English</a>,
        },
      ]}
    />
  );
  const items = [
    getItem(i18n.t("Dashboard"), "/dashboard", <FieldTimeOutlined />),
    getItem(i18n.t("UserManage"), "/userManagement", <UserOutlined />),
    getItem(i18n.t("News"), "/news", <PicRightOutlined />),
    getItem(i18n.t("Feedbacks"), "/feedbacks", <CheckSquareOutlined />),
    getItem(i18n.t("FormOnline"), "/formOnline", <FormOutlined />),
    getItem(i18n.t("ServicesMa"), "", <SmileOutlined />, [
      getItem(
        i18n.t("ListBooking"),
        "/ServiceManagement/listBookingServices",
        <TableOutlined />
      ),
      getItem(
        i18n.t("SystemSer"),
        "/ServiceManagement/systemServices",
        <SettingOutlined />
      ),
    ]),
    getItem(i18n.t("Configuration"), "/configuration", <FileOutlined />),
  ];
  const navigate = useNavigate();
  const changeLanguage = (lang) => {
    localStorage.setItem("lang", lang);
    i18n.changeLanguage(localStorage.getItem("lang"));
  };
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("lang"));
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      navigate(window.location.pathname);
    }
  }, []);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          background: "#100444",
        }}
        width={250}
        className="sidebar"
      >
        <div className="logo">
          {!collapsed ? <img alt="Error" src={logo} /> : <a>DAO</a>}
          <a href="">{!collapsed ? "ADMIN PAGE" : ""}</a>
        </div>
        <Menu
          theme="light"
          mode="inline"
          items={items}
          onClick={({ key }) => navigate(key) && setSelectedKey(key)}
          selectedKeys={window.location.pathname}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "white",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="right">
            <Dropdown overlay={menu1}>
              <a onClick={(e) => e.preventDefault()} href="/#">
                <div className="account">
                  <img
                    alt="Error"
                    src="https://api.multiavatar.com/Binx Bond.svg"
                  />
                  <p>Admineh</p>
                </div>
              </a>
            </Dropdown>
            <Dropdown overlay={menu2}>
              <a onClick={(e) => e.preventDefault()} href="/#">
                <div className="language">
                  <GlobalOutlined />
                </div>
              </a>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/userManagement" element={<UserManagement />} />
            <Route exact path="/news" element={<News />} />
            <Route exact path="/feedbacks" element={<Feedback />} />
            <Route exact path="/formOnline" element={<FormOnlinePage />} />
            <Route
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
            <Route exact path="/configuration" element={<Configuration />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

const DefaultLayout = withTranslation()(DefaultLayoutComponent);
export default DefaultLayout;
