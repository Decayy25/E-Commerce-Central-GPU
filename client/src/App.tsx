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
import Cart from "./pages/Cart"


// Desain & Library
import feather from "feather-icons";
import "devicon/devicon.min.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";
import LoadingScreen from "./components/organisms/Loading";

export const App: React.FC = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [IsLoading, setIsLoading] = useState<boolean>(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [location.pathname]);




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
    })();
  }, [token]);

  const hiddenHeaderFooter = ["/login", "/register", "/cart"];
  const isAuthPage = hiddenHeaderFooter.includes(location.pathname);

  if(IsLoading) return <LoadingScreen />

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

        <Route path="/" element={token ? <Shop /> : <Navigate to="/login" />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default App;
