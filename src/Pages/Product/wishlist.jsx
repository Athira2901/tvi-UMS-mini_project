import React, { useEffect, useState } from 'react'
import products from "../../assets/products.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Userviewproduct from './Userviewproducts';
import { FaHeart } from "react-icons/fa6";

function Wishlist() {
    const [wishl, setWishl] = useState([])
    const [open, setOpen] = useState(false);
  const [vid, setVid] = useState("")
    const user1 = useSelector((store) => store.auth.user);
    let details = localStorage.getItem("user");
     
  function handleOpen(id){
    setVid(id)
    setOpen(true)
  }
    useEffect(()=>{
       axios.get("http://localhost:8000/api/wishlist",{
        headers: {
            Authorization: user1 || details,
            genericvalue: "agent",
          },
       })
       .then((response)=>{
        console.log(response)
        setWishl(response.data.wishlistItems)
       })
    },[])
  return (
    <div
     
      className="flex  flex-col justify-center border w-full "
    >
       {open ? (<Userviewproduct open={open} page={"wishlist"} setOpen={setOpen} vid={vid}/>) : ""}
      <div className="flex flex-wrap justify-center   w-full">
        {wishl.map((li) => (
          <div
          onClick={()=>handleOpen(li._id)}
          className="border border-gray-400 relative hover:scale-[1.08] w-[230px] m-[10px] flex flex-col items-center p-[60px] rounded-lg cursor-pointer bg-gradient-to-r from-[#eeaeca] to-[#9f94e9] shadow-3xl border-none"
          >
            <div className="absolute top-2 right-2" 
            // onClick={() => wishlist(li._id)}
            >
             
                <FaHeart color="red" />
              
            </div>
            <img src={products} alt="pdct" className="w-[100px] " />
            <div className="flex  flex-col ">
              <h1 className="pt-5">{li.productName}</h1>
              <h5 className="text-[grey] ">${li.productPrice}</h5>
            </div>
          </div>
        ))}
      </div>
      
    </div>
  )
}

export default Wishlist