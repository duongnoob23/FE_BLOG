import React, { useState } from "react";
import "./CreatePostModal.css";
import Modal from "../../Common/Modal/Modal";

function CreatePostModal({ user, onClose, onSubmit }) {
  const [caption, setCaption] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (caption.trim() || selectedImage) {
      const newPost = {
        id: Date.now(),
        caption: caption.trim(),
        image:
          imagePreview ||
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=400&fit=crop",
        author: {
          id: user.id,
          name: `${user.firstname} ${user.lastname}`,
          avatar: user.avatar,
        },
        comments: [],
      };
      onSubmit(newPost);
    }
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
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder={`${user.firstname} ơi, bạn đang nghĩ gì thế?`}
            className="create-post-modal__textarea"
            rows="4"
          />

          {imagePreview && (
            <div className="create-post-modal__image-preview">
              <button
                type="button"
                className="create-post-modal__remove-image"
                onClick={removeImage}
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

          <div className="create-post-modal__image-upload">
            <label className="create-post-modal__upload-label">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="create-post-modal__upload-input"
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

          <button
            type="submit"
            className="create-post-modal__submit"
            disabled={!caption.trim() && !selectedImage}
          >
            Đăng
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default CreatePostModal;
