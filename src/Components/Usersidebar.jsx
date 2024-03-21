import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { FaTable } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { FaRegHeart } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";



function Usersidebar(props) {
    const navigate=useNavigate()
   

    
  return (
    
    
    <div className='  w-[250px] bg-[#222831]  h-full p-[20px] '>
      <div className='text-[#FFFFFF40] text-sm '>
       <p>CORE</p>
       </div>
       <div>
       <div className='text-[#FFFFFF80] hover:text-white mt-4 flex items-center gap-2'>
        <FaUser />
        <button onClick={(e)=>props.click("userdetails")}>User Profile</button>
       </div >
       {/* <div className='text-[#FFFFFF80] hover:text-white mt-4 flex items-center gap-2'> 
       <FaTable />

        <button onClick={datatable}>Datatable</button>
       </div> */}
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
        <button >Cart</button>
        </div>
        <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
           <FaRegHeart />
          <button >Wishlist</button>
           
        </div>

      
        
    </div>
    
  )
}

export default Usersidebar
