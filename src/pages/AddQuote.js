import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";

function AddQuote() {
  const navigator = useNavigate();

  const { sendRequest, ...httpState } = useHttp(addQuote);

  useEffect(() => {
    if (httpState.status === "completed") navigator("/quotes");
  }, [httpState.status, navigator]);

  const addQuoteHandler = function (quote) {
    sendRequest(quote);
  };

  return (
    <QuoteForm
      isLoading={httpState.status === "pending"}
      onAddQuote={addQuoteHandler}
    />
  );
}

export default AddQuote;
