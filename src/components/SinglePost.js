import { React, useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "./axios";
import { Context } from "../context/Context";
import "./singlePost.css";

function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      const result = await axios.get("/getPost/" + path);
      setPost(result.data);
      setTitle(result.data.title);
      setDesc(result.data.desc);
    };
    fetchPost();
  }, [path]);
  const PF = "https://blogger1-vikas.herokuapp.com/images/";

  const deleleHandler = async () => {
    try {
      await axios.delete(`/deletePost/${post._id}`, {
        data: { username: user.fullname },
      });
      window.location.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  const updateHandler = async () => {
    try {
      await axios.put(`/updatePost/${post._id}`, {
        username: user.fullname,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="single">
      <div className="single__header">
        <h1>MyWays Blogs</h1>
        <button style={{ backgroundColor: "transparent", border: "none" }}>
          <Link to="/">Go Back</Link>
        </button>
      </div>
      <div className="single__postContainer">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="single__postImage" />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="single__titleInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="single__title">
            {title}
            {post.username === user?.fullname && (
              <div className="single__edit">
                <Link className="single__icon">
                  <EditIcon onClick={() => setUpdateMode(true)} />
                </Link>
                <DeleteIcon className="single__icon" onClick={deleleHandler} />
              </div>
            )}
          </h1>
        )}

        <div className="single__info">
          <span className="single__postauthor">
            Author:
            <Link to={`/?user=${post.username}`}>
              <strong>{post.username}</strong>
            </Link>
          </span>
          <span className="single__date">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="single__descInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="single__desc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={updateHandler}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}

export default SinglePost;
