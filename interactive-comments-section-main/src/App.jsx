import "./App.css";
import { useState } from "react";
import CommentSection from "./components/comment-section/CommentSection";
import AddCommentSection from "./components/add-comment-section/AddCommentSection";
import { initialComments, initUser } from "./data/data";
import DeletePopUp from "./components/delete-pop-up/DeletePopUp";
function App() {
  const [comments, setComments] = useState(initialComments);
  const [currentUser] = useState(initUser);
  const [showHideDeletePopUp, setShowHideDeletePopUp] = useState(false);
  const [deleteCommentAndReplyId, setDeleteCommentAndReplyId] = useState({
    parentCommentId: "",
    childCommentId: "",
  });

  const addNewComment = (newComment) => {
    setComments([...comments, newComment]);
  };

  const addNewReply = (newReply, id) => {
    const newComment = [...comments];
    const findComment = comments.find((comment) => {
      return comment.id === id;
    });
    const addReply = {
      ...findComment,
      replies: [...findComment.replies, newReply],
    };
    const index = comments.findIndex((comment) => comment.id === id);
    newComment.splice(index, 1, addReply);
    setComments(newComment);
  };

  const updateScore = (updatedScoreComment) => {
    const newComment = [...comments];
    const index = comments.findIndex(
      (comment) => comment.id === updatedScoreComment.id
    );
    newComment.splice(index, 1, updatedScoreComment);
    newComment.sort((a, b) => {
      return b.score - a.score;
    });
    setComments(newComment);
  };

  const deletePopUpWithReplyId = (childCommentId, parentCommentId) => {
    setShowHideDeletePopUp(true);
    setDeleteCommentAndReplyId({
      parentCommentId: parentCommentId,
      childCommentId: childCommentId,
    });
  };

  const deleteReply = () => {
    const newComments = [...comments];
    if (deleteCommentAndReplyId.childCommentId === null) {
      const index = comments.findIndex(
        (comment) => comment.id === deleteCommentAndReplyId.parentCommentId
      );
      newComments.splice(index, 1);
    } else {
      const findComment = comments.find((comment) => {
        return comment.id === deleteCommentAndReplyId.parentCommentId;
      });
      const filteredReplyArray = findComment.replies.filter((reply) => {
        return reply.id !== deleteCommentAndReplyId.childCommentId;
      });
      const deletedReply = {
        ...findComment,
        replies: filteredReplyArray,
      };
      const index = comments.findIndex(
        (comment) => comment.id === deleteCommentAndReplyId.parentCommentId
      );
      newComments.splice(index, 1, deletedReply);
    }
    setComments(newComments);
    setShowHideDeletePopUp(false);
  };

  const updateParentAndChildContent = (
    updatedParentCommentContent,
    updatedChildCommentContent
  ) => {
    const newComments = [...comments];
    if (updatedChildCommentContent) {
      const findComment = comments.find((comment) => {
        return comment.id === updatedParentCommentContent;
      });
      const updatedReply = [...findComment.replies];
      const indexOfComment = comments.findIndex(
        (comment) => comment.id === updatedParentCommentContent
      );
      console.log(indexOfComment);
      const indexOfCommentReply = findComment.replies.findIndex(
        (reply) => reply.id === updatedChildCommentContent.id
      );
      updatedReply.splice(indexOfCommentReply, 1, updatedChildCommentContent);
      const updatedComment = { ...findComment, replies: updatedReply };
      newComments.splice(indexOfComment, 1, updatedComment);
    } else {
      const index = comments.findIndex(
        (comment) => comment.id === updatedParentCommentContent.id
      );
      newComments.splice(index, 1, updatedParentCommentContent);
    }
    setComments(newComments);
  };

  return (
    <>
      <div className="App ">
        <CommentSection
          updateParentAndChildContent={updateParentAndChildContent}
          updateScore={updateScore}
          deletePopUpWithReplyId={deletePopUpWithReplyId}
          addNewReply={addNewReply}
          comments={comments}
          currentUser={currentUser}
        ></CommentSection>
        <AddCommentSection
          currentUser={currentUser}
          addNewComment={addNewComment}
        ></AddCommentSection>
        {showHideDeletePopUp && (
          <DeletePopUp
            deleteReply={deleteReply}
            showHideDeletePopUp={showHideDeletePopUp}
            setShowHideDeletePopUp={setShowHideDeletePopUp}
          ></DeletePopUp>
        )}
      </div>
    </>
  );
}

export default App;
