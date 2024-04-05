import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import Editaddress from "./Address/Editaddress";
function Addresslist(props) {
  const [addres, setAddres] = useState([]);
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  function getaddress() {
    axios
      .get("http://localhost:8000/api/address-view", {
        headers: {
          Authorization: user1 || details,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        console.log(response)
        console.log(response.data.result[0].address);
        setAddres(response.data.result[0].address);
      });
  }
  useEffect(() => {
    getaddress();
  }, []);
  return (
    <div className="flex flex-col justify-center border w-full">
      <div
        onClick={(e) => props.click("addaddress")}
        className="  text-[blue] flex justify-center items-center gap-1 shadow-lg h-[40px]"
      >
        <FaPlus />
        <button>Add a new address</button>
      </div>
      {addres.map((addr) => (
        <div className="shadow-lg relative ">
          <label>
          <div className="flex justify-between mt-3 ">
            <div className="flex gap-2">
              <input type="radio" name="address" />
              <h1 className="text-xl mt-3"> {addr.fullName}</h1>
            </div>
          </div>
          <div className="mt-1 ml-[25px] italic">
            <div className="flex ">
              <h2>{addr.buildingName},</h2>
              <h2>{addr.landmark},</h2>
              <h2>{addr.area}</h2>
            </div>
            <div className="flex ">
              <h2>{addr.city},</h2>
              <h2>{addr.state}-</h2>
              <h2>{addr.pincode}</h2>
            </div>

            <h2 className="mt-1">{addr.phoneNumber}</h2>
          </div>
          </label>
          <div className=" w-[40px] flex justify-center shadow-lg absolute top-5 right-5 text-center text-[blue] rounded-md">
       {/* <button onClick={(e)=>props.click("addresslist")}>Edit</button> */}
       <Editaddress editid={addr._id} addresslist={Addresslist}/>
       </div>
        </div>
      ))}
    </div>
  );
}
export default Addresslist;
