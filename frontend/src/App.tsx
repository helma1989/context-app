import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticationProvider from "./AuthenticationProvider";
import Header from "./components/Header";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ShoppingList from "./pages/ShoppingList";
import { RequiredAuth } from "./RequiredAuth";
import { useLoader } from "./LoadContext";
import PrivatePage from "./pages/PrivatePage";

//import { RequireAuth } from './RequireAuth';

function App() {
  const loadingContext = useLoader();

  const isLoading = loadingContext?.isLoading;

  return (
    <AuthenticationProvider>
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <Router>
          <Header />
          <main className="container">
            <Routes>
              <Route
                path="/privatepage"
                element={
                  <RequiredAuth>
                    <PrivatePage />
                  </RequiredAuth>
                }
              />
              <Route path="/" element={<ShoppingList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </Router>
      )}
    </AuthenticationProvider>
  );
}

export default App;
