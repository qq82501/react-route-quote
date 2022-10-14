import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = function (isAscending, originQuotes) {
  if (isAscending) {
    return [...originQuotes].sort((a, b) => a.text[0].localeCompare(b.text[0]));
  } else {
    return [...originQuotes].sort((a, b) => b.text[0].localeCompare(a.text[0]));
  }
};

const QuoteList = (props) => {
  const navigator = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const isAscending = queryParams.get("sort") === "asc";
  const sortedQuotes = sortQuotes(isAscending, props.quotes);
  const sortQuoteHandler = function () {
    navigator({
      pathname: location.pathname,
      search: `sort=${isAscending ? "desc" : "asc"}`,
    });
  };

  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortQuoteHandler}>
          Sort {isAscending ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
