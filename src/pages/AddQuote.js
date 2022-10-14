import { useEffect } from "react";
import useHttp from "../hooks/use-http";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import { addQuote } from "../lib/api";

function AddQuote() {
  const history = useHistory();
  const { sendRequest, ...httpState } = useHttp(addQuote);

  useEffect(() => {
    if (httpState.status === "completed") history.push("/quotes");
  }, [httpState.status, history]);

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
