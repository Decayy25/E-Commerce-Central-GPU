import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAccount } from "./api/api";
import type { Account } from "./types/type";

// Components & Pages
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Shop from "./pages/Shop";

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
    AOS.init({ duration: 800, easing: "ease-in-out", once: false});
    feather.replace();
  
    const fetchUserData = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const userData = await getAccount(storedToken);
          setAccount(userData);
        } catch (err) {
          console.error("Gagal mengambil data akun:", err);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
    };

    fetchUserData();
  }, [token]);

  const hiddenHeaderFooter = ["/login", "/register"];
  const isAuthPage = hiddenHeaderFooter.includes(location.pathname);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {!isAuthPage && <Header setToken={setToken} account={account} />}

      <Routes>
        <Route path="/login" element={!token ? <LoginPage setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/login" />} />

        <Route path="/" element={token ? <Shop account={account} /> : <Navigate to="/login" />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}