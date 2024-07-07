import React from "react";
import Layout from "../Componet/Layout/Layout";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { CustomFecthDataAxios } from "../ApiService/Service";
import GlobalNotify from "../TostifyComp/GlobalNotify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onTouched" });
  const navigtor = useNavigate();
  function SubmitFun(data) {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
    };
    CustomFecthDataAxios("auth/adduser", body).then((resp) => {
      if (resp.code === 200) {
        GlobalNotify(resp.Msg, "success");
        reset();
        navigtor("/login");
      } else {
        GlobalNotify(resp.Msg, "error");
      }
    });
  }

  return (
    <Layout>
      <div className="Register_main">
        <div className="register_form_main">
          <div>
            <h1 className="register_form_heading">Register Form</h1>
          </div>
          <form onSubmit={handleSubmit(SubmitFun)} autoComplete="off">
            <div className="mb-2">
              <TextField
                label="name"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                autoFocus
                {...register("name", {
                  required: true,
                  minLength: 5,
                })}
                error={!!errors.name}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="Email address"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                type="email"
                {...register("email", { required: true })}
                error={!!errors.email}
              />
            </div>
            <div className="mb-2">
              <TextField
                variant="outlined"
                fullWidth
                label="Mobile no."
                margin="normal"
                size="small"
                type="text" // Keep this as text to control input length
                inputProps={{ maxLength: 10 }}
                {...register("phone", {
                  required: true,
                  minLength: 10,
                  maxLength: 10,
                  pattern: {
                    value: /^[0-9]+$/,
                  },
                })}
                error={!!errors.phone}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                {...register("address", { required: true })}
                error={!!errors.address}
              />
            </div>
            <div className="mb-2">
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                size="small"
                type="password"
                rows={4}
                {...register("password", { required: true })}
                error={!!errors.password}
              />
            </div>
            <button type="submit" className="btn btn-dark">
              Register
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
