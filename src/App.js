import { Route, Routes, Navigate } from "react-router-dom";
import AddQuote from "./pages/AddQuote";
import QuoteDetail from "./pages/QuoteDetail";
import AllQuotes from "./pages/AllQuotes";
import PageNotFOund from "./pages/PageNotFound";
import Layout from "./components/layout/Layout";
import Comments from "./components/comments/Comments";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/quotes" />} />
        <Route path="/add-quote" element={<AddQuote />} />
        <Route path="/quotes" element={<AllQuotes />} />
        <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
          <Route path="comment" element={<Comments />} />
        </Route>
        <Route path="*" element={<PageNotFOund />} />
      </Routes>
    </Layout>
  );
}

export default App;
