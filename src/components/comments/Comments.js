import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);

  const { quoteId } = useParams();
  const {
    sendRequest,
    status,
    data: commentData,
  } = useHttp(getAllComments, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  const refreshListHandler = useCallback(
    function () {
      sendRequest(quoteId);
      setIsAddingComment(false);
    },
    [quoteId, sendRequest]
  );

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "completed" && (!commentData || !commentData.length)) {
    comments = <p className="centered">There is no comment yet</p>;
  }

  if (status === "completed" && commentData.length) {
    comments = (
      <div className="centered">
        <CommentsList comments={commentData} />
      </div>
    );
  }

  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onRefreshList={refreshListHandler} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
