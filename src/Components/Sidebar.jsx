import React from 'react'
import { useNavigate } from 'react-router-dom'
function Sidebar() {
    const navigate=useNavigate()
    function adduser(){
           navigate("/register")
    }
  return (
    <div className='  w-[250px] bg-[#222831] text-[#FFFFFF80] hover:text-white h-screen p-[20px]'>
        <button onClick={adduser} >Create User</button>
    </div>
  )
}

export default Sidebar