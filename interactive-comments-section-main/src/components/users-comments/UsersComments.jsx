import { useEffect, useRef, useState } from "react";
import TimeAgo from 'react-timeago'
import "./usersComments.css";
import ReplySection from "../reply-section/ReplySection";
import DeleteLogo from "../../svg-components/DeleteLogo";
import EditLogo from "../../svg-components/EditLogo";
import MinusLogo from "../../svg-components/MinusLogo";
import PlusLogo from "../../svg-components/PlusLogo";
import ReplyLogo from "../../svg-components/ReplyLogo";
import AddReplyParentComments from "../add-reply-parent&child/AddReplyParentComments";
import PropTypes from "prop-types";

function UsersComments({
  addNewReply,
  currentUser,
  deletePopUpWithReplyId,
  updateScore,
  comment,
  updateParentAndChildContent
}) {
  const [updateComment, setUpdateComment] = useState({
    ...comment,
  });
  const [showHideReply, setShowHideReply] = useState(false);
  const [showHideEdit, setShowHideEdit] = useState(false);
  const textAreaRef = useRef(null);
  const textCursorEnd = comment.content.length;

  useEffect(()=>{
    if(showHideEdit){
      textAreaRef.current.focus()
      textAreaRef.current.setSelectionRange(textCursorEnd, textCursorEnd)

      let scrollHeight = textAreaRef.current.scrollHeight;
      textAreaRef.current.style.height = `${scrollHeight}px`
    }
  },[showHideEdit])

  const incrementScore = (incrementedReplyScore) => {
    if (incrementedReplyScore) {
      const newReply = [...comment.replies];
      const newComment = { ...comment, replies: newReply };
      const index = newReply.findIndex(
        (reply) => reply.id === incrementedReplyScore.id
      );
      newReply.splice(index, 1, incrementedReplyScore);
      updateScore(newComment);
    } else {
      const newComment = { ...comment, score: comment.score + 1 };
      updateScore(newComment);
    }
  };

  const decrementScore = (decrementedReplyScore) => {
    if (decrementedReplyScore) {
      const newReply = [...comment.replies];
      const newComment = { ...comment, replies: newReply };
      console.log(newComment);
      const index = newReply.findIndex(
        (reply) => reply.id === decrementedReplyScore.id
      );
      newReply.splice(index, 1, decrementedReplyScore);
      updateScore(newComment);
    } else {
      if (comment.score === 0) {
        return;
      } else {
        const newComment = { ...comment, score: comment.score - 1 };
        updateScore(newComment);
      }
    }
  };

  const handleChange = (e)=>{
    e.target.style.height = "90px"
    let scrollHeight = e.target.scrollHeight;
    e.target.style.height = `${scrollHeight}px`
    setUpdateComment({
      ...updateComment, content: e.target.value
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    updateParentAndChildContent(updateComment, null)
    setShowHideEdit(!showHideEdit)
  }

  return (
    <div className="user-comment-container">
      <div className="user-comment-wrapper">
        <div className="user-comment-box">
          <div className="user-comment-user-info">
            <img
              className="user-comment-profile-photo"
              src={comment.user.image.png}
              alt="...user image"
            />
            <div className="user-comment-user-name">
              {comment.user.username}
            </div>
            {currentUser.username === comment.user.username && (
              <div className="user-comment-current-user">you</div>
            )}
            <div className="user-comment-created-at">
              <TimeAgo date={comment.createdAt} minPeriod={60}></TimeAgo>
            </div>
          </div>

          {showHideEdit ? (
            <div className="user-comment-edit-input-wrapper">
              <form onSubmit={handleSubmit} action="#">
                <div className="user-comment-edit-input-box">
                  <textarea
                  ref={textAreaRef}
                  onChange={handleChange}
                    value={updateComment.content}
                    className="user-comment-edit-input"
                  ></textarea>
                </div>
                <div className="user-comment-edit-btn-box">
                  <button className="user-comment-edit-btn" type="submit">
                    update
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="user-comment-user-comment">
              {comment.content}
            </div>
          )}

          <div className="user-comment-score-wrapper">
            <div className="user-comment-score-box">
              <div
                className="user-comment-plus-box"
                onClick={() => incrementScore()}
              >
                <PlusLogo></PlusLogo>
              </div>
              <div className="user-comment-score">{comment.score}</div>
              <div
                className="user-comment-minus-box"
                onClick={() => decrementScore()}
              >
                <MinusLogo></MinusLogo>
              </div>
            </div>
          </div>

          {currentUser.username === comment.user.username ? (
            <div className="user-comment-delete-edit-wrapper">
              <div
                className="user-comment-delete-box"
                onClick={() => deletePopUpWithReplyId(null, comment.id)}
              >
                <DeleteLogo></DeleteLogo>
                <div className="user-comment-delete-text">delete</div>
              </div>
              <div
                className="user-comment-edit-box"
                onClick={() => setShowHideEdit(!showHideEdit)}
              >
                <EditLogo></EditLogo>
                <div className="user-comment-edit-text">edit</div>
              </div>
            </div>
          ) : (
            <div className="user-comment-reply-wrapper">
              <div
                className="user-comment-reply-box"
                onClick={() => setShowHideReply(!showHideReply)}
              >
                <ReplyLogo></ReplyLogo>
                <div className="user-comment-reply-text">reply</div>
              </div>
            </div>
          )}
        </div>
        {currentUser.username !== comment.user.username && showHideReply && (
          <AddReplyParentComments
            addNewReply={addNewReply}
            setShowHideReply={setShowHideReply}
            currentUser={currentUser}
            comment={comment}
          ></AddReplyParentComments>
        )}
      </div>

      <ReplySection
        updateParentAndChildContent={updateParentAndChildContent}
        decrementScore={decrementScore}
        incrementScore={incrementScore}
        deletePopUpWithReplyId={deletePopUpWithReplyId}
        addNewReply={addNewReply}
        replies={comment.replies}
        currentUser={currentUser}
        comment={comment}
      ></ReplySection>
    </div>
  );
}

UsersComments.propTypes = {
  addNewReply:PropTypes.any,
  currentUser:PropTypes.func,
  deletePopUpWithReplyId:PropTypes.any,
  updateScore:PropTypes.any,
  comment:PropTypes.any,
  updateParentAndChildContent:PropTypes.any
}

export default UsersComments;