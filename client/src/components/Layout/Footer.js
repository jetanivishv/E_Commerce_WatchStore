import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from './Footer.module.css';

const Footer = () => {
  const [activeLinkFooter, setActiveLinkFooter] = useState("");
  const location = useLocation();

  useEffect(() => {
    const link=location.pathname.substring(1);
      setActiveLinkFooter(link);
  }, [location]);

  return (
    <div className={styles.footer}>
      <h1 className="text-center text-2xl">
        All Right Reserved &copy; Jetanivishv
      </h1>
      <p className="text-center mt-3">
        <Link to="/about"
         className={`${
          activeLinkFooter === "about"
            ? "border-b-2 border-yellow-200"
            : ""
        }`}
        >About</Link>|
        <Link to="/contact"
        className={`${
          activeLinkFooter === "contact"
            ? "border-b-2 border-yellow-200"
            : ""
        }`}
        >Contact</Link>|
        <Link to="/policy"
        className={`${
          activeLinkFooter === "policy"
            ? "border-b-2 border-yellow-200"
            : ""
        }`}
        >Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;
