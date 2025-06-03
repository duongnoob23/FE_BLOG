import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu không khớp!");
      return;
    }

    if (
      formData.firstname &&
      formData.lastname &&
      formData.email &&
      formData.password
    ) {
      const newUser = {
        id: Date.now(),
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      };

      localStorage.setItem("user", JSON.stringify(newUser));
      navigate("/");
      window.location.reload();
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <div className="register__header">
          <h1 className="register__title">Đăng ký</h1>
          <p className="register__subtitle">Tạo tài khoản mới</p>
        </div>

        <form onSubmit={handleSubmit} className="register__form">
          <div className="register__name-row">
            <div className="register__field">
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="Tên"
                className="register__input"
                required
              />
            </div>
            <div className="register__field">
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Họ"
                className="register__input"
                required
              />
            </div>
          </div>

          <div className="register__field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="register__input"
              required
            />
          </div>

          <div className="register__field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="register__input"
              required
            />
          </div>

          <div className="register__field">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận mật khẩu"
              className="register__input"
              required
            />
          </div>

          <button type="submit" className="register__submit">
            Đăng ký
          </button>
        </form>

        <div className="register__footer">
          <p className="register__login-text">
            Đã có tài khoản?
            <Link to="/login" className="register__login-link">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
