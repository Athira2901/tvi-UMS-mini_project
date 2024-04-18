import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import products from "../../assets/products.png";
import axios from "axios";
import PaginationSize from "../../Components/Pagination";
import Userviewproduct from "./Userviewproducts";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRupeeSign } from "react-icons/fa";

function Userproductlist(props) {
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);
  const [open, setOpen] = useState(false);
  const [vid, setVid] = useState("");
  const [like, setLike] = useState([]);
  const [image, setImage] = useState("");

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
        console.log("answer=",response);
        setTotal(response.data.totalCount);
        setList(response.data.products);
        console.log(response);
        axios
          .get("http://localhost:8000/api/wishlist", {
            headers: {
              Authorization: user1 || details,
              genericvalue: "agent",
            },
          })
          .then((response) => {
            console.log(response);
            const wishlis = response.data.result[0].results;
            wishlis.map((wish) => {
              setLike((prev) => [...prev, wish._id]);
            });
          });
      });
  }

  useEffect(() => {
    cart();
  }, []);

  function cpage(num) {
    cart(num);
  }

  function wishlist(id) {
    // const LikedItem = like.includes(id)
    //   ? like.filter((item) => item !== id)
    //   : like.concat(id);
    // setLike(LikedItem);
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
        cart();
        console.log(response);
      });
    setLike(LikedItem); // Update the like state immediately
  }
  function removeWish(id) {
    axios
      .delete("http://localhost:8000/api/delete-wishist/" + id, {
        headers: {
          Authorization: user1 || details,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        const LikedItem = like.includes(id)
           ? like.filter((item) => item !== id)
         : like.concat(id);
         setLike(LikedItem);
        cart();
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
          click={props.click}
        />
      ) : (
        ""
      )}
      <div className="flex flex-wrap justify-center gap-[50px]  w-full h-[60vh] overflow-scroll pt-5">
        {list.map((li, i) => {
          if (li.image.length > 0) {
            const base64String = li.image[0].data
              ? btoa(String.fromCharCode(...new Uint8Array(li.image[0].data)))
              : null;
            var imgUrl = base64String
              ? `data:image/jpeg;base64,${base64String}`
              : products;

            // console.log(i, base64String);
            // console.log(imgUrl)
          }
          return (
            <div
              key={li._id}
              className="border shadow-lg  hover:shadow-2xl hover:scale-[1.03] border-gray-400 relative w-[230px] h-[280px] m-[10px] flex flex-col items-center gap-5 rounded-lg cursor-pointer bg-[#D8D8D8] shadow-3xl border-none"
            >
              <div className="absolute top-2 right-2">
                {like.includes(li._id) ? (
                  <div onClick={() => removeWish(li._id)}>
                    <FaHeart color="red" />
                  </div>
                ) : (
                  <div onClick={() => wishlist(li._id)}>
                    <FaRegHeart />
                  </div>
                )}
              </div>
              <div
                onClick={() => handleOpen(li._id)}
                className=" h-full w-full mt-[30px] flex flex-col items-center  justify-center"
              >
                {li.image.length > 0 ? (
                  <img src={imgUrl} alt="Product" className="w-[100px]" />
                ) : (
                  <img src={products} alt="pdct" className="w-[100px]" />
                )}
                {/* <img
                  src={imgUrl }
                  alt="product"
                  className="w-[100px]"
                /> */}
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

export default Userproductlist;
