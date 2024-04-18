import React, { useEffect, useState } from 'react';
import products from '../../assets/products.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Userviewproduct from './Userviewproducts';
import { FaRupeeSign } from 'react-icons/fa';
import cartimage from "../../assets/cartempty.png"
import { CiCircleInfo } from "react-icons/ci";
function Cartlist(props) {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [vid, setVid] = useState('');
  const [discountsum, setDiscountsum] = useState(0)
  const [originalsum, setOriginalsum] = useState(0)
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem('user');

  function handleOpen(id) {
    setVid(id);
    setOpen(true);
  }

  function cartapi() {
    axios
      .get('http://localhost:8000/api/cart', {
        headers: {
          Authorization: user1 || details,
          genericvalue: 'agent',
        },
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        setCart(response.data.results[0].results);
      });
  }

  useEffect(() => {
    cartapi();
    console.log('-------', props.singleaddr);
  }, []);
 function shopnow(){
  props.click("product")
 }
  return (
    <div className="flex flex-col justify-center border w-full">
      {open ? (
        <Userviewproduct
          open={open}
          click={props.click}
          page={'cartlist'}
          setOpen={setOpen}
          cartapi={cartapi}
          vid={vid}
        />
      ) : (
        ''
      )}
      {cart.length === 0 ? (
        <div className="flex items-center justify-center  bg-[#F0F0F0]">
        <div className="flex flex-col items-center">
          <img src={cartimage} className="h-[200px] w-[200px]" alt="Cart" />
          <p className="text-center text-2xl text-[red] mt-5">Your cart is empty!</p>
          <div className='text-[grey] mt-3'>
          <p>Looks like you haven't made</p>
          <p className='ml-[60px]'>your choice</p>
        </div>
          <button onClick={shopnow} className="bg-[#0000ff] hover:bg-[#0040ff] text-white w-[150px] h-[40px] rounded-lg mt-5">
            Shop now
          </button>
        </div>
      </div>
      
      ) : (
        <div className="flex flex-wrap justify-center w-full h-[60vh] overflow-scroll pt-5">
          {cart.map((li) => {
          
              if(discountsum==0){
              setDiscountsum(dsum=>dsum += li.discountedPrice)
              setOriginalsum(osum=>osum+=li.price )
              }
            if (li.image.length > 0) {
              var imagepath = li.image[0];
              var imgUrl = imagepath
                ? `data:image/jpeg;base64,${imagepath}`
                : products;
            }

            return (
              <div
                onClick={() => handleOpen(li.productId)}
                className="border border-gray-400 hover:scale-[1.08] w-[230px] h-[280px] p-[40px] m-[10px] flex flex-col items-center  rounded-lg cursor-pointer bg-[#D8D8D8] shadow-2xl border-none"
                key={li.productId}
              >
                {li.image.length > 0 ? (
                  <img src={imgUrl} alt="pdct" className="w-[100px] " />
                ) : (
                  <img src={products} alt="pdct" className="w-[100px] " />
                )}
                <div className="flex flex-col">
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
            );
          })}
        </div>
      )}
      {cart.length !== 0 && (
        <div className="flex">
          <div className="mt-2">
          <p className="line-through text-[grey] text-md ">{originalsum}</p>
          <div className="flex gap-2">
          <p className=" text-xl">{discountsum}</p>
             <div className="text-[grey] mt-2">
                  <CiCircleInfo />
                </div>
           </div>
          </div>
          <div className="flex justify-center bg-[darkorange] hover:bg-[orange] w-[180px] h-[40px] rounded-md mt-5 ml-[800px]">
            <button onClick={() => props.click('buyproduct', '', cart, '')}>
              PLACE ORDER
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cartlist;
