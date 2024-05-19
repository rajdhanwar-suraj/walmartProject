import React from "react";
import logo from "../assets/logo1.png";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-primary text-primary-content bg-[#004f9a] text-[18px] flex flex-col text-center items-center justify-center text-white">
      <aside>
        <img src={logo} alt="" className="h-10 mx-auto mb-3" />
        <p className="font-bold">
          Walmart Pvt. Ltd. <br />We’d love to hear what you think!
        </p>
        <p>© 2024 Walmart. All Rights Reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
