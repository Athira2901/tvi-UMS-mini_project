import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import Productlist from "./Productlist";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import Viewproduct from "./Viewproduct";
import Userproductlist from "./Userproductlist";
import Usersidebar from "../../Components/Usersidebar";
import Usernavbar from "../../Components/Usernavbar";
import Userdetails from "../Userdetails";
import Cartlist from "./Cartlist";
import Wishlist from "./wishlist";
function Userproduct() {
    const [ishide, setIshide] = useState(false);
    const [dat, setDat] = useState("");
    function handleclick() {
        setIshide((current) => !current);
      }
      function click(msg) {
        console.log(msg)
        setDat(msg);
      }
const navigate=useNavigate()
  function Add(){
    console.log("fgfgf")
    navigate("/add")
  }
  return (
   <div className="overflow-scroll h-screen">
      <div className="fixed z-10 w-[1309px]" >
    <Usernavbar handleclick={handleclick} />
  </div>
  <div className="flex w-full  relative top-[56px]">
  <div
     className={`transition-all duration-500 ${
      ishide ? "w-[225px]" : "w-0"
     } overflow-hidden`}
    >
          <Usersidebar click={click} />
        </div>
        {dat == "userdetails"?(
            <div className="w-full">
               
            <Userdetails/>
          </div>
        //     <div className="flex flex-1 h-full">
        
    
        //     <div className="w-full">
        //       <div className="ml-5">
        //         <h1 className="mt-2 text-4xl">Product List</h1>
        //       </div>
        //       <div className="flex items-center justify-between">
        //         <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3">
        //           productlist
    
        //         </h6>
              

        //       </div>
              
        //     </div>
    
               
        //   </div>
        ):
         dat == "cartlist" ?(
            <div className="w-full">
                <div className="ml-5">
          <h1 className="mt-2 text-4xl">Product List</h1>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
            productlist

          </h6>
       
        </div>
        <div className="p-5 w-full">
            <Cartlist/>
          </div>
          </div>
        ):
        dat == "wishlist"?
        (
          <div className="w-full">
                <div className="ml-5">
          <h1 className="mt-2 text-4xl">Product List</h1>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
            productlist

          </h6>
       
        </div>
        <div className="p-5 w-full">
            <Wishlist/>
          </div>
          </div>
        ):(
              
    
        <div className="w-full">
        <div className="ml-5">
          <h1 className="mt-2 text-4xl">Product List</h1>
        </div>
        <div className="flex items-center justify-between">
          <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
            productlist

          </h6>
       
        </div>
        <div className="p-5 w-full">
         
          <Userproductlist />
        </div>
      </div>

         
    
        ) }
      
      </div>
      </div>
   
  );
}

export default Userproduct;
