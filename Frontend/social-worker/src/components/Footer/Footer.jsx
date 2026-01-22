import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  { path: "#", icon: <AiFillYoutube className="text-xl hover:text-red-500 transition-all duration-300" /> },
  { path: "https://github.com/yashika2244/Serivce", icon: <AiFillGithub className="text-xl hover:text-gray-400 transition-all duration-300" /> },
  { path: "#", icon: <AiOutlineInstagram className="text-xl hover:text-pink-400 transition-all duration-300" /> },
  { path: "https://www.linkedin.com/in/yashika-chauhan-082155367/", icon: <BsLinkedin className="text-xl hover:text-blue-500 transition-all duration-300" /> },
];

const quickLinks = [
  { title: "Company", links: [
    { path: "/services", display: "Services" },
    { path: "/", display: "Home" },
    { path: "/contact", display: "Contact Us" },
    { path: "/about", display: "About Us" },
    { path: "/find-Service", display: "Find Services" },
  ]},
  { title: "Contact Info", links: [
    { path: "#", display: "(000) 000-0000" },
    { path: "#", display: "example@gmail.com" },
    { path: "#", display: "2464 Royal Ln, Mesa, New Jersey 45463" },
  ]},
  { title: "Booking Hours", links: [
    { path: "#", display: "Monday to Friday: 09:00 - 22:00" },
    { path: "#", display: "Saturday: 11:00 - 20:00" },
    { path: "#", display: "Sunday: Closed" },
  ]},
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0b1b3f] text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-2">
              <img src="/images/mainlogo.png" alt="Logo" className="w-42 " />
            </div>
            <p className="text-gray-400 mt-4 text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-4">
              {socialLinks.map((item, idx) => (
                <Link key={idx} to={item.path} className="p-2 bg-[#142b60] rounded-full hover:bg-[#1f3d80] transition">
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {quickLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold text-lg">{section.title}</h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link, idy) => (
                  <li key={idy}>
                    <Link to={link.path} className="text-gray-400 hover:text-white text-sm transition">
                      {link.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <p>Copyright &copy; {year} GetMyService Website. All Rights Reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="#">User Terms & Conditions</Link>
            <Link to="#">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
