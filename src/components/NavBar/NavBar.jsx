import React from "react";
import "./NavBar.css";
import { RiMenu3Fill } from "react-icons/ri";
import { CgSearchLoading } from "react-icons/cg";
import { FaUserCircle } from "react-icons/fa";
import { FaList } from "react-icons/fa";

const NavBar = () => {
  return (
    <div id="navbar">
      <div className="logo"></div>
      <h1 className="heading">QUIZZY</h1>
      <RiMenu3Fill className="menuIcon" />
      <div className="nav-list">
        <FaList className="nav-icons" />
        <span className="icon-names ">Quizzes</span>
        <CgSearchLoading className="nav-icons" />
        <span className="icon-names ">More</span>
        <FaUserCircle className="user-icon nav-icons"/>
      </div>
    </div>
  );
};

export default NavBar;
