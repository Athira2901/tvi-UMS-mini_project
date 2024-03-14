import React from 'react'
import { AiOutlineDashboard } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'

function Sidebar() {
    const navigate=useNavigate()
    function adduser(){
           navigate("/register")
    }
    function dashboard(){
       navigate("/Dashboard")
    }
    
  return (
    
    
    <div className='  w-[250px] bg-[#222831]  h-[100%] p-[20px] '>
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
        
    </div>
    
  )
}

export default Sidebar
// import React, { useState } from 'react';
// import { AiOutlineDashboard } from "react-icons/ai";
// import { FaUser } from "react-icons/fa";
// import { useNavigate } from 'react-router-dom';
// import './Sidebar.css'; // Import CSS file for styling

// function Sidebar() {
//     const [isOpen, setIsOpen] = useState(true); // State to toggle sidebar visibility
//     const navigate = useNavigate();

//     function adduser() {
//         navigate("/register");
//         setIsOpen(false); 
//     }

//     function dashboard() {
//         navigate("/Dashboard");
//         setIsOpen(false); 
//     }

//     return (
//         <div className={`sidebar ${isOpen ? 'open' : ''}`}>
//             <div className='text-[#FFFFFF40] text-sm '>
//                 <p>CORE</p>
//             </div>
//             <div className='text-[#FFFFFF80] hover:text-white mt-4 flex items-center gap-2' onClick={dashboard}>
//                 <AiOutlineDashboard />
//                 <button>Dashboard</button>
//             </div>
//             <div className='text-[#FFFFFF40] text-sm mt-3 '>
//                 <p>INTERFACE</p>
//             </div>
//             <div className='mt-5 text-[#FFFFFF80] hover:text-white flex items-center gap-2' onClick={adduser}>
//                 <FaUser />
//                 <button>Create User</button>
//             </div>
//         </div>
//     );
// }

// export default Sidebar;
