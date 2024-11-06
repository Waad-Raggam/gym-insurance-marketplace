import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { TextField, Input, InputLabel, FormControl, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup.object({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must have one uppercase, one lowercase, one number, and one special character"
    ),
}).required();

export default function UserLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (data) => {
    const loginUrl = "http://localhost:5125/api/v1/User/LogIn";
    axios
      .post(loginUrl, data)
      .then((response) => {
        console.log(response, "logged in user");
        localStorage.setItem("token", response.data);
        navigate("/home");
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) {
          if (error.response.data.errors.Email) {
            alert(error.response.data.errors.Email[0]);
          } else if (error.response.data.errors.Password) {
            alert(error.response.data.errors.Password[0]);
          }
        }
      });
  };

  return (
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <TextField
          label="Email"
          variant="standard"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        {/* Password Field */}
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
          <Input
            id="standard-adornment-password"
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
          />
          <p style={{ color: "red" }}>{errors.password?.message}</p>
        </FormControl>

        {/* Submit Button */}
        <Button color="warning" variant="contained" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
