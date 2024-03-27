
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import  {useState } from 'react';
import products from "../../assets/products.png";
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
import { useEffect } from 'react';

import Editpdct from './Editproduct';
import { HiShoppingCart } from "react-icons/hi";
import { BsFillLightningFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height:"80vh",
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  
};

export default function Userviewproduct(props) {

  const [open, setOpen] = React.useState(false);
  const [viewpdct, setViewpdct] = useState({})
  const[count,setCount] =useState(1)
  // const handleOpen = () => setOpen(true);
  const handleClose = () => props.setOpen(false);
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  function Viewpdct(){
    axios.get("http://localhost:8000/api/get-one/"+props.vid,{
      headers:{
        Authorization: user1 || details,
        genericvalue: "admin",
      }
    }).then((response)=>{
      setViewpdct(response.data.result)
    //   console.log(viewpdct)
    })
  }
  useEffect(()=>{
    console.log(props.page)
    Viewpdct()
  },[])
  
 function addtocart(id){
   setCount(count+1)
   console.log(count)
    axios.post("http://localhost:8000/api/add-to-cart/"+id,{},{
        headers:{
            Authorization: user1 || details,
            genericvalue: "agent",
          }

    }).then((response)=>console.log(response))
 }
 function removecart(id){
         axios.delete("http://localhost:8000/api/delete-cart/"+id,{
          headers:{
            Authorization: user1 || details,
            genericvalue: "agent",
          }
         }).then((response)=>{
          console.log(response)
         })
 }
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
          {/* <Typography id="modal-modal-title" variant="h6" className='text-center' component="h1">
            View Product Details
          </Typography> */}
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='flex justify-between gap-4 '>
           {/* {console.log(viewpdct)} */}
           <img src={products} className='h-40 mt-5 '/>
           <div className='flex flex-col mt-4 text-justify '>
           <h1 className='text-4xl  '>{viewpdct.productName}</h1>
           <h1 className='text-2xl mt-2 flex  '><FaRupeeSign />{viewpdct.productPrice}</h1>
           <h1 className='text-lg mt-2 '>Category:{viewpdct.category}</h1>
           <h1 className='text-lg mt-2 '>Quantity:{viewpdct.stock}</h1>
           <h1 className='text-sm mt-2  text-justify  overflow-auto'>Description:{viewpdct.productDetails}</h1>
           <div className='flex justify-center mt-[30px] '>
             {props.page == "cartlist"?(
                  <div className='flex items-center gap-2 bg-[red]  text-white font-bold py-2 px-3 rounded mr-4'>
                <MdDelete />
                     <button onClick={()=>removecart(viewpdct._id)}  >Remove</button>
                 </div>
             ):(

             <div className='flex items-center gap-2 bg-[#FF9F00]  text-white font-bold py-2 px-3 rounded mr-4'>
             <HiShoppingCart />
                <button onClick={()=>addtocart(viewpdct._id)}  >ADD TO CART</button>
            </div>)}
            <div  className='flex items-center gap-2 bg-[#ff671b]  text-white font-bold py-3 px-[30px] rounded '>
                <BsFillLightningFill />
                <button >BUY NOW</button>
                </div>
               </div>
           </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
