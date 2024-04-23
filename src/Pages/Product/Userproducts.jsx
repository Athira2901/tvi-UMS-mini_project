import React from "react";
import Navbar from "../../Components/Navbar";
import Sidebar from "../../Components/Sidebar";
import { useState } from "react";
import Productlist from "./Productlist";
import { useNavigate } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import Viewproduct from "./Viewproduct";
import Userproductlist from "./Userproductlist";
import Usersidebar from "../../Components/Usersidebar";
import Usernavbar from "../../Components/Usernavbar";
import Userdetails from "../Userdetails";
import Cartlist from "./Cartlist";
import Wishlist from "./wishlist";
import Buyproduct from "./Buyproduct";
import Addresslist from "./Addresslist";
import Addaddress from "./Address/Addaddress";
import Orderproduct from "./Order/Orderproduct";
function Userproduct() {
  const [ishide, setIshide] = useState(false);
  const [dat, setDat] = useState("");
  const [viewid, setViewid] = useState("");
  const [products, setProducts] = useState({});
  const [singleaddr, setSingleaddr] = useState({});

  const [userviewproduct, setUserviewproduct] = useState("")
   function handleclick() {
    setIshide((current) => !current);
  }
  function click(msg, viewid, product, singleaddress,page) {
    console.log("**++=========", msg, viewid, product, singleaddress);
    setDat(msg)
    setViewid(viewid);
    setProducts(product);
    setUserviewproduct(page);
    setSingleaddr(singleaddress);
    console.log("helloo=",singleaddress)
  }

  const navigate = useNavigate();
  function Add() {
    console.log("fgfgf");
    navigate("/add");
  }
  return (
    <div className="overflow-scroll h-screen">
      <div className="fixed z-10 w-[1309px]">
        <Usernavbar handleclick={handleclick} />
      </div>
      <div className="flex w-full  relative top-[56px]">
        <div
          className={`transition-all duration-500 ${
            ishide ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
          <Usersidebar click={click} />
        </div>
        {dat == "userdetails" ? (
          <div className="w-full">
            <Userdetails />
          </div>
        ) : dat == "cartlist" ? (
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl"> Cart</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                cart
              </h6>
            </div>
            <div className="p-5 w-full">
              <Cartlist click={click} singleaddr={singleaddr} products={products}/>
            </div>
          </div>
        ) : dat == "wishlist" ? (
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">WishList</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                wishlist
              </h6>
            </div>
            <div className="p-5 w-full">
              <Wishlist click={click} />
            </div>
          </div>
        ) : dat == "buyproduct" ? (
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">Order Summary</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                order summary
              </h6>
              <div className="bg-[grey] flex items-center p-5 w-[100px] h-[40px]  text-center  rounded-lg  hover:text-[white] mr-[70px]">
        <button >BACK</button>
      </div>
            </div>
            <div className="p-5 w-full">
              <Buyproduct
                click={click}
                viewid={viewid}
                products={products}
                singleaddr={singleaddr}
                userviewproduct={userviewproduct}

                
              />
            </div>-
          </div>
        ) : dat == "addresslist" ? (
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">Address</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                address
              </h6>
            </div>
            <div className="p-5 w-full">
              <Addresslist
                click={click}
                products={products}
                singleaddr={singleaddr}
                userviewproduct={userviewproduct}
              />
            </div>
          </div>
        ) : dat == "addaddress" ? (
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">Add Delivery address</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                add delivery address
              </h6>
            </div>
            <div className="p-5 w-full flex justify-center">
              <Addaddress click={click} />
            </div>
          </div>
        ) : dat == "orderproduct" ? (
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">Orders</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                orders
              </h6>
            </div>
            <div className="p-5 w-full">
              <Orderproduct />
            </div>
          </div>
        ):(
          <div className="w-full">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">Product List</h1>
            </div>
            <div className="flex items-center justify-between">
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3 w-full">
                productlist
              </h6>
            </div>
            <div className="p-5 w-full">
              <Userproductlist click={click} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Userproduct;
