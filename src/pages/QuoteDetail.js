import { useEffect } from "react";
import { useParams, Route, Routes, Link, Outlet } from "react-router-dom";
import HightlightedQuote from "../components/quotes/HighlightedQuote";
import { getSingleQuote } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//   { id: "q1", author: "Cindy", text: "Happy wife, happy life" },
//   { id: "q2", author: "Birdy", text: "Life is like a lemon" },
//   { id: "q3", author: "Ellen", text: "Independent" },
// ];

function QuoteDetail() {
  const {
    sendRequest: fetchQuoteDetail,
    status,
    error,
    data: quoteDetail,
  } = useHttp(getSingleQuote, true);
  const params = useParams();

  useEffect(() => {
    fetchQuoteDetail(params.quoteId);
  }, [fetchQuoteDetail, params.quoteId]);

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

  if (status === "completed" && !quoteDetail) {
    return <NoQuotesFound />;
  }
  return (
    <div>
      <HightlightedQuote author={quoteDetail.author} text={quoteDetail.text} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered">
              <Link className="btn--flat" to={{ pathname: "comment" }}>
                Load Comment
              </Link>
            </div>
          }
        />
      </Routes>
      <Outlet />
    </div>
  );
}

export default QuoteDetail;
