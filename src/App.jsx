import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shared from "./pages/Shared";
import Home from "./pages/homePage";
import Error from "./pages/ErrorPage";
import LoginPage from "./pages/LoginPage";
import Moviespage from "./pages/Moviespage";
import Seriespage from "./pages/Seriespage";
import KidsPage from "./pages/KidsPage";
import ProductsPage from "./pages/ProductsPage";
import PrivateRoute from "./pages/PrivateRoute";
import SingleProduct from "./pages/SingleProduct";
import SubscriptionPage from "./pages/SubscriptionPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsPage from "./pages/TermsPage";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shared />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Moviespage />} />
          <Route path="series" element={<Seriespage />} />
          <Route path="kids" element={<KidsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="products"
            element={
              <PrivateRoute>
                <ProductsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="products/:id"
            element={
              <PrivateRoute>
                <SingleProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="subscription/:id"
            element={
              <PrivateRoute>
                <SubscriptionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="privacypolicy"
            element={
              <PrivateRoute>
                <PrivacyPolicy />
              </PrivateRoute>
            }
          />
          <Route
            path="terms"
            element={
              <PrivateRoute>
                <TermsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="feedback"
            element={
              <PrivateRoute>
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
