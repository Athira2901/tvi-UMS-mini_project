import React from "react";
import { IoMenu } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Menu from "./Menu";
import { FaSearch } from "react-icons/fa";
import Cartbadge from "./Cartbadge";


function Usernavbar(props) {
  return (
    <div className="bg-[#343a40]  flex gap-5 items-center text-white h-[56px] w-full">
      UMS
      <div className="flex justify-between w-screen">
        <button onClick={props.handleclick}>
          <IoMenu />
        </button>
        <div className="flex items-center  ">
          <input
            placeholder="Search for... "
            className="h-[36px] rounded-s-[4px] p-2 w-[233px]"
          />
          <div className="bg-[#007BFF] w-[40px] flex items-center justify-center h-[36px] rounded-r-[4px]">
            <FaSearch />
          </div>
          <div className="flex ml-8 mr-4">
            <Cartbadge/>
        </div>
          <div >
          <Menu />
        </div>
    
        </div>

       
      </div>
    </div>
  );
}

export default Usernavbar;