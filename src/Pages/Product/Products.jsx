import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import Productlist from "./Productlist";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
function Products() {
const navigate=useNavigate()
  function Add(){
    console.log("fgfgf")
    navigate("/add")
  }
  return (
   
      
      <div className="flex flex-1 h-screen">
      

        <div className="w-full">
          <div className="ml-5">
            <h1 className="mt-2 text-4xl">Products</h1>
          </div>
          <div className="flex items-center justify-between">
            <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3">
              products

            </h6>
            <div className="flex  p-5 items-center bg-[green] text-white h-[40px] w-[100px]  rounded-md hover:text-[green] hover:bg-white hover:outline outline-green-500 mr-[70px] ">
            <IoIosAdd />
            <button onClick={Add} >ADD</button>
            </div>
          </div>
          <div className="p-5 w-full">
           
            <Productlist />
          </div>
        </div>

           
      </div>
   
  );
}

export default Products;
