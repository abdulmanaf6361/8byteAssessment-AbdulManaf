import React, { useState } from "react";
import { scroller } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // for nice icons

const Navbar = () => {
  const sections = [
    "home",
    "about",
    "portfolio",
    // "people",
    "careers",
    "contact",
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (section) => {
    setMobileOpen(false); // close menu after clicking
    if (location.pathname === "/") {
      scroller.scrollTo(section, {
        smooth: true,
        offset: -80,
        duration: 500,
      });
    } else {
      navigate("/");
      setTimeout(() => {
        scroller.scrollTo(section, {
          smooth: true,
          offset: -80,
          duration: 500,
        });
      }, 300);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-500 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => handleNavClick("home")}
        >
          <img
            src="/kill2-removebg-preview.png"
            alt="SCIFYX Logo"
            className="h-8 w-8 object-contain"
            style={{ width: "55px", height: "36px" }}
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          {sections.map((section) => (
            <li key={section}>
              <span
                onClick={() => handleNavClick(section)}
                className="cursor-pointer text-white hover:text-cyan-300 transition duration-300 hover:scale-105 font-medium capitalize drop-shadow"
              >
                {section}
              </span>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 right-4 w-64 p-6 rounded-2xl shadow-xl backdrop-blur-lg bg-gradient-to-br from-gray-900/80 to-cyan-900/80 transform transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-96 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col space-y-4">
          {sections.map((section) => (
            <li key={section}>
              <span
                onClick={() => handleNavClick(section)}
                className="cursor-pointer text-white text-lg hover:text-cyan-300 transition duration-300 font-medium capitalize"
              >
                {section}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
