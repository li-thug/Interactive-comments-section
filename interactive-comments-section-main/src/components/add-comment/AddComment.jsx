import { useState } from "react";
import "./addComment.css";
import useUuid from "../../custom-hooks/useUuid";
import PropTypes from "prop-types";

function AddComment({ currentUser, addNewComment }) {
  const [newComment, setNewComment] = useState({
    id: "",
    content: "",
    createdAt: "",
    score: 0,
    user: {},
    replies: [],
  });

  const handleChange = (e) => {
    setNewComment({
      ...newComment,
      content: e.target.value,
    });
    e.target.style.height = "90px";
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewComment({
      ...newComment,
      id: useUuid(),
      user: { ...currentUser },
      createdAt: new Date(),
    });
    setNewComment({
      ...newComment,
      id: "",
      content: "",
      createdAt: "",
      user: {},
    });
  };

  return (
    <div className="add-comment-wrapper">
      <form onSubmit={handleSubmit} action="#">
        <div className="add-comment-grid-box">
          <div className="add-commentcureent-user-profile-photo-box">
            <img
              className="add-comment-cureent-user-profile-photo"
              src={currentUser.image.png}
              alt="your profile...."
            />
          </div>
          <div className="add-comment-input-box">
            <textarea
              onChange={handleChange}
              value={newComment.content}
              className="add-reply-input"
              placeholder="Add a comment..."
            ></textarea>
          </div>
          <div className="add-comment-btn-box">
            <button className="add-reply-btn" type="submit">
              send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddComment.propTypes = {
  currentUser: PropTypes.any,
  addNewComment: PropTypes.any,
};

export default AddComment;
