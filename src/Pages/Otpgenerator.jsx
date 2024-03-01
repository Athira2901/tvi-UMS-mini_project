import React from 'react'

function Otpgenerator() {
  return (
    <div className="bg-[#007bff] h-screen pt-10 flex flex-col items-center">
    <div className="bg-white mt-6 flex flex-col items-center  m-[20px] w-[80%] md:w-[90%] lg:w-[50%] rounded-lg">
      {/* <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
        <h1 className=" text-center text-4xl  ">OTP</h1>
      </div> */}

      <form className="flex flex-col mt-5   border border-b-gray-300  p-5 w-[100%] ">
        
        <div className="flex flex-col gap-2 m-2 "> 
         
          <input

            type="text"
            placeholder="Enter OTP "
            className=" rounded-lg p-2 border border-gray-300 "
          />
        </div>
       
       
        
       
   
        <button
          type="submit"
          className="text-white  bg-[#17a2b8] mt-3 hover:bg-[#007bff] pl-3 pr-3 text-sm  h-10 rounded-lg "
        >
         Verify OTP
        </button>
        
        </form>
        
    </div>
  </div>
  )
}

export default Otpgenerator