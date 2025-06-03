import React from "react";
import "./UserItem.css";

function UserItem({ user }) {
  return (
    <div className="user-item">
      <img src={user.avatar} alt={user.name} className="user-item__avatar" />
      <span className="user-item__name">{user.name}</span>
    </div>
  );
}

export default UserItem;
