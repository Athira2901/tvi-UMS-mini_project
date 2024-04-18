import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import products from "../../assets/products.png";
import axios from "axios";
import PaginationSize from "../../Components/Pagination";
// import { useNavigate } from "react-router-dom";
import Viewproduct from "./Viewproduct";
import { FaRupeeSign } from "react-icons/fa";
function Productlist() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [vid, setVid] = useState("")
 
  function handleOpen(id){
    setVid(id)
    setOpen(true)
  }
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  // const navigate = useNavigate();
  function cart(n = 1) {
    axios
      .get(`http://localhost:8000/api/getProdt?page=${n}`, {
        headers: {
          Authorization: user1 || details,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        setTotal(response.data.totalCount);
        setList(response.data.products);
        console.log(response);

      });
  }

 

  useEffect(() => {
    cart();
   
  }, []);

  function cpage(num) {
    cart(num);
  }
 
  return (
    <div
     
      className="flex  flex-col justify-center border w-full "
    >
        {open ? (<Viewproduct open={open} cart={cart} setOpen={setOpen} vid={vid}/>) : ""}
      <div className="flex flex-wrap justify-center   w-full">
        {list.map((li) => {
          if(li.image.length > 0){
            const base64String = li.image[0].data
            ? btoa(String.fromCharCode(...new Uint8Array(li.image[0].data)))
            : null;
          var imgUrl = base64String
            ? `data:image/jpeg;base64,${base64String}`
            : products;

          }
          return(
          <div
           onClick={()=>handleOpen(li._id)}
          key={li._id}
          className="border border-gray-400 hover:scale-[1.03]  w-[250px] h-[300px] p-[60px] m-[10px] flex flex-col items-center  rounded-lg cursor-pointer bg-[#D8D8D8] shadow-3xl border-none"
          >
            {li.image.length > 0 ? (
            <img src={imgUrl} alt="pdct" className="w-[100px] " />
            ) : (
              <img src={products} alt="pdct" className="w-[100px]" />
            )}
            <div className="flex  flex-col ">
              <p className="pt-3 text-lg text-center hover:text-[grey]">{li.title}</p>
              <div className='flex gap-3'>
              <h1 className="text-xl mt-2 flex items-center "><FaRupeeSign className="mr-1" />{li.discountedPrice}</h1>
              <p className="text-md mt-2 flex items-center line-through text-[#878787]"><FaRupeeSign className="mr-1" />{li.price}</p>

              </div>
              <p className="text-md mt-2 flex items-center text-[#388E3C] justify-center italic">{li.offer} % off</p>
            </div>
          </div>
          );
            })}
      </div>
      <div className="flex justify-center mt-3">
        <PaginationSize cpage={cpage} total={total} />
      </div>
    </div>
  );
}

export default Productlist;
