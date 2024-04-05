import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../Store/authSlice";
import {useDispatch} from  "react-redux"

function Login() {
  const [email, setEmail] = useState("@gmail.com");
  const [password, setPassword] = useState("admin@123");
  const [message,setMessage] = useState("")
  const[values,setValues]=useState("")
  const navigate = useNavigate();
  let dispatch=useDispatch()
 
    
  function handleEmail(e){
    setEmail(e.target.value)
    let emailRegex = /[a-z0-9]+\.[a-z]{2,3}/;
    if(email==""){
      setMessage("email is required")
    }
    
    else if(!emailRegex.test(email)){
      setMessage("error!you have entered invalid email")
    }
    else{
      setMessage("")
    }
  }
  function handlepassword(e){
    setPassword(e.target.value)
    if(password==""){
      setValues("Password is required")
    }
    else if(password.length < 8){
      setValues("Password must be more than 8 characters")
    }
    else{
      setValues("")
    }
  }
  function loguser(e) {
    e.preventDefault();
    let user = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8000/api/login", user)
      .then((response) => {
     
        var token=response.data.access_token
        dispatch(setUser(token));
         console.log(response.data.role)
         if(response.data.role == "admin"){
               navigate('/dashboard')
         }
          if(response.data.role == "agent"){
            navigate('/userproduct')
         }
         if(response.data.role == "supervisor"){
          navigate('/supervisor')
         }
     
      // console.log(token)
      // console.log(user1?.token)
      // navigate('/dashboard')
    })
    if(email==""){
      setMessage("email is required")
    }
    if(password==""){
      setValues("Password is required")
    }


  }
  return (
    <div className="bg-[#007bff] h-screen pt-10 flex flex-col items-center">
      <div className="bg-white mt-6 flex flex-col items-center  m-[20px] w-[80%] md:w-[90%] lg:w-[50%] rounded-lg">
        <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
          <h1 className=" text-center text-4xl  ">Login</h1>
        </div>
        <form className="flex flex-col mt-5   border border-b-gray-300  p-5 w-[100%] ">
          <div className="flex flex-col gap-2 m-2 ">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className=" rounded-lg p-2 border border-gray-300 "
              value={email}
             
              onChange={handleEmail}
            /><div className="text-[red] text-sm">{message}</div>
          </div>

          <div className="flex flex-col gap-2 m-2 ">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="rounded-lg p-2 text-sm   border border-gray-300 "
              value={password}
              // onInput={(e) => setPassword(e.target.value)}
              onChange={handlepassword}
            /><div className="text-[red] text-sm">{values}</div>
          </div>

          <div className="flex ">
            <input type="checkbox"></input>
            <label className="mt-3 ml-2">Remember password</label>
          </div>
          <div className="flex justify-between">
            <Link to="/passwordrecovery" className="text-[#17a2b8] text-sm">
              Forgot Password?
            </Link>
            <button
              type="submit"
              className="text-white  bg-[#17a2b8] mt-0 hover:bg-[#007bff] w-[80px]  h-10 rounded-lg "
              onClick={loguser}
            >
              Login
            </button>
          </div>
        </form>
        <Link
          to="/Userregister"
          className="text-sm text-center mt-10 text-[#17a2b8]"
        >
          Need an account? Sign up!
        </Link>
      </div>
    </div>
  );
}

export default Login;
