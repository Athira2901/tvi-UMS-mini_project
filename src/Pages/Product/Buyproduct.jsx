import React, { useEffect, useState } from "react";
import axios from "axios";
import products from "../../assets/products.png";
import { useSelector } from "react-redux";
import { BiDownArrowAlt } from "react-icons/bi";
import { FaRupeeSign } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Orderconfirm from "./Order/Orderconfirm";
import Singleorder from "./Order/Singleorder";

function Buyproduct(props) {
  const [address, setAddress] = useState([]);
  const user1 = useSelector((store) => store.auth.user);
  const [imgUrl, setImgUrl] = useState([]);
  const [quantity, setQuantity] = useState(1);
  let details = localStorage.getItem("user");
  const [cart, setCart] = useState([])
  const [discountsum, setDiscountsum] = useState(0)
  const [originalsum, setOriginalsum] = useState(0)
  const [discount, setDiscount] = useState(0)
  function getaddress() {
    axios
      .get("http://localhost:8000/api/address-view", {
        headers: {
          Authorization: user1 || details,
          genericvalue: "agent",
        },
      })
      .then((response) => {
        props.singleaddr
        ? setAddress(props.singleaddr):
         setAddress(response.data.result[0].address[0]);
        if (props.products.image.length > 0) {
          const base64String = btoa(
            String.fromCharCode(...new Uint8Array(props.products.image[0].data))
          );
          setImgUrl(base64String);
        }
        props.singleaddr
          ? setAddress(props.singleaddr):
           setAddress(response.data.result[0].address[0]);
      });
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
  
  useEffect(() => {
    cartapi()
    setAddress(props.singleaddr);
    getaddress();
   
  }, []);
  
  
  function multiplyquantity(e) {
    setQuantity(parseInt(e.target.value));
  }
  
  return (
    
    <div className="flex flex-col justify-center border w-full ">
      <ToastContainer />
      <div className="h-[430px] overflow-scroll">
        <div className="mt-3 ml- italic shadow-xl">
          <div className="flex justify-between mt-3 ">
            <h1 className="text-xl"> Deliver to:</h1>
            <div
              onClick={(e) =>
                props.click("addresslist", "", props.products, "",props.userviewproduct)
              }
              className="border border-[grey] w-[130px] h-[30px] text-center text-[blue] rounded-md"
            >
              <button>CHANGE</button>
            </div>
          </div>
          <h1 className="text-xl mt-3">{address?.fullName}</h1>
          <div className="mt-2">
            <div className="flex ">
             
              <h2>{address?.buildingName},</h2>
              <h2>{address?.landmark},</h2>
              <h2>{address?.area}</h2>
            </div>
            <div className="flex ">
              <h2>{address?.city},</h2>
              <h2>{address?.pincode}</h2>
            </div>
            <h2>{address?.state}</h2>

            <h2>{address?.phoneNumber}</h2>
          </div>
        </div>
        {props.userviewproduct=="userview" ? (
          <div className="mt-3  shadow-xl">
            <div className="flex justify-between mt-3 ">
              <div className="">
                <h1 className="text-2xl"> Product</h1>
                <div className="flex gap-5 ">
                  <div>
                    {imgUrl.length > 0 ? (
                      <img
                        src={`data:image/png;base64,${imgUrl}`}
                        className="h-40 mt-5 "
                      />
                    ) : (
                      <img src={products} className="h-40 mt-5 " />
                    )}
                    <select name="Qty:" id="no" onChange={multiplyquantity}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div>
                    <h1 className="text-3xl mt-5">{props.products.title}</h1>
                    <div className="flex mt-3 items-center ">
                      <div className="flex text-[darkgreen]">
                        <BiDownArrowAlt className="mt-1" />
                        <p>{props.products.offer}%</p>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex line-through ml-3 text-[grey]">
                          <FaRupeeSign className="mt-1 " />
                          <p>{props.products.price * quantity}</p>
                        </div>
                        <div className="flex">
                          <FaRupeeSign className="mt-1" />
                          <p>{props.products.discountedPrice * quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 shadow-xl rounded-md p-4 bg-white">
          <h1 className="text-2xl font-semibold mb-4">Products</h1>
          <div className="flex flex-col sm:grid-cols-2 gap-4">
            {cart.map((item, index) =>{
              if(discountsum==0){
              setDiscountsum(dsum=>dsum += item.discountedPrice * quantity)
              setOriginalsum(osum=>osum+=item.price * quantity)
              setDiscount(dis=>dis+= (item.price - item.discountedPrice) *
                quantity)
              }
              return(
              <div key={index} className="border rounded-md p-4">
                <div className="flex gap-5">
                  <div>
                    <img
                      src={item.image.length > 0 ? `data:image/jpeg;base64,${item.image[0]}` : products}
                      alt={item.title}
                      className="w-24 sm:w-32"
                    />
                    <select
                      name="Qty:"
                      id="no"
                      onChange={multiplyquantity}
                      className="mt-2 border rounded-md px-2 py-1"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-semibold">{item.title}</h1>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center text-darkgreen">
                        <BiDownArrowAlt className="mr-1" />
                        <p>{item.offer}%</p>
                      </div>
                      <div className="flex ml-3">
                        <div className="flex line-through text-gray-500">
                          <FaRupeeSign className="mt-1 mr-1" />
                          <p>{item.price * quantity}</p>
                        </div>
                        <div className="flex ml-3">
                          <FaRupeeSign className="mt-1 mr-1" />
                          <p>{item.discountedPrice * quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
        
        )}
          {props.userviewproduct=="userview" ? (
        <div className="mt-3  shadow-xl">
          <div className="flex justify-between mt-3 ">
            <div>
              <h1 className="text-2xl"> Price Details</h1>
              <div className="flex justify-between  ">
                <p>Price</p>
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p>{props.products.price * quantity}</p>
                </div>
              </div>
              <div className="flex justify-between ">
                <p>Discount</p>
                <div className="flex text-[darkgreen]">
                  <FaRupeeSign className="mt-1" />
                  <p>
                    -
                    {(props.products.price - props.products.discountedPrice) *
                      quantity}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-2 border border-b-gray-300 ">
                <p>Delivery Charges</p>
                <div className="flex line-through ml-[490px] ">
                  <FaRupeeSign className="mt-1 text-[grey]" />
                  <p className="text-[grey]">40 </p>
                </div>
                <p className="text-[darkgreen] ">FREE Delivery</p>
              </div>
              <div className="flex items-center mb-1 justify-between border border-b-gray-300 mt-2 h-[40px] ">
                <h1 className="text-lg">Total Amount</h1>
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p>{props.products.discountedPrice * quantity}</p>
                </div>
              </div>
              <div className="flex text-[darkgreen] gap-2 mt-5 ml-[250px] italic">
                <p>You will save</p>
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p>
                    {(props.products.price - props.products.discountedPrice) *
                      quantity}
                  </p>
                </div>
                <p>on this order</p>
              </div>
              <div className="bg-[darkorange] w-[140px] h-[40px] text-center hover:bg-[orange]  flex justify-center  rounded-md ml-[400px] mt-5">
                {/* <button onClick={singlepdctorder}>Place order</button> */}
                <Singleorder/>
              </div>
            </div>
          </div>
        </div>
        ):(
           <div  className="mt-3  shadow-xl">
        <div className="flex justify-between mt-3 ">
          <div>
            <h1 className="text-2xl"> Price Details</h1>
            <div className="flex justify-between  ">
                <p>Price</p>
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p>{originalsum}</p>
                </div>
              </div>
              <div className="flex justify-between ">
                <p>Discount</p>
                <div className="flex text-[darkgreen]">
                  <FaRupeeSign className="mt-1" />
                  <p>
                    -
                    {discount}
                  </p>
                </div>
              </div>
              <div className="flex justify-between gap-2 border border-b-gray-300 ">
                <p>Delivery Charges</p>
                <div className="flex line-through ml-[490px] ">
                  <FaRupeeSign className="mt-1 text-[grey]" />
                  <p className="text-[grey]">40 </p>
                </div>
                <p className="text-[darkgreen] ">FREE Delivery</p>
              </div>
              <div className="flex items-center mb-1 justify-between border border-b-gray-300 mt-2 h-[40px] ">
                <h1 className="text-lg">Total Amount</h1>
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p>{discountsum}</p>
                </div>
              </div>
              <div className="flex text-[darkgreen] gap-2 mt-5 ml-[250px] italic">
                <p>You will save</p>
                <div className="flex">
                  <FaRupeeSign className="mt-1" />
                  <p>
                  {discount}
                  </p>
                </div>
                <p>on this order</p>
              </div>
    
        </div>
        </div>
        <div className="bg-[darkorange] w-[140px] h-[40px] text-center hover:bg-[orange]  flex justify-center  rounded-md ml-[400px] mt-5">
                
                <Orderconfirm/>
              </div>
        </div>
            )}
      </div>
      
    </div>
  );
}
export default Buyproduct;
