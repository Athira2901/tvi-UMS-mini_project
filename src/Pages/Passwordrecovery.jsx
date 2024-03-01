import React from 'react'
import { Link } from 'react-router-dom'

function Passwordrecovery() {
  return (
    <div className="bg-[#007bff] h-screen pt-10 flex flex-col items-center">
    <div className="bg-white mt-6 flex flex-col items-center  m-[20px] w-[80%] md:w-[90%] lg:w-[50%] rounded-lg">
      <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
        <h1 className=" text-center text-4xl  ">Password Recovery</h1>
      </div>

      <p className='text-[grey] mt-5 text-sm'>Enter your email address and we will send you a link to reset your password.</p>
      <form className="flex flex-col mt-5   border border-b-gray-300  p-5 w-[100%] ">
        
        <div className="flex flex-col gap-2 m-2 "> 
          <label>Email</label>
          <input

            type="email"
            placeholder="Enter email address"
            className=" rounded-lg p-2 border border-gray-300 "
          />
        </div>
       
       
        
       
        <div className='flex justify-between mt-4'>
           <Link to="/" className='text-[#17a2b8] text-sm'>Return to login</Link>
        <button
          type="submit"
          className="text-white  bg-[#17a2b8] mt-0 hover:bg-[#007bff] pl-3 pr-3 text-sm  h-10 rounded-lg "
        >
          Generate OTP
        </button>
        </div>
        </form>
        <div className='mt-5'>
        <Link to="/register" className="text-sm  text-center mt-10 text-[#17a2b8] ">Need an account? Sign up!</Link>
        </div>
    </div>
  </div>
  )
}

export default Passwordrecovery