import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Layout from "../Componet/Layout/Layout";
import { CustomFecthDataAxios } from "../ApiService/Service";
import GlobalNotify from "../TostifyComp/GlobalNotify";
import { useNavigate } from "react-router-dom";
import { AuthLoginContext } from "../Auth/Auth";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { setAuth } = useContext(AuthLoginContext);
  const navigtor = useNavigate();
  const [FormStateTogler, setFormStateTogler] = useState(false);

  //Login Api handler
  const submitFormLogin = (data) => {
    let body = {
      email: data.email,
      password: data.password,
    };
    CustomFecthDataAxios("auth/loginuser", body).then((resp) => {
      if (resp.data?.code === 200) {
        GlobalNotify(resp?.Msg, "success");
        navigtor("/");
        reset();
        sessionStorage.setItem("LoginDetails", JSON.stringify(resp?.data));
        setAuth({ userData: resp?.data });
      } else {
        GlobalNotify(resp?.data?.Msg, "error");
      }
    });
  };

  const submitFormResetPassword = (data) => {
    if (data.newpassword === data.conformnewpassword) {
      //forget password api
    } else {
      GlobalNotify("New Password And Confirm New Password is not Same", "info");
    }
  };
  const inputLabelProps = {
    style: { color: "white", fontWeight: 700, fontSize: "20px" },
  };
  const inputProps = {
    style: { color: "white" },
  };
  const StyleBorder = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: " #b7fff6",
        borderWidth: "2px",
      },
    },
  };
  return (
    <Layout>
      <div className="Login_main">
        <div className="Login_form_main">
          <h1 className="login_form_heading">
            {FormStateTogler ? "Reset Password" : "Login"}
          </h1>
          {FormStateTogler ? (
            <form
              autoComplete="off"
              onSubmit={handleSubmit(submitFormResetPassword)}
            >
              <div className="mb-2">
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  sx={StyleBorder}
                  InputLabelProps={inputLabelProps}
                  inputProps={inputProps}
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus
                  {...register("email", {
                    required: true,
                  })}
                  error={!!errors.email}
                />
              </div>
              <div className="mb-2">
                <TextField
                  type="password"
                  label="Old Password"
                  variant="outlined"
                  sx={StyleBorder}
                  InputLabelProps={inputLabelProps}
                  inputProps={{
                    ...inputProps,
                    maxLength: 20,
                  }}
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus
                  {...register("oldpassword", {
                    required: true,
                    minLength: 5,
                  })}
                  error={!!errors.oldpassword}
                />
              </div>
              <div className="mb-2">
                <TextField
                  type="password"
                  label="New Password"
                  variant="outlined"
                  sx={StyleBorder}
                  InputLabelProps={inputLabelProps}
                  inputProps={{
                    ...inputProps,
                    maxLength: 20,
                  }}
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus
                  {...register("newpassword", {
                    required: true,
                    minLength: 5,
                  })}
                  error={!!errors.newpassword}
                />
              </div>
              <div className="mb-2">
                <TextField
                  type="password"
                  label="Confirm New Password"
                  variant="outlined"
                  sx={StyleBorder}
                  InputLabelProps={inputLabelProps}
                  inputProps={{
                    ...inputProps,
                    maxLength: 20,
                  }}
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus
                  {...register("conformnewpassword", {
                    required: true,
                    minLength: 5,
                  })}
                  error={!!errors.conformnewpassword}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <button type="submit" className="btn btn-light">
                  Reset Password
                </button>
                <h3
                  title="Go to Login form"
                  className="text-info cursor_pointer"
                  onClick={() => setFormStateTogler(false)}
                >
                  Login
                </h3>
              </div>
            </form>
          ) : (
            <form autoComplete="off" onSubmit={handleSubmit(submitFormLogin)}>
              <div className="mb-2">
                <TextField
                  type="email"
                  label="Email"
                  variant="outlined"
                  sx={StyleBorder}
                  InputLabelProps={inputLabelProps}
                  inputProps={inputProps}
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus
                  {...register("email", {
                    required: true,
                  })}
                  error={!!errors.email}
                />
              </div>
              <div className="mb-2">
                <TextField
                  type="password"
                  label="Password"
                  variant="outlined"
                  sx={StyleBorder}
                  InputLabelProps={inputLabelProps}
                  inputProps={{
                    ...inputProps,
                    maxLength: 20,
                  }}
                  fullWidth
                  margin="normal"
                  size="small"
                  autoFocus
                  {...register("password", {
                    required: true,
                    minLength: 5,
                  })}
                  error={!!errors.password}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignContent: "center",
                }}
              >
                <button type="submit" className="btn btn-light">
                  Login
                </button>
                <h3
                  title="Go to Reset Password form"
                  className="text-info cursor_pointer"
                  onClick={() => setFormStateTogler(true)}
                >
                  Reset Password
                </h3>
              </div>
            </form>
          )}
        </div>
      </div>
    </Layout>
  );
}
