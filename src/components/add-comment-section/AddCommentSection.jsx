import AddComment from "../add-comment/AddComment";
import "./addCommentSection.css";
import PropTypes from "prop-types";

function AddCommentSection({ currentUser, addNewComment }) {
  return (
    <div className="add-comment-container">
      <AddComment
        addNewComment={addNewComment}
        currentUser={currentUser}
      ></AddComment>
    </div>
  );
}

AddCommentSection.propTypes = {
  currentUser:PropTypes.any,
  addNewComment:PropTypes.any,
};

export default AddCommentSection;
