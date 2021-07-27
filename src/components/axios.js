import axios from "axios";

const instance = axios.create({
  baseURL: "https://blogger1-vikas.herokuapp.com",
});

export default instance;
