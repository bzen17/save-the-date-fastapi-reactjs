import React, { useState, useEffect, useReducer, useContext } from "react";
import { useAuth } from "../../redux/store/auth-context";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { login } from "../../api/auth";
import Copyright from "../../components/Copyright";
import formReducer from "../../redux/reducers/formReducer";
import Logo from "../../components/Logo";
import { Typography } from "@mui/material";
const Login = () => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [usernameState, dispatchUsername] = useReducer(formReducer, {
    value: "",
    isValid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(formReducer, {
    value: "",
    isValid: null,
  });
  const authCtx = useAuth();
  const { isValid: usernameIsValid } = usernameState;
  const { isValid: passwordIsValid } = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      setFormIsValid(usernameIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(identifier);
    };
  }, [usernameIsValid, passwordIsValid]);
  const onLoginSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const loginData = {
      username: data.get("username"),
      password: data.get("password"),
    };
    //const token = await login(loginData)
    authCtx.onLogin(usernameState.value, passwordState.value);
  };

  const usernameChangeHandler = (event) => {
    dispatchUsername({ type: event.target.name, value: event.target.value });
  };
  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: event.target.name, value: event.target.value });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="d-flex align-items-center">
          <Logo padding="1rem" />
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        style={{ display: "flex" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box component="form" noValidate onSubmit={onLoginSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              value={usernameState.value}
              onChange={usernameChangeHandler}
              autoFocus
              color="secondary"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={passwordState.value}
              onChange={passwordChangeHandler}
              autoComplete="current-password"
              color="secondary"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="secondary"
            >
              LOGIN
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
