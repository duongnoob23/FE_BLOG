import React from "react";
import "./PostDetail.css";
import Modal from "../../Common/Modal/Modal";
import CommentList from "../../Comment/CommentList/CommentList";
import CommentForm from "../../Comment/CommentForm/CommentForm";

function PostDetail({ post, onClose }) {
  return (
    <Modal onClose={onClose}>
      <div className="post-detail">
        <div className="post-detail__header">
          <h2 className="post-detail__title">
            Bài viết của {post.author.name}
          </h2>
          <div className="post-detail__author">
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
        </div>

        <div className="post-detail__content">
          <div className="post-detail__image-container">
            <img src={post.image} alt="Post" className="post-detail__image" />
          </div>

          <div className="post-detail__comments">
            <CommentList comments={post.comments} />
          </div>
        </div>

        <div className="post-detail__comment-form">
          <CommentForm postId={post.id} />
        </div>
      </div>
    </Modal>
  );
}

export default PostDetail;
