import React, {
  useState,
  //  useEffect
} from "react";
import { useNavigate, Link } from "react-router-dom";
import img from "./assets/logo.png";
import {
  Button,
  Modal,
  TextField,
  CircularProgress,
  Snackbar,
  IconButton,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import { FormControl, FormLabel } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useFormik } from "formik";
import { SignupValidationSchema } from "./components/Validations/Validations";
import { fetchUser } from "./services/user";

function App() {
  const [isLoading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleNotOpen = () => setOpen(false);

  let navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      passWord: "",
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

    if (formik.values.email && formik.values.passWord) {
      const cred = {
        email: formik.values.email,
        passWord: formik.values.passWord,
      };
      setLoading(true);
      fetchUser(cred).then((res) => {
        setLoading(false);
        if (res.length === 0) {
          setOpen(true);
          return;
        } else {
          console.log(res[0]);
          const { username, email, id } = res[0];
          localStorage.setItem("currentUserName", username);
          localStorage.setItem("currentUserId", id);
          localStorage.setItem("currentUserEmail", email);
          navigate("/dashboard");
        }
      });
    }
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleNotOpen}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <>
      <div className="landing">
        <div className="navbar">
          <span className="logo" onClick={() => navigate("/")}>
            <img
              className="logo-img"
              src={img}
              alt="logo"
              onClick={() => navigate("/")}
            />
            <h1>Project Recall</h1>
          </span>

          <Button
            variant="contained"
            style={{ color: "black", backgroundColor: "white" }}
            onClick={() => navigate("/register")}
          >
            Sign Up
          </Button>
        </div>
        <div className="content">
          <h1>
            Complete
            <br />
            Project Management
            <br /> Solution
          </h1>
          <h3>The perfect solution to manage all your projects</h3>
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            endIcon={<ArrowForwardIosIcon />}
            style={{ color: "black", backgroundColor: "white" }}
            onClick={() => handleOpen()}
          >
            Get Started
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleNotOpen}
            // message="Invalid Input"
            action={action}
          >
            <Alert
              onClose={handleNotOpen}
              sx={{ width: "100%" }}
              severity="error"
            >
              Invalid Input
            </Alert>
          </Snackbar>

          <Modal
            open={show}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className="signin">
              {isLoading ? (
                <CircularProgress color="inherit" />
              ) : (
                <form autoComplete="off" onSubmit={handleSubmit}>
                  <h3>Enter your credentials</h3>
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
                  {/* {formik.touched.email && formik.errors.email ? (
                  <span className="error-message">{formik.errors.email}</span>
                ) : null} */}
                  <TextField
                    placeholder="Enter Password"
                    id="passWord"
                    name="passWord"
                    label="Password"
                    onChange={formik?.handleChange}
                    required
                    variant="outlined"
                    color="secondary"
                    type="password"
                    value={formik.values.passWord}
                    error={passwordError}
                    fullWidth
                    sx={{ mb: 5 }}
                    onBlur={formik.handleBlur}
                  />
                  {/* {formik.touched.passWord && formik.errors.passWord ? (
                <span className="error-message">{formik.errors.passWord}<br/></span>
              ) : null} */}
                  <Button variant="outlined" color="secondary" type="submit">
                    Login
                  </Button>
                </form>
              )}
              <p></p>
              <small>
                Need an account? <Link to="/register">Register here</Link>
              </small>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default App;
