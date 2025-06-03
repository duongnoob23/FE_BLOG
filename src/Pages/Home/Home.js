import React, { useState } from "react";
import "./Home.css";
import Header from "../../Components/Layout/Header/Header";
import UserList from "../../Components/Layout/Sidebar/UserList";
import PostList from "../../Components/Post/PostList/PostList";
import PostDetail from "../../Components/Post/PostDetail/PostDetail";

function Home() {
  const [user, setUser] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const handleOpenPostDetail = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  return (
    <div className="home">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <div className="home__content">
        <div className="home__sidebar">{user && <UserList />}</div>

        <div className="home__main">
          <PostList onOpenPostDetail={handleOpenPostDetail} />
        </div>

        <div className="home__right"></div>
      </div>

      {showPostDetail && selectedPost && (
        <PostDetail post={selectedPost} onClose={handleClosePostDetail} />
      )}
    </div>
  );
}

export default Home;
