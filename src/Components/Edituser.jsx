import React from 'react'
import axios from 'axios'
import { useEffect,useState } from 'react'
import {useParams} from react-router-dom;
function Edituser() {
 const {id}=useParams();
 const [fname, setFname] = useState("")
  const [sname, setSname] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:8000/api/users"+id)
    .then((response)=>{
        setFname(response.data.fname);
        setSname(response.data.sname);
        setEmail(response.data.email);
        setRole(response.data.role);
        setPassword(response.data.password)
    })
  },[id])
  return (
    <div className="bg-[#007bff] h-[120%] pt-10 flex flex-col items-center">
    <div className="bg-white mt-6 flex flex-col items-center  m-[20px] w-[80%] md:w-[90%] lg:w-[50%]  rounded-lg">
      <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
        <h1 className=" text-center text-4xl  ">Create Account</h1>
      </div>
      <form className="flex flex-col mt-5   border border-b-gray-300  p-5 w-[100%] ">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col gap-2 m-2  ">
          <label>First Name</label>
          <input

            type="text"
            placeholder="Enter first name"
            className="rounded-lg lg:w-[225px] p-2 text-sm  md:w-[310px] xl:w-[302px] border border-gray-300  "
            value={fname}
            onInput={(e)=>setFname(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 m-2 ">
          <label>Last Name</label>
          <input

            type="text"
            placeholder="Enter last name"
            className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[302px] border border-gray-300 "
            value={sname}
            onInput={(e)=>setSname(e.target.value)}
          />
        </div>
        </div>
        <div className="flex flex-col gap-2 m-2 "> 
          <label>Email</label>
          <input

            type="email"
            placeholder="Enter email address"
            className=" rounded-lg p-2 border border-gray-300 "
            value={email}
            onInput={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div>
        <label>Role:</label>
          <select name="role" id="role" value={role} 
            onInput={(e)=>setRole(e.target.value)}>
              <option value="qc">QC</option>
              <option value="qa">QA</option>
              <option value="agent">Agent</option>
              <option value="supervisor">Supervisor</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 ">
        <div className="flex flex-col gap-2 m-2 ">
          <label>Password</label>
          <input

            type="password"
            placeholder="Enter password"
            className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[302px] border border-gray-300 "
            value={password}
            onInput={(e)=>setPassword(e.target.value)}
          />
        </div>
     
        </div>
        <button
          type="submit"
          className="text-white mt-6 bg-[#17a2b8] hover:bg-[#007bff] w-full   h-10 rounded-lg "
          onClick={reguser}
        >
          Edit user
        </button>
        </form>
       
    
    </div>
  </div>
  )
}

export default Edituser