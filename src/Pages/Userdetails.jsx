import React from 'react'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Userdetails() {
 const [userdetails, setUserdetails] = useState({})
 let user1=useSelector((store)=>store.auth.user)
 let navigate=useNavigate()
 let details=localStorage.getItem("user")
   useEffect(()=>{
     axios.get("http://localhost:8000/api/me",{
        headers:{
            genericvalue: "agent",
            Authorization: user1 || details
        }
        
     })
     .then((response)=>setUserdetails(response.data.data))
   })
   function userprofile(){
    navigate('/')
   }
   function edituser(){
       axios.put("http://localhost:8000/api/me/update-user")
   }
  return (
    <div className="bg-[#2B344580] h-[120%] pt-10 flex flex-col items-center">
    <div className="bg-[#E6E6E6] mt-6 flex flex-col items-center  m-[20px] w-[80%] md:w-[90%] lg:w-[50%]  rounded-lg">
      <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
        <h1 className=" text-center text-4xl  ">User details</h1>
      </div>
      <form className="flex flex-col mt-5   border border-b-gray-300  p-5 w-[100%] ">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col gap-2 m-2  ">
          <label>First Name</label>
          <input

            type="text"
            placeholder="Enter first name"
            className="rounded-lg lg:w-[225px] p-2 text-sm  md:w-[310px] xl:w-[302px] border border-gray-300  "
            defaultValue={userdetails.firstName}
            
          />
        </div>
        <div className="flex flex-col gap-2 m-2 ">
          <label>Last Name</label>
          <input

            type="text"
            placeholder="Enter last name"
            className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[302px] border border-gray-300 "
            defaultValue={userdetails.lastName}
          
          />
        </div>
        </div>
        <div className="flex flex-col gap-2 m-2 "> 
          <label>Email</label>
          <input

            type="email"
            placeholder="Enter email address"
            className=" rounded-lg p-2 border border-gray-300 "
            defaultValue={userdetails.email}
           
          />
        </div>
        <div className="flex flex-col gap-2 m-2 ">
        <label>Role:</label>
          <input
           type="text"
           className=" rounded-lg p-2 border border-gray-300 "
           defaultValue={userdetails.role}
           
           />
        </div>
        <div className="flex flex-col gap-2 m-2 ">
        <label>Password:</label>
          <input
           type="text"
           className=" rounded-lg p-2 border border-gray-300 "
           defaultValue={userdetails.password}
        
           />
        </div>
       
        <button
          type="submit"
          className="text-white mt-6 bg-[#17a2b8] hover:bg-[#007bff] w-full   h-10 rounded-lg "
          onClick={userprofile}
        >
          Back
        </button>
        <button type="submit"  className="text-white mt-6 bg-[#28a745] hover:bg-[green] w-full   h-10 rounded-lg " onClick={edituser}>Edit user</button>
        </form>
     
    
    </div>
  </div>
  )
}

export default Userdetails