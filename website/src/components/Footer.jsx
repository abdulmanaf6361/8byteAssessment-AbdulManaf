// src/components/Footer.jsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 text-center border-t border-gray-800">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} <span className="text-blue-500 font-semibold">Scifyx Tech Private Limited</span>. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
