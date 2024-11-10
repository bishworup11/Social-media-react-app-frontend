import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Feed from "./components/Feed";
import "./App.css";
import Navbar from "./components/Navbar";
import Profiles from "./components/profile/Profiles";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute ";
import Cookies from "js-cookie";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const token = Cookies.get("adonis-session");

  console.log(token);

  return (
    <Router>
      <div
        className={`App _layout _layout_main_wrapper ${
          darkMode ? "_dark_wrapper" : ""
        }`}
      >
        <div>
          <Routes>
            <Route
              path="/registration"
              element={
                <PublicRoute>
                  <Registration />
                </PublicRoute>
              }
            />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Feed />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/:slug"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Profiles />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
                    <Profiles />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
