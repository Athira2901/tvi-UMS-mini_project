import React, { useEffect, useState } from 'react'
import products from "../../assets/products.png";
import { useSelector } from 'react-redux';
import axios from 'axios';
import Userviewproduct from './Userviewproducts';
import { FaRupeeSign } from "react-icons/fa";
function Cartlist(props) {
    const [cart, setCart] = useState([])
    const [open, setOpen] = useState(false);
  const [vid, setVid] = useState("")
    const user1 = useSelector((store) => store.auth.user);
    let details = localStorage.getItem("user");
     
  function handleOpen(id){
    setVid(id)
    setOpen(true)
  }
  function  cartapi(){
    axios.get("http://localhost:8000/api/cart",{
      headers: {
          Authorization: user1 || details,
          genericvalue: "agent",
        },
     })
     .then((response)=>{
      console.log(response)
      console.log(response.data)
      setCart((response.data.results[0].results))
     })
  }
    useEffect(()=>{
      cartapi()
      console.log('-------',props.singleaddr)
    },[])
    function gotocart(){

    }
    
  return (
    <div
     
      className="flex  flex-col justify-center border w-full "
    >
       {open ? (<Userviewproduct open={open} click={props.click} page={"cartlist"} setOpen={setOpen} cartapi={cartapi} vid={vid}/>) : ""}
      <div className="flex flex-wrap justify-center   w-full h-[60vh] overflow-scroll pt-5">
        {cart?.map((li) => {
           if (li.image.length > 0) {
          
            var imagepath=li.image[0]
            var imgUrl = imagepath
              ? `data:image/jpeg;base64,${imagepath}`
              : products;

            // console.log(i, base64String);
          
          }
        
         return(
          <div
          onClick={()=>handleOpen(li.productId)}
          className="border border-gray-400 hover:scale-[1.08] w-[230px] m-[10px] flex flex-col items-center p-[60px] rounded-lg cursor-pointer bg-gradient-to-r from-[#eeaeca] to-[#9f94e9] shadow-3xl border-none"
          >
            {li.image.length > 0 ? (
            <img src={imgUrl} alt="pdct" className="w-[100px] " />
            ) : (
              <img src={products} alt="pdct" className="w-[100px] " />
            )}
              <div className="flex  flex-col ">
                  <p className="pt-3 text-lg text-center hover:text-[grey]">
                    {li.title}
                  </p>
                  <div className="flex gap-3">
                    <h1 className="text-xl mt-2 flex items-center ">
                      <FaRupeeSign className="mr-1" />
                      {li.discountedPrice}
                    </h1>
                    <p className="text-md mt-2 flex items-center line-through text-[#878787]">
                      <FaRupeeSign className="mr-1" />
                      {li.price}
                    </p>
                  </div>
                  <p className="text-md mt-2 flex items-center text-[#388E3C] justify-center italic">
                    {li.offer} % off
                  </p>
                </div>
          </div>
         )
        })}
      </div>
      <div className='flex'>
        <p className='mt-5'>price</p>
      <div className='flex justify-center bg-[darkorange] hover:bg-[orange] w-[180px] h-[40px] rounded-md mt-5 ml-[800px]'>
      <button onClick={()=>props.click("buyproduct","",cart,"")}>PLACE ORDER</button>
      </div>
      </div>
    </div>
  )
}

export default Cartlist