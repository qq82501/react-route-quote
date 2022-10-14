import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import { getAllQuotes } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Cindy", text: "Happy wife, happy life" },
//   { id: "q2", author: "Birdy", text: "Life is like a lemon" },
//   { id: "q3", author: "Ellen", text: "Independent" },
// ];

function AllQuotes() {
  const {
    sendRequest,
    status,
    data: fetchedQuotes,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!fetchedQuotes || !fetchedQuotes.length)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={fetchedQuotes} />;
}

export default AllQuotes;
