import React, { useState } from 'react';
import "../components/header.css";
import { Link } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <Link to="/">
            <img src="https://i.ibb.co/RHBLTXp/logo.png" alt="Logo Image" />
          </Link>
        </div>
        <div className={`hamburger ${isOpen ? "toggle" : ""}`} onClick={handleMenuClick}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/aboutcompany">About Us</Link></li>
          <li><Link to="/productcollection">Products</Link></li>
          <li><Link to="/career">Careers</Link></li>
          <li><Link to="/blogs">Blogs</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><a className="join-button" href="https://portal.everestpharmaceuticals.com.np/">E-REPORTING</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
