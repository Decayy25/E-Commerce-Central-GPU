import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Account } from "../../types/TypeAuth";
import feather from 'feather-icons';
import Button from "../atoms/Button"

interface HeaderProps {
  setToken: (token: string | null) => void;
  account: Account | null;
}

export default function Header({ setToken }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userEmail")
    setToken(null)
    navigate("/login")
  }

  useEffect(() => {
    feather.replace();
  }, []);

  return (
    <header className="w-full bg-[#589c00] text-white border-b border-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5 md:grid md:grid-cols-2">
        {/* Logo */}
        <h1 className="text-xl font-bold justify-self-start ml-[-20px] md:ml-[-40px] md:text-4xl">
          Central GPU
        </h1>

        {/* Right Section */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6 text-lg">
            <Link to="/" className="hover:text-green-200 transition">
              Shop
            </Link>

            <Link to="/cart" className="hover:text-green-200 transition">
              Cart
            </Link>

            <Link to="/contact" className="hover:text-green-200 transition">
              Contact
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="bg-white text-[#589c00] px-4 py-2 rounded font-medium hover:bg-green-100 transition"
            >
              Logout
            </button>
          </nav>

          {/* Hamburger Mobile */}
          <button
            className="text-4xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`md:hidden bg-[#6abea7] overflow-hidden border-t border-[#9ffff5] transition-all duration-300 ${
          isMenuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col px-6 py-3">
          <li>
            <Link
              to="/"
              className="block py-4 px-3 border-b border-[#9ffff5] hover:bg-[#7cffc4] text-lg font-semibold hover:text-[#3079ee]"
            >
              Shop
            </Link>
          </li>

          <li>
            <Link
              to="/cart"
              className="block py-4 px-3 border-b border-[#9ffff5] hover:bg-[#7cffc4] text-lg font-semibold hover:text-[#3079ee]"
            >
              Cart
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="block py-4 px-3 border-b border-[#9ffff5] hover:bg-[#7cffc4] text-lg font-semibold hover:text-[#3079ee]"
            >
              Contact
            </Link>
          </li>

          <li>
            <Button
              type="button"
              onClick={handleLogout}
              className="block py-2 px-3 mt-2 border-b border-[#9ffff5] hover:bg-[#7cffc4] text-lg font-semibold hover:text-[#3079ee]"
            >
              Logout
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}