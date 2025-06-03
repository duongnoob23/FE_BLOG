import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Kiểm tra tài khoản và mật khẩu cụ thể
    if (email === "lamtiendung11082002@gmail.com" && password === "1") {
      const userData = {
        id: 1,
        firstname: "Tiến",
        lastname: "Dương",
        email: email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      };

      // Lưu user vào localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Gọi callback để cập nhật state ở component cha
      if (onLogin) {
        onLogin(userData);
      }

      // Chuyển về trang chủ
      navigate("/");
    } else {
      setError("Email hoặc mật khẩu không đúng!");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <h1 className="login__title">Đăng nhập</h1>
          <p className="login__subtitle">Chào mừng bạn quay trở lại!</p>
        </div>

        <form onSubmit={handleSubmit} className="login__form">
          {error && <div className="login__error">{error}</div>}

          <div className="login__field">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="login__input"
              required
            />
          </div>

          <div className="login__field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="login__input"
              required
            />
          </div>

          <button type="submit" className="login__submit">
            Đăng nhập
          </button>
        </form>

        <div className="login__footer">
          <p className="login__register-text">
            Chưa có tài khoản?
            <Link to="/register" className="login__register-link">
              Đăng ký ngay
            </Link>
          </p>
        </div>

        <div className="login__demo">
          <p className="login__demo-text">
            <strong>Tài khoản demo:</strong>
            <br />
            Email: lamtiendung11082002@gmail.com
            <br />
            Mật khẩu: 1
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
