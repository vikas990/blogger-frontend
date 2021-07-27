import { React, useState, useContext } from "react";
import { FormControl, Input, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import axios from "./axios";
import { Context } from "../context/Context";
import "./Add.css";

function Add() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.fullname,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.post("/sendPost", newPost);
      window.location.replace("/singlePost/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="add">
      {file && (
        <img src={URL.createObjectURL(file)} className="add__img" alt="" />
      )}

      <form className="add__form" onSubmit={submitHandler}>
        <div className="add__formGroup">
          <FormControl>
            <label htmlFor="add__file">
              <AddIcon className="add__fileIcon" />
            </label>
            <Input
              type="file"
              id="add__file"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </FormControl>
          <input
            type="text"
            placeholder="Title"
            className="add__input"
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>
        <div className="add__formGroup">
          <textarea
            placeholder="Write your own Blog...."
            type="text"
            className="add__input add__text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          style={{ backgroundColor: "#3d5a5f", color: "white" }}
        >
          Publish Blog
        </Button>
      </form>
    </div>
  );
}

export default Add;
