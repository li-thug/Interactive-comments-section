import UsersComments from "../users-comments/UsersComments";
import "./commentSection.css";
import PropTypes from "prop-types";

function CommentSection({
  comments,
  currentUser,
  addNewReply,
  deletePopUpWithReplyId,
  updateScore,
  updateParentAndChildContent
}) {
  return (
    <div className="comment-section-container">
      {comments.map((comment) => {
        return (
          <UsersComments
          updateParentAndChildContent={updateParentAndChildContent}
            updateScore={updateScore}
            deletePopUpWithReplyId={deletePopUpWithReplyId}
            key={comment.id}
            addNewReply={addNewReply}
            currentUser={currentUser}
            comment={comment}
          ></UsersComments>
        );
      })}
    </div>
  );
}
CommentSection.propTypes = {
  comments:PropTypes.any,
  currentUser:PropTypes.any,
  addNewReply:PropTypes.any,
  deletePopUpWithReplyId:PropTypes.any,
  updateScore:PropTypes.any,
  updateParentAndChildContent:PropTypes.any
}

export default CommentSection;