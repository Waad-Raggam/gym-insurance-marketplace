import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import {
  TextField,
  FormControl,
  Input,
  InputLabel,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have one uppercase, one lowercase, one number, and one special character"
      ),
  })
  .required();

export default function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:5125/api/v1/User/LogIn", data)
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        console.log("User logged in:", decodedToken);

        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", decodedToken.role === "Admin");

        if (decodedToken.role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/gymForm");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please check your credentials.");
      });
  };

  return (
    <div>
      <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
            InputProps={{
              style: { color: "#000000" },
            }}
          />
          <FormControl variant="standard" fullWidth>
            <InputLabel>Password</InputLabel>
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              error={!!errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              sx={{
                color: "#000000", 
              }}
            />
            <Typography color="error" variant="body2">
              {errors.password?.message}
            </Typography>
          </FormControl>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Log In
          </Button>
          <Box textAlign="center" mt={2}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link to="/register" style={{ color: "#1D1A05", textDecoration: "none" }}>
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
    </div>
  );
}
