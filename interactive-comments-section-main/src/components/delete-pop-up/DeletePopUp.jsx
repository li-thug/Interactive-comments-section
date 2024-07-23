import "./deletePopUp.css";
import PropTypes from "prop-types";

function DeletePopUp({
  showHideDeletePopUp,
  setShowHideDeletePopUp,
  deleteReply,
}) {
  return (
    <div className="delete-pop-up-shadow-box">
      <div className="delete-pop-up-wrapper">
        <div className="delete-pop-up-heading">Delete comment</div>
        <div className="delete-pop-up-title">
          Are you sure you want to delete this comment? This will remove the
          comment and can&apos;t be undone.
        </div>
        <div className="delete-pop-up-yes-no-btn-box">
          <div
            className="delete-pop-up-no-btn"
            onClick={() => setShowHideDeletePopUp(!showHideDeletePopUp)}
          >
            no, cancel
          </div>
          <div className="delete-pop-up-yes-btn" onClick={() => deleteReply()}>
            yes, delete
          </div>
        </div>
      </div>
    </div>
  );
}

DeletePopUp.propTypes = {
  showHideDeletePopUp:PropTypes.array,
  setShowHideDeletePopUp:PropTypes.array,
  deleteReply:PropTypes.any,
};

export default DeletePopUp;
