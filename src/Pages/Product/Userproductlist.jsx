
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import products from "../../assets/products.png";
import axios from "axios";
import PaginationSize from "../../Components/Pagination";
import Userviewproduct from "./Userviewproducts";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

function Userproductlist() {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [vid, setVid] = useState("");
  const [like, setLike] = useState([]);
  const [image,setImage]=useState("")
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");

  function handleOpen(id) {
    setVid(id);
    setOpen(true);
  }

  function cart(n = 1) {
    axios
      .get(`http://localhost:8000/api/getProdt?page=${n}`, {
        headers: {
          Authorization: user1 || details,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        console.log(response);
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

  function wishlist(id) {
    const LikedItem = like.includes(id)
      ? like.filter((item) => item !== id)
      : like.concat(id);
    setLike(LikedItem);
    axios
      .post(
        "http://localhost:8000/api/add-to-wishlist/" + id,
        {},
        {
          headers: {
            Authorization: user1 || details,
            genericvalue: "agent",
          },
        }
      )
      .then((response) => {
        console.log(response);
      });
  }

  return (
    <div className="flex flex-col justify-center border w-full">
      {open ? (
        <Userviewproduct
          open={open}
          cart={cart}
          page={"products"}
          setOpen={setOpen}
          vid={vid}
        />
      ) : (
        ""
      )}
      <div className="flex flex-wrap justify-center gap-[50px]  w-full h-[60vh] overflow-scroll pt-5">
        {list.map((li) => (
          <div
            key={li._id}
            className="border shadow-lg  hover:shadow-2xl hover:scale-[1.03] border-gray-400 relative w-[230px] h-[280px] m-[10px] flex flex-col items-center gap-5 rounded-lg cursor-pointer bg-gradient-to-r from-[#eeaeca] to-[#9f94e9] shadow-3xl border-none"
          >
            <div className="absolute top-2 right-2" onClick={() => wishlist(li._id)}>
              {like.includes(li._id) ? (
                <FaHeart color="red" />
              ) : (
                <FaRegHeart />
              )}
            </div>
            <div onClick={() => handleOpen(li._id)} className=" h-full w-full mt-[30px] flex flex-col items-center  justify-center">
              {li.image ? (
                <img
                  src={`data:image/png;base64,${li.image}`}
                  alt="Product"
                  className="w-[100px]"
                />
              ) : (
                <img
                  src={products}
                  alt="pdct"
                  className="w-[100px]"
                />
              )}
              <div className="flex  flex-col ">
                <h1 className="pt-5">{li.productName}</h1>
                <h5 className="text-[grey] ">${li.productPrice}</h5>
              </div>
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

export default Userproductlist;
