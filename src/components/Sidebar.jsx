import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handeleCLick }) => (
  <div className="mt-10">
    {links.map((item) => (
      <NavLink
        to={item.to}
        key={item.name}
        className="flex flex-row justify-start my-8 text-sm
      text-gray-400 hover:text-cyan-400 items-center font-medium"
        onClick={() =>
          handeleCLick && handleClick()
        }>
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col py-10 px-4 bg-[#191624] w-[240px]">
        <img
          src={logo}
          alt="Logo"
          className="w-full h-14 object-contain
        "
        />
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3">
        {mobileMenuOpen ? (
          <RiCloseLine
            onClick={() =>
              setMobileMenuOpen(false)
            }
            className="h-6 text-white w-6 mr-2"
          />
        ) : (
          <HiOutlineMenu
            onClick={() =>
              setMobileMenuOpen(true)
            }
            className="h-6 text-white w-6 mr-2"
          />
        )}
      </div>
      <div
        className={`absolute backdrop-blur-lg z-10 p-6 md:hidden 
        top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b]
        smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        }`}>
        <img
          src={logo}
          alt="Logo"
          className="w-full h-14 object-contain
        "
        />
        <NavLinks
          handeleCLick={() =>
            setMobileMenuOpen(false)
          }
        />
      </div>
    </>
  );
};
export default Sidebar;
