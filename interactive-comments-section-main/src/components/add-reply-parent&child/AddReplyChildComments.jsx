import "./addReply.css";
import { useEffect, useRef, useState } from "react";
import useUuid from "../../custom-hooks/useUuid";
import PropTypes from "prop-types";

function AddReplyChildComments({
  currentUser,
  addNewReply,
  setShowHideReply,
  reply,
  comment
}) {
 console.log(new Date().getTime());
  const [newReply, setNewReply] = useState({
    id: "",
    content: "",
    createdAt: "",
    score: 0,
    user: {},
    replyingTo: "",
  });
  const [storeLableWidth, setStoreLableWidth] = useState(null)

  const labelRef = useRef(null);
  
  useEffect(() => {
    setStoreLableWidth(labelRef.current.clientWidth)
  }, []);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setNewReply({
      ...newReply,
      content: value,
    });
    e.target.style.height = "90px"
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewReply(
      {
        ...newReply,
        id: useUuid(),
        user: {...currentUser},
        createdAt: new Date(),
        replyingTo: reply.user.username,
      },
      comment.id
    );
    setShowHideReply(false)
    setNewReply({
      id: "",
      content: "",
      createdAt: "",
      score: 0,
      user: {},
      replyingTo: "",
    });
  };
  return (
    <div className="add-reply-wrapper">
      <form action="#" onSubmit={handleSubmit}>
        <div className="add-reply-grid-box">
          <div className="add-reply-cureent-user-profile-photo-box">
            <img
              className="add-reply-cureent-user-profile-photo"
              src={currentUser.image.png}
              alt="your profile...."
            />
          </div>
          <div className="add-reply-input-box">
          <label
              ref={labelRef}
              htmlFor="add-reply-child-text-area"
              className="text-area-label"
            >
              {`@${reply.user.username}, `}
            </label>
            <textarea
            id="add-reply-child-text-area"
              style={{textIndent: `${storeLableWidth + 2}px`}}
              className="add-reply-input"
              value={newReply.content}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="add-reply-btn-box">
            <button className="add-reply-btn" type="submit">
              reply
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

AddReplyChildComments.propTypes = {
  currentUser:PropTypes.any,
  addNewReply:PropTypes.any,
  setShowHideReply:PropTypes.any,
  reply:PropTypes.any,
  comment:PropTypes.any
}

export default AddReplyChildComments;