import { React, useState, useEffect } from "react";
import Post from "./Post";
import axios from "./axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/getAllPost" + search);
      setPosts(result.data);
    }

    fetchData();
  }, [search]);
  return (
    <div>
      <h1>Blog Lists</h1>
      <Post posts={posts} />
    </div>
  );
};

export default Home;
