import React, { useEffect, useState } from 'react'
import products from "../../assets/products.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Userviewproduct from './Userviewproducts';
import { FaHeart } from "react-icons/fa6";
import wishlist from "../../assets/wishlist.webp"

function Wishlist(props) {
    const [wishl, setWishl] = useState([])
    const [open, setOpen] = useState(false);
  const [vid, setVid] = useState("")
    const user1 = useSelector((store) => store.auth.user);
    let details = localStorage.getItem("user");
     
  function handleOpen(id){
    setVid(id)
    setOpen(true)
  }
  function wishlistapi(){
    axios.get("http://localhost:8000/api/wishlist",{
      headers: {
          Authorization: user1 || details,
          genericvalue: "agent",
        },
     })
     .then((response)=>{
      console.log(response)
      setWishl((response.data.result[0].results)||[])
     })
  }
    useEffect(()=>{
      wishlistapi()
    },[])
    function shopnow(){
      props.click("product")
     }
  return (
    <div
     
      className="flex  flex-col justify-center border w-full "
    >
       {open ? (<Userviewproduct open={open} click={props.click} page={"wishlist"} wishlistapi={wishlistapi} setOpen={setOpen} vid={vid}/>) : ""}
       {wishl.length === 0 ? (
        <div className="flex items-center justify-center  bg-[#F0F0F0]">
        <div className="flex flex-col items-center">
          <img src={wishlist} className="h-[200px] w-[200px]" alt="Cart" />
          <h1 className="text-center text-2xl text-[red] ">Your Wishlist is empty!</h1>
          <div className='mt-3 text-[#008ae6]'>
          <p>seems like you don't have wishes here</p>
          <p className='ml-[90px]'>Make a wish !</p>
          </div>
          <p></p>
          <button onClick={shopnow} className="bg-[#006bb3] hover:bg-[#0040ff] text-white w-[170px] h-[40px] rounded-lg mt-5">
            Start Shopping
          </button>
        </div>
      </div>
       ) : (
      <div className="flex flex-wrap justify-center   w-full h-[60vh] overflow-scroll pt-5">
        {wishl.map((li) => {
           if (li.image.length > 0) {
            // console.log(li.image[0])
            var imagepath=li.image[0]
            var imgUrl = imagepath
              ? `data:image/jpeg;base64,${imagepath}`
              : products;

            // console.log(i, base64String);
          
          }
         return(
          <div
          onClick={()=>handleOpen(li._id)}
          className="border border-gray-400 relative hover:scale-[1.08] w-[230px] h-[280px] p-[60px] m-[10px] flex flex-col items-center  rounded-lg cursor-pointer bg-[#D8D8D8] shadow-3xl border-none"
          >
            <div className="absolute top-2 right-2" 
            // onClick={() => wishlist(li._id)}
            >
             
                <FaHeart color="red" />
              
            </div>
            {li.image.length > 0 ? (
            <img src={imgUrl} alt="pdct" className="w-[100px] " />
            ) : (
              <img src={products} alt="pdct" className="w-[100px] " />
            )}
            <div className="flex  flex-col ">
              <h1 className="pt-5">{li.title}</h1>
              <h5 className="text-[grey] ">${li.price}</h5>
            </div>
          </div>
         )
        })}
      </div>
       )}
    </div>
  )
}

export default Wishlist