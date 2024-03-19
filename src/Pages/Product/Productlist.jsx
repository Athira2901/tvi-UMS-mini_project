import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import products from "../../assets/products.png";
import axios from "axios";
import PaginationSize from "../../Components/Pagination";
// import { useNavigate } from "react-router-dom";
function Productlist() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  // const navigate = useNavigate();
  function cart(n=1) {
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
      });
  }

  useEffect(()=>{
    cart()
  },[])

  function cpage(num){
    cart(num)
  }
  return (
    <div className="flex  flex-col justify-center border  ">
      <div className="flex flex-wrap justify-center   w-full">
      {list.map((li) => (
        <div className="border border-gray-400  w-[230px] m-[10px] flex flex-col items-center p-[60px] rounded-lg cursor-pointer bg-gradient-to-r from-[#eeaeca] to-[#9f94e9] shadow-3xl border-none">
          <img src={products} alt="pdct" className="w-[100px] " />
          <div className="flex  flex-col ">
            <h1 className="pt-5">{li.productName}</h1>
            <h5 className="text-[grey] ">${li.productPrice}</h5>
          </div>
        </div>
        
      ))}
      </div>
      <div className="flex justify-center mt-3">
      <PaginationSize cpage={cpage} total={total} />
      </div>
    </div>
  );
}

export default Productlist;
