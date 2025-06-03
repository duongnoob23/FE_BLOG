import React from "react";
import "./PostDetail.css";
import Modal from "../../Common/Modal/Modal";
import CommentList from "../../Comment/CommentList/CommentList";
import CommentForm from "../../Comment/CommentForm/CommentForm";

function PostDetail({ post, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="post-detail">
        <div className="post-detail__image-section">
          <img src={post.image} alt="Post" className="post-detail__image" />
        </div>

        <div className="post-detail__content-section">
          <div className="post-detail__header">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="post-detail__author-avatar"
            />
            <span className="post-detail__author-name">{post.author.name}</span>
          </div>

          <div className="post-detail__caption">
            <p>{post.caption}</p>
          </div>

          <div className="post-detail__comments">
            <CommentList comments={post.comments} />
          </div>

          <div className="post-detail__comment-form">
            <CommentForm postId={post.id} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default PostDetail;
