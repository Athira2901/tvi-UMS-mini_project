import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { FaTable } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { BsBox } from "react-icons/bs";


function Usersidebar(props) {
    const navigate=useNavigate()
   
function cartlist(){
  navigate("/cartlist")
}
    
  return (
    
    
    <div className='  w-[250px] bg-[#222831]  h-screen p-[20px] '>
      <div className='text-[#FFFFFF40] text-sm '>
       <p>CORE</p>
       </div>
       <div>
       <div className='text-[#FFFFFF80] hover:text-white mt-4 flex items-center gap-2'>
        <FaUser />
        <button onClick={(e)=>props.click("userdetails")}>User Profile</button>
       </div >
      
       </div>
       <div className='text-[#FFFFFF40] text-sm mt-5 '>
       <p>INTERFACE</p>
       </div>
       <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
       <FaListUl />
        <button onClick={(e)=>props.click("product")}>Products</button>
        </div>
       <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
         <GiShoppingCart />
        <button onClick={(e)=>props.click("cartlist")} >Cart</button>
        </div>
        <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
           <FaRegHeart />
          <button onClick={(e)=>props.click("wishlist")}>Wishlist</button>
           
        </div>

        <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
        <BsBox />
          <button onClick={(e)=>props.click("orderproduct")}>Orders</button>
           
        </div>
      
        
    </div>
    
  )
}

export default Usersidebar
