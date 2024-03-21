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
import { MdDelete } from "react-icons/md";
import Editpdct from './Editproduct';
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

export default function Viewproduct(props) {

  const [open, setOpen] = React.useState(false);
  const [viewpdct, setViewpdct] = useState({})
  // const handleOpen = () => setOpen(true);
  const handleClose = () => props.setOpen(false);
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
  function Viewpdct(){
    axios.get("http://localhost:8000/api/get-one/"+props.vid,{
      headers:{
        Authorization: user1 || details,
        genericvalues: "admin",
      }
    }).then((response)=>{
      setViewpdct(response.data.result)
      console.log(viewpdct)
    })
  }
  useEffect(()=>{
    Viewpdct()
  },[])
function deletepdct(id){
  axios.delete("http://localhost:8000/api/deleteProduct/"+id,{
    headers:{
      Authorization:user1 || details,
      genericvalue: "admin",
    }
  }).then((response)=>{props.cart();
    handleClose()})
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
          <Typography id="modal-modal-title" variant="h6" className='text-center' component="h1">
            View Product Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='flex justify-between gap-4 '>
           {console.log(viewpdct)}
           <img src={products} className='h-40 mt-5 '/>
           <div className='flex flex-col mt-4 text-justify '>
           <h1 className='text-4xl  '>{viewpdct.productName}</h1>
           <h1 className='text-2xl mt-2 flex  '><FaRupeeSign />{viewpdct.productPrice}</h1>
           <h1 className='text-lg mt-2 '>Category:{viewpdct.category}</h1>
           <h1 className='text-lg mt-2 '>Quantity:{viewpdct.quantity}</h1>
           <h1 className='text-sm mt-2  text-justify  overflow-auto'>Description:{viewpdct.productDetails}</h1>
           <div className='flex justify-center mt-[30px] '>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-4' ><Editpdct  editid={viewpdct._id} cart={props.cart} viewproduct={Viewproduct} Viewpdct={Viewpdct} color="white"/></button>
                <button onClick={()=>deletepdct(viewpdct._id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-[30px] rounded '><MdDelete /></button>
               </div>
           </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
