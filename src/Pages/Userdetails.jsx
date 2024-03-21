import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import userLogo from "../assets/userLogo.jpg";
import Uploadimg from "../Components/Uploadimg";
import Navbar from "../Components/Navbar";

function Userdetails() {
  const [userdetails, setUserdetails] = useState({});
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [showEditButton, setShowEditButton] = useState(true);
  const [isedit, setIsedit] = useState(false);
  const user1 = useSelector((store) => store.auth.user);
  const navigate = useNavigate();
  const details = localStorage.getItem("user");
  const [datas, setDatas] = useState("");
  const [ishide, setIshide] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/me", {
        headers: {
          genericvalue: "agent",
          Authorization: user1 || details,
        },
      })
      .then((response) => 
      {setUserdetails(response.data.result)
      console.log(response.data.result)})
      .catch((error) => console.error("Error fetching user details:", error));
  }, [user1, details]);

  function userprofile() {
    setIsedit(false);
  }
  function handlefn(data) {
    setDatas(data);
  }
  function edituser(e) {
    e.preventDefault();
    setShowEditButton(false); // Hide the "Edit user" button
    const user = {
      firstName: fname || userdetails.firstName,
      lastName: sname || userdetails.lastName,
      imageURL: datas,
    };
    axios
      .put("http://localhost:8000/api/me/update-user", user, {
        headers: {
          genericvalue: "agent",
          Authorization: user1 || details,
        },
      })
      .then((response) => {
        console.log("User details updated successfully:", response.data);
        userprofile();
      })
      .catch((error) => {
        console.error("Failed to update user details:", error);
      });
  }
  function edit() {
    setIsedit(true);
  }

  const fullName = `${userdetails.firstName} ${userdetails.lastName}`

  let words = fullName.split(" ");

  let fullname = words
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-[#2B344580] h-full  flex flex-col items-center ">
      
   
      <div className="bg-[#E6E6E6]  top-[60px]  flex flex-col items-center  border border-black m-[50px] w-[80%] md:w-[90%] lg:w-[60%]  rounded-lg">
        <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
          <h1 className=" text-center text-4xl  ">User details</h1>
        </div>

        <form className="flex flex-col mt-1 border border-b-gray-300 p-3 w-[100%] ">
          <div className="flex flex-col items-center ">
            <div className="h-[100px] flex justify-center items-center w-[10vw] rounded-lg text-center ">
              {datas ? (
                <img
                  src={datas}
                  className="h-[115px] w-[125px] mt-3 rounded-xl"
                />
              ) : (
                <div className="text-3xl rounded-[50%] flex justify-center items-center p-5  bg-[#343a40] text-white  ">
                  {fullname}
                </div>
              )}
            </div>
            {isedit ? <Uploadimg handlefn={handlefn} /> : ""}
          </div>
          {isedit ? (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-2 m-2">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[210px] xl:w-[302px] border border-gray-300"
                  defaultValue={userdetails?.firstName}
                  onChange={(e) => setFname(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 m-2">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[210px] xl:w-[302px] border border-gray-300"
                  defaultValue={userdetails.lastName}
                  onChange={(e) => setSname(e.target.value)}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="flex flex-col gap-2 m-2">
                <label>First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="rounded-lg lg:w-[185px] p-2 text-sm md:w-[110px]  xl:w-[302px] border border-gray-300"
                  defaultValue={userdetails.firstName}
                  onChange={(e) => setFname(e.target.value)}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-2 m-2">
                <label>Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="rounded-lg lg:w-[185px] p-2 text-sm md:w-[210px] xl:w-[302px] border border-gray-300"
                  defaultValue={userdetails.lastName}
                  onChange={(e) => setSname(e.target.value)}
                  disabled
                />
              </div>
            </div>
          )}
          <div className="flex flex-col gap-2 m-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email address"
              className="rounded-lg p-2 border border-gray-300"
              defaultValue={userdetails.email}
              disabled
            />
          </div>
          <div className="flex flex-col gap-2 m-2">
            <label>Role:</label>
            <input
              type="text"
              className="rounded-lg p-2 border border-gray-300"
              defaultValue={userdetails.role}
              disabled
            />
          </div>
          <div className="flex justify-center gap-4 ">
            {isedit ? (
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="text-white mt-6 bg-[#17a2b8] hover:bg-[#007bff] w-[100px] h-10 rounded-lg"
                  onClick={userprofile}
                >
                  Back
                </button>
                {showEditButton && (
                  <button
                    type="submit"
                    className="text-white mt-6 bg-[#28a745] hover:bg-[green] w-[100px] h-10 rounded-lg"
                    onClick={edituser}
                  >
                    Submit
                  </button>
                )}
              </div>
            ) : (
              <button
                className="text-white mt-66 bg-[#28a745] hover:bg-[green] w-[100px] h-10 rounded-lg "
                onClick={edit}
              >
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
      </div>
    //  </div>
  );
}

export default Userdetails;
