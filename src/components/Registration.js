import { React, useState } from "react";
import {
  FormControl,
  Grid,
  Paper,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "./axios";

const Registration = () => {
  const paperStyle = {
    padding: 30,
    height: "60vh",
    width: 500,
    margin: "10% auto",
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const res = await axios.post("/register", {
        fullname,
        phone,
        email,
        password,
        password2,
      });
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid>
            <h1 style={{ color: "#3d5a5f" }}>Rgistration</h1>
          </Grid>
          <form action="" onSubmit={submitHandler}>
            <p style={{ color: "red" }}>{error}</p>
            <FormControl fullWidth>
              <InputLabel>FullName</InputLabel>
              <Input
                type="text"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Email</InputLabel>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                width="100%"
                required
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Phone Number</InputLabel>
              <Input
                type="number"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                width="100%"
                required
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                width="100%"
                required
              />
            </FormControl>
            <br />
            <FormControl fullWidth>
              <InputLabel>Confirm Password</InputLabel>
              <Input
                type="password"
                name="password2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                width="100%"
                required
              />
            </FormControl>
            <br />
            <br />
            <p>
              By registering, you agree to the{" "}
              <a href="/registration">Terms & Conditions</a> and{" "}
              <a href="/registration">Privacy Police</a>
            </p>
            <Button
              type="submit"
              variant="contained"
              style={{ backgroundColor: "#3d5a5f", color: "white" }}
              fullWidth
            >
              Register
            </Button>

            <p>
              Alerady have an account ? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Registration;
