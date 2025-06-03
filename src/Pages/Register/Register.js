import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    location: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Kiểm tra mật khẩu khớp
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp!");
      setLoading(false);
      return;
    }

    // Kiểm tra các trường bắt buộc
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.email ||
      !formData.location ||
      !formData.userName ||
      !formData.password
    ) {
      setError("Vui lòng điền đầy đủ thông tin!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          location: formData.location,
          userName: formData.userName,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Đăng ký thành công
        alert("Đăng ký thành công! Vui lòng đăng nhập.");
        navigate("/login");
      } else {
        // Đăng ký thất bại
        setError(data.message || "Đăng ký thất bại!");
      }
    } catch (error) {
      console.error("Register error:", error);
      setError("Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
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
          {error && <div className="register__error">{error}</div>}

          <div className="register__name-row">
            <div className="register__field">
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Tên"
                className="register__input"
                required
                disabled={loading}
              />
            </div>
            <div className="register__field">
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Họ"
                className="register__input"
                required
                disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="register__field">
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Địa chỉ"
              className="register__input"
              required
              disabled={loading}
            />
          </div>

          <div className="register__field">
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              placeholder="Tên đăng nhập"
              className="register__input"
              required
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button type="submit" className="register__submit" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
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
