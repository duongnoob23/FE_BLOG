import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./UserProfile.css";
import Header from "../../Components/Layout/Header/Header";
import PostCard from "../../Components/Post/PostCard/PostCard";
import PostDetail from "../../Components/Post/PostDetail/PostDetail";

function UserProfile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }

    // Fake user data
    const fakeUsers = [
      {
        id: 1,
        firstname: "John",
        lastname: "Doe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      },
      {
        id: 2,
        firstname: "Trần",
        lastname: "Thị B",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      },
    ];

    // Fake posts data
    const fakePosts = [
      {
        id: 1,
        caption: "Cảnh đẹp thiên nhiên tuyệt vời! 🌅",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
        author: {
          id: 1,
          name: "John Doe",
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
        comments: [{ id: 3, content: "Nhìn ngon quá!", author: "Hương Giang" }],
      },
    ];

    const foundUser = fakeUsers.find((u) => u.id === parseInt(userId));
    setUser(foundUser);

    const filteredPosts = fakePosts.filter(
      (post) => post.author.id === parseInt(userId)
    );
    setUserPosts(filteredPosts);
  }, [userId]);

  const handleOpenPostDetail = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <Header user={currentUser} onLogout={handleLogout} />

      <div className="user-profile__content">
        <div className="user-profile__header">
          <img
            src={user.avatar}
            alt={`${user.firstname} ${user.lastname}`}
            className="user-profile__avatar"
          />
          <div className="user-profile__info">
            <h1 className="user-profile__name">
              {user.firstname} {user.lastname}
            </h1>
            <p className="user-profile__posts-count">
              {userPosts.length} bài viết
            </p>
          </div>
        </div>

        <div className="user-profile__posts">
          <h2 className="user-profile__posts-title">Bài viết</h2>
          <div className="user-profile__posts-list">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onOpenPostDetail={handleOpenPostDetail}
                />
              ))
            ) : (
              <p className="user-profile__no-posts">Chưa có bài viết nào</p>
            )}
          </div>
        </div>
      </div>

      {showPostDetail && selectedPost && (
        <PostDetail post={selectedPost} onClose={handleClosePostDetail} />
      )}
    </div>
  );
}

export default UserProfile;
