import React from "react";
import { Link } from "react-router-dom";
import { BsLinkedin } from "react-icons/bs";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

const socialLinks = [
  { path: "#", icon: <AiFillYoutube className="text-[24px] hover:text-red-500 transition-all duration-300" /> },
  { path: "https://github.com/yashika2244/Serivce", icon: <AiFillGithub className="text-[24px] hover:text-gray-400 transition-all duration-300" /> },
  { path: "#", icon: <AiOutlineInstagram className="text-[24px] hover:text-pink-400 transition-all duration-300" /> },
  { path: "https://www.linkedin.com/in/yashika-chauhan-082155367/", icon: <BsLinkedin className="text-[24px] hover:text-blue-500 transition-all duration-300" /> },
];

const quickLinks = [
  { title: "Quick Links", links: [
    { path: "/home", display: "Home" },
    { path: "/about", display: "About Us" },
    { path: "/services", display: "Services" },
  ]},
  { title: "Find a services", links: [
    { path: "/find-service", display: "Find a service" },
    { path: "/appointment", display: "Request an Appointment" },
    { path: "/locations", display: "Find a Location" },
    { path: "/opinion", display: "Get an Opinion" },
  ]},
  { title: "Support", links: [
    { path: "/donate", display: "Donate" },
    { path: "/contact", display: "Contact Us" },
  ]},
];

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white ">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-2  md:grid-cols-4 gap-8">
          {/* Logo and Social Links */}
          <div className="text-center sm:text-left">
            <img src="/images/logo.jpeg" alt="Logo" className="w-9 rounded-3xl mx-auto sm:mx-0" />
            <p className="text-gray-400 mt-4 text-sm">
              &copy; {year} Developed by <strong>Yashika Chauhan</strong>. All rights reserved.
            </p>
            <div className="flex justify-center sm:justify-start gap- mt-4">
              {socialLinks.map((item, index) => (
                <Link key={index} to={item.path} className="p-1 bg-gray-800 rounded-full hover:bg-gray-700">
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Sections */}
          {quickLinks.map((section, index) => (
            <div key={index}>
              <h2 className="text-lg font-semibold text-gray-300">{section.title}</h2>
              <ul className="mt-2 space-y-2">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link to={link.path} className="text-gray-400 hover:text-gray-100 transition-all">
                      {link.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;