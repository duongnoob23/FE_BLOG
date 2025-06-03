import React from "react";
import "./Header.css";

function Header({ user, onLogin, onLogout }) {
  const handleLogin = () => {
    const fakeUser = {
      id: 1,
      firstname: "John",
      lastname: "Doe",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    };
    onLogin(fakeUser);
  };

  return (
    <header className="header">
      <div className="header__left"></div>

      <div className="header__center">
        <div className="header__nav-item">
          <span className="header__icon">🏠</span>
          <span className="header__text">Home</span>
        </div>
        <div className="header__nav-item">
          <span className="header__icon">ℹ️</span>
          <span className="header__text">About</span>
        </div>
        <div className="header__nav-item">
          <span className="header__icon">📝</span>
          <span className="header__text">Post</span>
        </div>
      </div>

      <div className="header__right">
        {user ? (
          <div className="header__user">
            <img src={user.avatar} alt="Avatar" className="header__avatar" />
            <span className="header__greeting">Hi {user.firstname}</span>
            <button className="header__logout-btn" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="header__login">
            <span className="header__login-text" onClick={handleLogin}>
              Please Login
            </span>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
