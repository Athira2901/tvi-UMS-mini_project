import React, { useState } from "react";
import { TextField } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";
function Addaddress() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [altphno, setAltphno] = useState("");
  const [pincode, setPincode] = useState("");
  const [states, setStates] = useState("");
  const [city, setCity] = useState("");
  const [bname, setBname] = useState("");
  const [area, setArea] = useState("");
  const [landmark, setLandmark] = useState("");
  let user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  function add(e) {
    var list = {
      fullName: fullName,
      phoneNumber: phoneNumber,
      alternateNumber: altphno,
      pincode: pincode,
      state: states,
      city: city,
      buildingName: bname,
      area: area,
      landmark: landmark,
    };
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/address", list, {
        headers: {
          Authorization: user1 || details,
        },
      })
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div>
      <div className="flex flex-col items-center border p-2 w-[50vw]">
        <div className="flex gap-3 justify-between w-full">
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Full Name(required)*"
            onChange={(e) => setFullName(e.target.value)}
            className="w-[50%]"
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Phone Number(required)*"
            className="w-[50%]"
            onChange={(e) => setPhoneNumber(e.target.value)}
          
          />
        </div>
        <div className="flex gap-3 justify-between w-full">
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="+Add alternate number"
            className="w-[50%]"
            onChange={(e) => setAltphno(e.target.value)}
          />

          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Pincode(required)*"
            className="w-[50%]"
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="flex gap-3 justify-between w-full">
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="State(required)*"
            className="w-[50%]"
            onChange={(e) => setStates(e.target.value)}
          />

          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="City(required)*"
            className="w-[50%]"
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="flex gap-3 justify-between w-full">
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Building Name(required)*"
            className="w-[50%]"
            onChange={(e) => setBname(e.target.value)}
          />
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper "
            label="Area(required)*"
            className="w-[50%]"
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <TextField
          helperText=" "
          id="demo-helper-text-aligned-no-helper "
          label="Landmark"
          className="w-full"
          onChange={(e) => setLandmark(e.target.value)}
        />
        <div className="bg-[#ff6f3c] w-[200px] h-[40px] text-center flex justify-center rounded-lg">
          <button onClick={add}>Save Address</button>
        </div>
      </div>
    </div>
  );
}

export default Addaddress;
