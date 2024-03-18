import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authService from "./appwrite/AuthService";
import { login, logout } from "./store/authSlice";
import { Footer, Header } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div
      style={{
        height: "100vh",
        width: "100vh",
        display: "flex",
        backgroundColor: "lightcyan",
      }}
    >
      <div style={{ display: "block" }}>
        <Header />

        <main>
          <h1>Blogs</h1>
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
