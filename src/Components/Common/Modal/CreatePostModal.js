import React, { useState } from "react";
import "./CreatePostModal.css";
import Modal from "../../Common/Modal/Modal";

function CreatePostModal({ user, onClose, onSubmit }) {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  console.log("🚀 ~ CreatePostModal ~ imagePreview:", imagePreview);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // API upload ảnh
  const uploadPhoto = async () => {
    const token = localStorage.getItem("token");
    if (!token || !user.id) {
      setError("Vui lòng đăng nhập để đăng bài!");
      return;
    }

    if (!selectedImage) {
      setError("Vui lòng chọn ảnh để đăng!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Tạo FormData để gửi file và user_id
      const formData = new FormData();
      formData.append("photo", selectedImage); // File ảnh
      formData.append("user_id", user.id); // User ID

      const response = await fetch("http://localhost:8081/api/photo/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // Không set Content-Type khi dùng FormData, browser sẽ tự set
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Không thể đăng bài viết");
      }

      const data = await response.json();
      console.log("Upload response:", data);

      // Tạo post object để hiển thị ngay lập tức
      const newPost = {
        id: data.photo._id,
        caption:
          caption.trim() || `Bài viết của ${user.firstname || user.userName}`,
        image: `http://localhost:8081/uploads/${data.photo.file_name}`,
        author: {
          id: user.id,
          name: `${user.firstname || user.userName} ${
            user.lastname || ""
          }`.trim(),
          avatar: user.avatar,
        },
        comments: [],
      };
      console.log("🚀 ~ uploadPhoto ~ newPost:", newPost.caption);

      // Gọi callback để thêm post vào danh sách
      onSubmit(newPost);

      // Đóng modal
      onClose();
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError("Không thể đăng bài viết. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadPhoto();
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <Modal onClose={onClose}>
      <div className="create-post-modal">
        <div className="create-post-modal__header">
          <h2 className="create-post-modal__title">Tạo bài viết</h2>
        </div>

        <div className="create-post-modal__user">
          <img
            src={user.avatar}
            alt={user.firstname}
            className="create-post-modal__avatar"
          />
          <span className="create-post-modal__name">
            {user.firstname} {user.lastname}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="create-post-modal__form">
          {error && <div className="create-post-modal__error">{error}</div>}

          {/* <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`${user.firstname} ơi, bạn đang nghĩ gì thế?`}
            className="create-post-modal__textarea"
            rows="4"
            disabled={loading}
          /> */}

          {imagePreview && (
            <div className="create-post-modal__image-preview">
              <button
                type="button"
                className="create-post-modal__remove-image"
                onClick={removeImage}
                disabled={loading}
              >
                ✕
              </button>
              <img
                src={imagePreview}
                alt="Preview"
                className="create-post-modal__preview-img"
              />
            </div>
          )}

          {imagePreview === null && (
            <div className="create-post-modal__image-upload">
              <label className="create-post-modal__upload-label">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="create-post-modal__upload-input"
                  disabled={loading}
                  required
                />
                <div className="create-post-modal__upload-area">
                  <span className="create-post-modal__upload-icon">📷</span>
                  <span className="create-post-modal__upload-text">
                    Thêm ảnh/video
                  </span>
                  <span className="create-post-modal__upload-subtext">
                    hoặc kéo và thả
                  </span>
                </div>
              </label>
            </div>
          )}

          <button
            type="submit"
            className="create-post-modal__submit"
            disabled={loading || !selectedImage}
          >
            {loading ? "Đang đăng..." : "Đăng"}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreatePostModal;
