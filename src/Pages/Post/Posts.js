import React from "react";
import { Outlet } from "react-router-dom";

function Posts() {
  return (
    <div className="posts-container">
      <div className="posts-header">
        <h2>Blog</h2>
      </div>
      <div className="posts-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Posts;
