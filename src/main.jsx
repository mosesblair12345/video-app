import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { SidebarProvider } from "./context/SidebarContext.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { SeriesProvider } from "./context/SeriesContext.jsx";
import { KidsProvider } from "./context/KidsContext.jsx";
import { FilterProvider } from "./context/FilterContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { SeriesFilterProvider } from "./context/SeriesFilterContext.jsx";
import { ProductsProvider } from "./context/ProductsContext.jsx";
import { SubscriptionProvider } from "./context/SubscriptionContext.jsx";
import { FeedbackProvider } from "./context/FeedbackContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <SubscriptionProvider>
          <FeedbackProvider>
            <SidebarProvider>
              <MoviesProvider>
                <SeriesProvider>
                  <KidsProvider>
                    <FilterProvider>
                      <SeriesFilterProvider>
                        <App />
                      </SeriesFilterProvider>
                    </FilterProvider>
                  </KidsProvider>
                </SeriesProvider>
              </MoviesProvider>
            </SidebarProvider>
          </FeedbackProvider>
        </SubscriptionProvider>
      </ProductsProvider>
    </AuthProvider>
  </React.StrictMode>
);
