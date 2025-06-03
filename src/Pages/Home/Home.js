import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../Components/Layout/Header/Header";
import UserList from "../../Components/Layout/Sidebar/UserList";
import PostList from "../../Components/Post/PostList/PostList";
import PostDetail from "../../Components/Post/PostDetail/PostDetail";
import CreatePost from "../../Components/Post/CreatePost/CreatePost";

function Home({ user: propUser, onLogout }) {
  const [user, setUser] = useState(propUser);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Cập nhật user từ props hoặc localStorage
    if (propUser) {
      setUser(propUser);
    } else {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }

    // Load posts
    const storedPosts = localStorage.getItem("posts");
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      const defaultPosts = [
        {
          id: 1,
          caption: "Cảnh đẹp thiên nhiên tuyệt vời! 🌅",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
          author: {
            id: 1,
            name: "Nguyễn Văn A",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
          },
          comments: [
            { id: 1, content: "Đẹp quá!", author: "Mai Anh" },
            { id: 2, content: "Chụp ở đâu vậy bạn?", author: "Tuấn Anh" },
          ],
        },
        {
          id: 2,
          caption: "Buổi sáng tuyệt vời với tách cà phê ☕",
          image:
            "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=400&fit=crop",
          author: {
            id: 2,
            name: "Trần Thị B",
            avatar:
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
          },
          comments: [
            { id: 3, content: "Nhìn ngon quá!", author: "Hương Giang" },
          ],
        },
      ];
      setPosts(defaultPosts);
      localStorage.setItem("posts", JSON.stringify(defaultPosts));
    }
  }, [propUser]);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    if (onLogout) {
      onLogout();
    }
  };

  const handleOpenPostDetail = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  const handleCreatePost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="home">
      <Header user={user} onLogin={handleLogin} onLogout={handleLogout} />

      <div className="home__content">
        <div className="home__sidebar">{user && <UserList />}</div>

        <div className="home__main">
          <CreatePost user={user} onCreatePost={handleCreatePost} />
          <PostList posts={posts} onOpenPostDetail={handleOpenPostDetail} />
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
