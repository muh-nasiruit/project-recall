import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import graphImg from "../../assets/pr-bg.jpg";
import { SignupValidationSchema } from "../Validations/Validations";
import { Button, TextField, CircularProgress } from "@mui/material";
import { createUser } from "../../services/user";

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      passWord: "",
      confirmPassword: "",
    },
    validationSchema: SignupValidationSchema,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    if (formik.values.email === "") {
      setEmailError(true);
    }
    if (formik.values.passWord === "") {
      setPasswordError(true);
    }
    console.log("submitted");
    setLoading(true);
    createUser(formik?.values).then((res) => {
      setLoading(false);
      navigate("/");
    });
  };
  return (
    <>
      <div className="main-signup">
        <div className="signup-subcontainer">
          <div className="main-signup-img">
            <img src={graphImg} alt="bg-signup" />
          </div>
          <div className="signup-container">
            <form autoComplete="off" onSubmit={handleSubmit}>
              <h3>Account Signup</h3>
              <TextField
                placeholder="Enter Username"
                id="userName"
                name="userName"
                label="Username"
                onChange={formik?.handleChange}
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{ mb: 3 }}
                fullWidth
                value={formik.values.userName}
                // error={emailError}
                onBlur={formik.handleBlur}
              />
              {formik.touched.userName && formik.errors.userName ? (
                <span className="error-message">
                  {formik.errors.userName}
                  <br />
                </span>
              ) : null}
              <TextField
                placeholder="Enter Email"
                id="email"
                name="email"
                label="Email"
                onChange={formik?.handleChange}
                required
                variant="outlined"
                color="secondary"
                type="email"
                sx={{ mb: 3 }}
                fullWidth
                value={formik.values.email}
                error={emailError}
                onBlur={formik.handleBlur}
              />
              {formik.touched.email && formik.errors.email ? (
                <span className="error-message">
                  {formik.errors.email}
                  <br />
                </span>
              ) : null}
              <TextField
                placeholder="Enter Password"
                id="passWord"
                name="passWord"
                label="Password"
                required
                variant="outlined"
                color="secondary"
                type="password"
                error={passwordError}
                fullWidth
                sx={{ mb: 5 }}
                onChange={formik?.handleChange}
                value={formik.values.passWord}
                onBlur={formik.handleBlur}
              />
              {formik.touched.passWord && formik.errors.passWord ? (
                <span className="error-message">
                  {formik.errors.passWord}
                  <br />
                </span>
              ) : null}
              <TextField
                placeholder="Enter Password"
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                required
                variant="outlined"
                color="secondary"
                type="password"
                // error={passwordError}
                fullWidth
                sx={{ mb: 5 }}
                value={formik.values.confirmPassword}
                onChange={formik?.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <span className="error-message">
                  {formik.errors.confirmPassword}
                  <br />
                </span>
              ) : null}
              <Button
                sx={{ width: "100%" }}
                variant="outlined"
                color="secondary"
                type="submit"
              >
                Sign Up
              </Button>
              <br />
              <small>
                Already have an account ? <Link to="/">Sign In</Link>
              </small>
            </form>
          </div>
          {isLoading && <CircularProgress color="inherit" />}
        </div>
      </div>
    </>
  );
}
