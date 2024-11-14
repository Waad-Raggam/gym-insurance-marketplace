import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Input,
  FormControl,
  InputLabel,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must have one uppercase, one lowercase, one number, and one special character"
      ),
    role: yup.string().required("Role is required"),
  })
  .required();

export default function UserRegistration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const signUpUrl = "https://gym-insurance-marketplace-backend.onrender.com/api/v1/User/SignUp";
    axios
      .post(signUpUrl, data)
      .then((response) => {
        console.log(response, "new user");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 400) {
          const { errors } = error.response.data;
          if (errors.Name) alert(errors.Name[0]);
          if (errors.Email) alert(errors.Email[0]);
          if (errors.Password) alert(errors.Password[0]);
          if (errors.PhoneNumber) alert(errors.PhoneNumber[0]);
        }
      });
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 3, boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Registration
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Name"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            InputProps={{
              style: { color: "#000000" },
            }}
          />

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

          <TextField
            label="Phone Number"
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
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
          <TextField
            label="Select Role"
            select
            SelectProps={{
              native: true,
            }}
            {...register("role")}
            error={!!errors.role}
            helperText={errors.role?.message}
            fullWidth
            InputProps={{
              style: { color: "#000000" },
            }}
          >
            {/* <option value="" style={{ color: "#9e9e9e" }}>
              Select Role
            </option> */}
            <option value="Customer" style={{ color: "#1D1A05" }}>
              Customer
            </option>
            <option value="Admin" style={{ color: "#1D1A05" }}>
              Admin
            </option>
          </TextField>

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Sign Up
          </Button>
        </Box>
      </form>
      <Box textAlign="center" mt={2}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{ color: "#1D1A05", textDecoration: "none" }}
          >
            Log in here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
