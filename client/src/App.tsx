import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Client Components
import Header from "./components/organisms/Header";
import Footer from "./components/organisms/Footer";
import Cart from "./components/organisms/CartOrder";

// Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Contact from "./pages/Contact";
import Shop from "./pages/Shop";


// Desain
import feather from "feather-icons";  
import "devicon/devicon.min.css";
import "./index.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App() {
  const [account, setAccount] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: false});
    feather.replace();
    fetch(`${import.meta.env.VITE_API}/api/auth/accounts`)
      .then((response) => response.json())
      .then((data) => {
        setAccount(data || account);
        setTimeout(() => AOS.refresh(), 100);
      })
      .catch(err => console.error(err));
  }, []);

  const hiddenHeaderFooter = ["/login", "/register"];
  const currentPath = window.location.pathname;
  const isAuthPage = hiddenHeaderFooter.includes(currentPath);

  
  return (
    <div className="flex flex-col w-full min-h-screen">
      {!isAuthPage && <Header setToken={setToken} />}

      <Routes>
        <Route path="/login" element={!token ? <LoginPage setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <RegisterPage /> : <Navigate to="/login" />} />
        <Route path="/" element={token ? <Shop /> : <Navigate to="/login" />} />
        
        
        
        <Route path="/cart" element={<Cart />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </div>
  );
}