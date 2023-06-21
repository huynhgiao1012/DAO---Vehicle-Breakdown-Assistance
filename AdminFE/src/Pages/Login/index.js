// import React from "react";
// import {
//   Button,
//   Checkbox,
//   Form,
//   Input,
//   notification,
//   Menu,
//   Dropdown,
// } from "antd";
// import {
//   GlobalOutlined,
//   UserOutlined,
//   LockOutlined,
//   CloseOutlined,
//   DownOutlined,
// } from "@ant-design/icons";
// import { useNavigate } from "react-router-dom";
// import { useTranslation, withTranslation } from "react-i18next";

// import "./style/login.css";
// import { useEffect } from "react";
// import { useLoginMutation } from "../../services/Auth";
// const LoginComponent = (props) => {
//   const navigate = useNavigate();
//   const { i18n } = useTranslation();
//   const [login] = useLoginMutation();
//   const menu2 = (
//     <Menu
//       items={[
//         {
//           key: "1",
//           label: <a onClick={() => changeLanguage("vi")}>vi Vietnamese</a>,
//         },
//         {
//           key: "2",
//           label: <a onClick={() => changeLanguage("en")}>en English</a>,
//         },
//       ]}
//     />
//   );
//   useEffect(() => {
//     i18n.changeLanguage(localStorage.getItem("lang"));
//   }, []);
//   const changeLanguage = (lang) => {
//     localStorage.setItem("lang", lang);
//     i18n.changeLanguage(localStorage.getItem("lang"));
//   };
//   const onFinish = async (values) => {
//     console.log(values);
//     login({ email: values.username, password: values.password })
//       .unwrap()
//       .then((payload) => {
//         console.log(payload);
//         if (payload) {
//           notification.open({
//             message: i18n.t("Login"),
//             description: i18n.t("loginMessage1"),
//             icon: <DownOutlined style={{ color: "green" }} />,
//           });
//           navigate("/dashboard");
//           localStorage.setItem("token", payload.token);
//         } else {
//           notification.open({
//             message: i18n.t("Login"),
//             description: i18n.t("loginMessage2"),
//             icon: <CloseOutlined style={{ color: "red" }} />,
//           });
//         }
//       });
//   };
//   return (
//     <div className="loginPage">
//       <div className="container1">
//         <div className="dd">
//           <Dropdown overlay={menu2}>
//             <a onClick={(e) => e.preventDefault()} href="/#">
//               <div className="language">
//                 <GlobalOutlined />
//               </div>
//             </a>
//           </Dropdown>
//         </div>
//         <div className="content">
//           <a href="/login">DAO APPLICATIONS</a>
//           <span>ONROAD VEHICLE BREAKDOWN ASSISTANCE</span>
//         </div>
//         <Form
//           name="normal_login"
//           className="login-form"
//           initialValues={{
//             remember: true,
//           }}
//           onFinish={onFinish}
//         >
//           <div className="authen">{i18n.t("Authentication")}</div>
//           <Form.Item
//             name="username"
//             rules={[
//               {
//                 required: true,
//                 message: i18n.t("loginMessage3"),
//               },
//             ]}
//           >
//             <Input
//               prefix={<UserOutlined className="site-form-item-icon" />}
//               placeholder={i18n.t("Username")}
//             />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: i18n.t("loginMessage4"),
//               },
//             ]}
//           >
//             <Input
//               prefix={<LockOutlined className="site-form-item-icon" />}
//               type="password"
//               placeholder={i18n.t("Password")}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Form.Item name="remember" valuePropName="checked" noStyle>
//               <Checkbox>{i18n.t("Remember")}</Checkbox>
//             </Form.Item>
//           </Form.Item>

//           <Form.Item>
//             <Button
//               type="primary"
//               htmlType="submit"
//               className="login-form-button"
//             >
//               {i18n.t("Login")}
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../../Image/logo.png";
import blue from "@mui/material/colors/blue";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        DAO Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

export default function LoginComponent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        style={{ backgroundColor: "white", height: "100vh", padding: 30 }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={logo} style={{ width: 200, height: 200 }} />
          <Typography component="h1" variant="h3" style={{ color: "#F2A902" }}>
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ backgroundColor: "#F2A902" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
