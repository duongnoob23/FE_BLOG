import React from "react";
import "./PostList.css";
import PostCard from "../PostCard/PostCard";

function PostList({ onOpenPostDetail }) {
  const fakePosts = [
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
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      comments: [
        { id: 3, content: "Nhìn ngon quá!", author: "Hương Giang" },
        { id: 4, content: "Mình cũng thích cà phê", author: "Đức Minh" },
        { id: 5, content: "Quán nào vậy bạn?", author: "Lan Anh" },
      ],
    },
    {
      id: 3,
      caption: "Thành phố về đêm luôn có điều gì đó huyền bí ✨",
      image:
        "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=500&h=400&fit=crop",
      author: {
        id: 3,
        name: "Lê Văn C",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      comments: [{ id: 6, content: "Đẹp lắm!", author: "Minh Tú" }],
    },
    {
      id: 4,
      caption: "Món ăn ngon tuyệt! 🍜",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=400&fit=crop",
      author: {
        id: 4,
        name: "Phạm Thị D",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      comments: [
        { id: 7, content: "Nhìn ngon quá!", author: "Thanh Hà" },
        { id: 8, content: "Công thức làm thế nào vậy?", author: "Quốc Anh" },
      ],
    },
  ];

  return (
    <div className="post-list">
      {fakePosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onOpenPostDetail={onOpenPostDetail}
        />
      ))}
    </div>
  );
}

export default PostList;
