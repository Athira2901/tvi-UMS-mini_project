import React from 'react'
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import products from "../../../assets/products.png";
import { FaRupeeSign } from "react-icons/fa";
function Orderproduct() {

    const [order, setOrder] = useState([])
    const user1 = useSelector((store) => store.auth.user);
    let details = localStorage.getItem("user");
   function orders(){
        axios.get("http://localhost:8000/api/order-productlist",{
            headers: {
                Authorization: user1 || details,
                genericvalue: "agent",
              },
        }).then((response)=>{
            console.log("result",response.data.results)
            setOrder(response.data.results)
        })
   }
   useEffect(()=>{
    orders()
   },[])
  return (
    <div className="flex flex-col justify-center border w-full">
   
    <div className="flex flex-wrap justify-center gap-[50px]  w-full h-[60vh] overflow-scroll pt-5">
      {order.map((li, i) => {
        {console.log("li",li.product.image[0])}
        if (li.product.image) {
            // console.log(li.image[0])
            var imagepath=li.product.image[0]
            var imgUrl = imagepath
              ? `data:image/jpeg;base64,${imagepath}`
              : products;

            // console.log(i, base64String);
          
        }
        return (
          <div
            key={li._id}
            className="border shadow-lg  hover:shadow-2xl hover:scale-[1.03] border-gray-400 relative w-[230px] h-[280px] m-[10px] flex flex-col items-center gap-5 rounded-lg cursor-pointer bg-[#D8D8D8] shadow-3xl border-none"
          >
          
            <div
            
              className=" h-full w-full mt-[30px] flex flex-col items-center  justify-center"
            >
             {li.product.image ? (
            <img src={imgUrl} alt="pdct" className="w-[100px] " />
            ) : (
              <img src={products} alt="pdct" className="w-[100px] " />
            )}
             
              <div className="flex  flex-col ">
                <p className="pt-3 text-lg text-center hover:text-[grey]">
                  {li.product.title}
                </p>
                <div className="flex gap-3">
                  <h1 className="text-xl mt-2 flex items-center ">
                    <FaRupeeSign className="mr-1" />
                    {li.product.discountedPrice}
                  </h1>
                  <p className="text-md mt-2 flex items-center line-through text-[#878787]">
                    <FaRupeeSign className="mr-1" />
                    {li.product.price}
                  </p>
                </div>
                <p className="text-md mt-2 flex items-center text-[#388E3C] justify-center italic">
                  {li.product.offer} % off
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    
  </div>
);
}

export default Orderproduct