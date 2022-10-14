import { useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  console.log(useParams().quoteId);
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onRefreshList } = props;

  useEffect(() => {
    if (status === "completed" && !error) onRefreshList();
  }, [status, onRefreshList, error]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    sendRequest({
      quoteId: props.quoteId,
      commentData: commentTextRef.current.value,
    });
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
