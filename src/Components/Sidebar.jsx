import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { FaTable } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";


function Sidebar(props) {
    const navigate=useNavigate()
    function adduser(){
           navigate("/register")
    }

    
  return (
    
    
    <div className='  w-[250px] bg-[#222831]  h-[100%] p-[20px] '>
      <div className='text-[#FFFFFF40] text-sm '>
       <p>CORE</p>
       </div>
       <div>
       <div className='text-[#FFFFFF80] hover:text-white mt-4 flex items-center gap-2'>
       <AiOutlineDashboard />
        <button onClick={(e)=>props.click("dashboard")}>Dashboard</button>
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
       <FaUser />
        <button onClick={adduser} >Create User</button>
        </div>
        <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
        <MdOutlineProductionQuantityLimits />
          <button onClick={(e)=>props.click("product")}>Products</button>
           
        </div>
        
    </div>
    
  )
}

export default Sidebar
