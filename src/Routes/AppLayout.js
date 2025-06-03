import React, { useState } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "../styles.css";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import NoMatch from "../Pages/NotFound/NoMatch";
import Posts from "../Pages/Post/Posts";
import Post from "../Pages/Post/Post";
import PostLists from "../Pages/Post/PostLists";
import Stats from "../Stats";
import NewPost from "../Pages/Post/NewPost";
import ProtectedRoute from "../Routes/ProtectedRoute";

function AppLayout() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/posts" className="nav-link">
          Posts
        </Link>
        <Link to="/about" className="nav-link">
          About
        </Link>
        <span> | </span>
        {user && (
          <Link to="/stats" className="nav-link">
            Stats
          </Link>
        )}
        {user && (
          <Link to="/newpost" className="nav-link">
            New Post
          </Link>
        )}
        {!user && (
          <Link to="/login" className="nav-link">
            Login
          </Link>
        )}
        {user && (
          <span onClick={logOut} className="nav-link logout">
            Logout
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>{" "}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newpost"
          element={
            <ProtectedRoute user={user}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
}

export default AppLayout;
