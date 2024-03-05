import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import { MdLogin } from "react-icons/md";
function Sidebar() {
    const navigate=useNavigate()
    function adduser(){
           navigate("/register")
    }
    function dashboard(){
       navigate("/Dashboard")
    }
    function logeduser(){
      navigate("/")
    }
  return (
    
    
    <div className='  w-[250px] bg-[#222831]  h-screen p-[20px] '>
      <div className='text-[#FFFFFF40] text-sm '>
       <p>CORE</p>
       </div>
       <div className='text-[#FFFFFF80] hover:text-white mt-4 flex items-center gap-2'>
       <AiOutlineDashboard />
        <button onClick={dashboard}>Dashboard</button>
       </div>
       <div className='text-[#FFFFFF40] text-sm mt-3 '>
       <p>INTERFACE</p>
       </div>
       <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
       <FaUser />
        <button onClick={adduser} >Create User</button>
        </div>
        <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2'>
        <MdLogin />
          <button onClick={logeduser}>Login</button>
        </div>
    </div>
    
  )
}

export default Sidebar