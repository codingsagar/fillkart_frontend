import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#9980FF] flex text-white py-5 px-3">
      <div>
        <ul className="text-[10px] flex gap-3 flex-wrap border-b pb-3">
          <li>Carrers</li>
          <li>About</li>
          <li>Contact us</li>
          <li>Shoes</li>
          <li>Fashion</li>
          <li>Furniture</li>
          <li>Help</li>
          <li>Payment</li>
          <li>Return order</li>
          <li>Facebook</li>
          <li>Twitter</li>
          <li>Whatsapp support</li>
          <li>Return policy</li>
          <li>Security</li>
          <li>Sitemap</li>
        </ul>

          <p className="text-[12px] mt-3 font-medium">E-mail : care@fillkart.com</p>

          <div className="text-sm mt-1 font-medium">
            <address>
              FillKart Company,
              Gandhinagar, Gujrat
            </address>
          </div>
      </div>
    </div>
  );
};

export default Footer;
