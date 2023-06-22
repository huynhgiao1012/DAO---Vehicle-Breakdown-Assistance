import { notification } from "antd";
import {
  GlobalOutlined,
  UserOutlined,
  LockOutlined,
  CloseOutlined,
  DownOutlined,
} from "@ant-design/icons";
import * as React from "react";
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
import { useLoginMutation } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    login({
      email: data.get("email"),
      password: data.get("password"),
    })
      .unwrap()
      .then((payload) => {
        console.log(payload);
        if (payload) {
          notification.open({
            message: "Login",
            description: "loginMessage1",
            icon: <DownOutlined style={{ color: "green" }} />,
          });
          navigate("/home");
          localStorage.setItem("token", payload.token);
        } else {
          notification.open({
            message: "Login",
            description: "loginMessage2",
            icon: <CloseOutlined style={{ color: "red" }} />,
          });
        }
      })
      .catch((error) => {
        if (error) {
          notification.open({
            message: "Login",
            description: "loginMessage2",
            icon: <CloseOutlined style={{ color: "red" }} />,
          });
        }
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
