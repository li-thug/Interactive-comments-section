import { useEffect, useRef, useState } from "react";
import TimeAgo from "react-timeago";
import DeleteLogo from "../../svg-components/DeleteLogo";
import EditLogo from "../../svg-components/EditLogo";
import MinusLogo from "../../svg-components/MinusLogo";
import PlusLogo from "../../svg-components/PlusLogo";
import ReplyLogo from "../../svg-components/ReplyLogo";
import "./replyUserComment.css";
import AddReplyChildComments from "../add-reply-parent&child/AddReplyChildComments";
import PropTypes from "prop-types";

function ReplyUserComment({
  currentUser,
  addNewReply,
  deletePopUpWithReplyId,
  incrementScore,
  reply,
  decrementScore,
  comment,
  updateParentAndChildContent,
}) {
  const [updateReply, setUpdateReply] = useState({
    ...reply,
  });
  const [showHideReply, setShowHideReply] = useState(false);
  const [showHideEdit, setShowHideEdit] = useState(false);
  const labelRef = useRef(null);
  const textAreaRef = useRef(null);
  const textCursorEnd = reply.content.length;

  useEffect(() => {
    if (showHideEdit) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(textCursorEnd, textCursorEnd);
      textAreaRef.current.style.textIndent = `${
        labelRef.current.clientWidth + 2
      }px`;
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [showHideEdit]);

  const handleIncrementChildCommentScore = () => {
    const newReply = { ...reply, score: reply.score + 1 };
    incrementScore(newReply);
  };
  const handleDecrementChildCommentScore = () => {
    if (reply.score === 0) {
      return;
    } else {
      const newReply = { ...reply, score: reply.score - 1 };
      decrementScore(newReply);
    }
  };

  const handleChange = (e) => {
    e.target.style.height = "90px";
    e.target.style.height = `${e.target.scrollHeight}px`;
    setUpdateReply({
      ...updateReply,
      content: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateParentAndChildContent(comment.id, updateReply);
    setShowHideEdit(!showHideEdit);
  };

  const handleBlur = (e) => {
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleFocus = (e) => {
    e.target.style.height = "90px";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="reply-user-comment-wrapper">
      <div className="reply-user-comment-box">
        <div className="reply-user-comment-user-info">
          <img
            className="reply-user-comment-profile-photo"
            src={reply.user.image.png}
            alt="...user image"
          />
          <div className="reply-user-comment-user-name">
            {reply.user.username}
          </div>
          {currentUser.username === reply.user.username && (
            <div className="reply-user-comment-current-user">you</div>
          )}
          <div className="reply-user-comment-created-at">
            <TimeAgo date={reply.createdAt} minPeriod={60}></TimeAgo>
          </div>
        </div>
        {showHideEdit ? (
          <div className="reply-user-comment-input-wrapper">
            <form onSubmit={handleSubmit} action="#">
              <div className="reply-user-comment-input-box">
                <label
                  ref={labelRef}
                  htmlFor="add-reply-parent-text-area"
                  className="reply-user-comment-text-area-label"
                >
                  {`@${reply.replyingTo}, `}
                </label>
                <textarea
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  ref={textAreaRef}
                  value={updateReply.content}
                  className="reply-user-comment-input"
                ></textarea>
              </div>
              <div className="reply-user-comment-btn-box">
                <button className="reply-user-comment-btn" type="submit">
                  update
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="reply-user-comment-user-comment">
            <span className="reply-user-comment-mentioned">{`@${reply.replyingTo}`}</span>{" "}
            {reply.content}
          </div>
        )}

        <div className="reply-user-comment-score-wrapper">
          <div className="reply-user-comment-score-box">
            <div
              className="reply-user-comment-plus-box"
              onClick={handleIncrementChildCommentScore}
            >
              <PlusLogo></PlusLogo>
            </div>
            <div className="reply-user-comment-score">{reply.score}</div>
            <div
              className="reply-user-comment-minus-box"
              onClick={handleDecrementChildCommentScore}
            >
              <MinusLogo></MinusLogo>
            </div>
          </div>
        </div>
        {currentUser.username === reply.user.username ? (
          <div className="reply-user-comment-delete-edit-wrapper">
            <div
              className="reply-user-comment-delete-box"
              onClick={() => deletePopUpWithReplyId(reply.id, comment.id)}
            >
              <DeleteLogo></DeleteLogo>
              <div className="reply-user-comment-delete-text">delete</div>
            </div>
            <div
              className="reply-user-comment-edit-box"
              onClick={() => {
                setShowHideEdit(!showHideEdit);
                setUpdateReply({
                  ...updateReply,
                  content: reply.content,
                });
              }}
            >
              <EditLogo></EditLogo>
              <div className="reply-user-comment-edit-text">edit</div>
            </div>
          </div>
        ) : (
          <div className="reply-user-comment-reply-wrapper">
            <div
              className="reply-user-comment-reply-box"
              onClick={() => setShowHideReply(!showHideReply)}
            >
              <ReplyLogo></ReplyLogo>
              <div className="reply-user-comment-reply-text">reply</div>
            </div>
          </div>
        )}
      </div>
      {currentUser.username !== reply.user.username && showHideReply && (
        <AddReplyChildComments
          setShowHideReply={setShowHideReply}
          addNewReply={addNewReply}
          currentUser={currentUser}
          reply={reply}
          comment={comment}
        ></AddReplyChildComments>
      )}
    </div>
  );
}

ReplyUserComment.propTypes = { 
  currentUser:PropTypes.any,
  addNewReply:PropTypes.any,
  deletePopUpWithReplyId:PropTypes.any,
  incrementScore:PropTypes.number,
  reply:PropTypes.any,
  decrementScore:PropTypes.number,
  comment:PropTypes.any,
  updateParentAndChildContent:PropTypes.any,

}

export default ReplyUserComment;