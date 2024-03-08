import React, { useEffect } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
function Register() {
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [errors,setErrors]=useState([])
  const navigate = useNavigate();
  let user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  useEffect(() => {
    console.log(user1);
  }, []);
  function reguser(e) {
    e.preventDefault();
    var user = {
      firstName: fname,
      lastName: sname,
      email: email,
      role: role,
      password: password,
    };

    axios
      .post("http://localhost:8000/api/user", user, {
        headers: {
          // method: "POST",
          genericvalue: "admin",
          Authorization: user1 || details,
        },
      })
      .then((response) =>{ console.log(response)
      if(response.status==201){
        navigate("/Dashboard")
      }});

   
  }
  const validate =(values) =>{
     const errors ={};
     const regex=/[a-z0-9]+\.[a-z]{2,3}/;
     if(!values.firstName){
      errors.firstName="Firstname is required"
     }
  }
  return (
    <div className="bg-[#007bff] h-[120%]  flex flex-col items-center">
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
                onInput={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 m-2 ">
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Enter last name"
                className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[302px] border border-gray-300 "
                value={sname}
                onInput={(e) => setSname(e.target.value)}
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
              onInput={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Role:</label>
            <select
              name="role"
              id="role"
              value={role}
              onInput={(e) => setRole(e.target.value)}
            >
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
                onInput={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 m-2 ">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[302px] border border-gray-300 "
                value={confirmpassword}
                onInput={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="text-white mt-6 bg-[#17a2b8] hover:bg-[#007bff] w-full   h-10 rounded-lg "
            onClick={reguser}
          >
            Create Account
          </button>
        </form>
        <Link to="/" className="text-center mt-10 text-[#17a2b8]">
          Have an account? Go to login
        </Link>
      </div>
    </div>
  );
}

export default Register;
