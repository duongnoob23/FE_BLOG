import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, Link } from "react-router-dom";
import "../styles.css";
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import UserProfile from "../Pages/UserProfile/UserProfile";
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

  // Kiểm tra user từ localStorage khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  function handleLogin(userData) {
    setUser(userData);
  }

  function logOut() {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home user={user} onLogout={logOut} />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>{" "}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:userId" element={<UserProfile />} />
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
