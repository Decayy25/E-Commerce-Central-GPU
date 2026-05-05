import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccounts } from "./api/api";
import type { Account } from "./types/TypeAuth";

// Components & Pages
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Shop from "./pages/Shop";
import CartOrder from "./components/organisms/CartOrder";

// Desain & Library
import feather from "feather-icons";
import "devicon/devicon.min.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false });
    feather.replace();

    (async () => {
      const sharedToken = localStorage.getItem("token");

      if (!sharedToken) {
        setAccount(null);
        return;
      }

      const data = await getAccounts();

      if (data && !data.error && data.status !== 401) {
        setAccount(data);
      } else if (data?.status === 401 || data?.error) {
        localStorage.removeItem("token");
        setToken(null);
        setAccount(null);
      }

      // HAPUS setAccount(data) yang ada di luar blok if-else ini
    })();
  }, [token]);

  const hiddenHeaderFooter = ["/login", "/register", "/cart"];
  const isAuthPage = hiddenHeaderFooter.includes(location.pathname);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {!isAuthPage && <Header setToken={setToken} account={account} />}

      <Routes>
        <Route
          path="/login"
          element={
            !token ? <LoginPage setToken={setToken} /> : <Navigate to="/" />
          }
        />
        <Route
          path="/register"
          element={!token ? <RegisterPage /> : <Navigate to="/login" />}
        />

        <Route
          path="/"
          element={
            token ? <Shop /> : <Navigate to="/login" />
          }
        />
        <Route path="/cart" element={<CartOrder />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}
