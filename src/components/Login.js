import {
  FormControl,
  Grid,
  Paper,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import axios from "./axios";
import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Login = () => {
  const paperStyle = {
    padding: 30,
    height: "40vh",
    width: 500,
    margin: "10% auto",
  };

  // const emailRef = useRef();
  // const passwordRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch, isFetching } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FALIURE" });
    }
  };
  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h1 style={{ color: "#3d5a5f" }}>Login</h1>
          </Grid>
          <form action="" onSubmit={submitHandler}>
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width="100%"
                required
              />
            </FormControl>
            <br />
            <br />
            <Button
              type="submit"
              variant="contained"
              disabled={isFetching}
              style={{ backgroundColor: "#3d5a5f", color: "white" }}
              fullWidth
            >
              LOGIN
            </Button>
            <p>Forgot Password</p>
            <p>
              Don't have a account yet?{" "}
              <Link to={"/registration"}>Register</Link>
            </p>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
