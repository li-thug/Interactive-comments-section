import "./replySection.css";
import ReplyUserComment from "../reply-user-comment/ReplyUserComment";
import PropTypes from "prop-types";

function ReplySection({
  replies,
  currentUser,
  addNewReply,
  deletePopUpWithReplyId,
  incrementScore,
  decrementScore,
  comment,
  updateParentAndChildContent,
}) {
  return (
    <div className="reply-comment-section-container">
      {replies.map((reply) => {
        return (
          <ReplyUserComment
          updateParentAndChildContent={updateParentAndChildContent}
            comment={comment}
            decrementScore={decrementScore}
            incrementScore={incrementScore}
            deletePopUpWithReplyId={deletePopUpWithReplyId}
            reply={reply}
            addNewReply={addNewReply}
            key={reply.id}
            currentUser={currentUser}
          ></ReplyUserComment>
        );
      })}
    </div>
  );
}

ReplySection.propTypes = {
  replies:PropTypes.any,
  currentUser:PropTypes.any,
  addNewReply:PropTypes.any,
  deletePopUpWithReplyId:PropTypes.any,
  incrementScore:PropTypes.number,
  decrementScore:PropTypes.number,
  comment:PropTypes.any,
  updateParentAndChildContent:PropTypes.any,
}

export default ReplySection;