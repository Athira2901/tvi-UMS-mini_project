import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from 'react-redux';
function Buyproduct(props) {
  const [address, setAddress] = useState([])
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  function getaddress(){
    axios.get("http://localhost:8000/api/address-view",{
      headers: {
        Authorization: user1 || details,
        genericvalue: "agent",
      },
    }).then((response)=>{
      console.log(response.data.result[0].address[0])
      setAddress(response.data.result[0].address[0])
    })
  }
  useEffect(()=>{
    getaddress()
  },[])
  return (
    <div className="flex flex-col justify-center border w-full">
     <div className="bg-[grey] w-[90px] h-[30px] text-center p-1 rounded-lg hover:text-[white]">
     <button >back</button>
     </div>

     <div className="mt-3 ml- italic shadow-xl">
      <div className="flex justify-between mt-3 ">
       <h1 className="text-xl"> Deliver to:</h1>
       <div className="border border-[grey] w-[80px] text-center text-[blue] rounded-md">
       <button onClick={(e)=>props.click("addresslist")}>Change</button>
       </div>
       </div>
       <h1 className="text-xl mt-3">{address.fullName}</h1>
       <div className="mt-2">
       <div className="flex ">
       <h2>{address.buildingName},</h2>
       <h2>{address.landmark},</h2>
       <h2>{address.area}</h2>
       </div>
       <div className="flex ">
       <h2 >{address.city},</h2>
       <h2>{address.pincode}</h2>
       </div>
       <h2>{address.state}</h2>  
       
       <h2>{address.phoneNumber}</h2>     
       </div>
     </div>
     <div>

     </div>
    </div>
  );
}
export default Buyproduct