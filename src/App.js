import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import SinglePost from "./components/SinglePost";
import Add from "./components/Add";
import { Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import "./App.css";

function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <Navbar />
      <Route exact path="/">
        <Home />
      </Route>

      <Route path="/login">{user ? <Home /> : <Login />}</Route>

      <Route path="/registration">{user ? <Home /> : <Registration />}</Route>

      <Route path="/singlePost">
        <SinglePost />
      </Route>

      <Route path="/add">{user ? <Add /> : <Registration />}</Route>
    </div>
  );
}

export default App;
