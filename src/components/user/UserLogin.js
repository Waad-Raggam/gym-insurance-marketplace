import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { jwtDecode } from "jwt-decode";
import * as yup from "yup";
import {
  AppBar, Toolbar, Typography, Button, Box,
  TextField, Input, InputLabel, FormControl, InputAdornment, IconButton
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Password must have one uppercase, one lowercase, one number, and one special character"),
}).required();

export default function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (data) => {
    axios.post("http://localhost:5125/api/v1/User/LogIn", data)
      .then((response) => {
        const token = response.data;
        localStorage.setItem("token", token);
        
        const decodedToken = jwtDecode(token);
        console.log("User logged in:", decodedToken);
  
        localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("isAdmin", decodedToken.role === "Admin");
  
        navigate("/profile");
      })
      .catch((error) => {
        console.log(error);
        alert("Login failed. Please check your credentials.");
      });
  };
  

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        <FormControl variant="standard">
          <InputLabel>Password</InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            error={!!errors.password}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Log In
        </Button>
      </form>
    </div>
  );
}
