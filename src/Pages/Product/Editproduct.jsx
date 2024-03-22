import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from "react-icons/fa";
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Editpdct(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [detail, setDetail] = useState("")
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");
//   console.log(props.viewpdct.productName)
  useEffect(()=>{
    console.log("props.editid:", props.editid);
    axios.get("http://localhost:8000/api/get-one/"+props.editid,{
        headers:{
            Authorization:user1 || details,
            genericvalues: "admin",
          }
    })
    .then((response)=>{
      console.log(response)
      setName(response.data.result.productName)
      setPrice(response.data.result.productPrice)
      setCategory(response.data.result.category)
      setStock(response.data.result.stock)
      setDetail(response.data.result.productDetails)
    })
        
    
  },[props.editid])
 function updatepdct(e){
    e.preventDefault()
    var list={
        productName:name,
        productPrice:price,
        category:category,
        stock:stock,
        productDetails:detail

    }
    axios.put("http://localhost:8000/api/updateProdt/"+props.editid,list,{
        headers:{
            Authorization:user1 || details,
            genericvalue: "admin",
          }
    }).then((response)=>{props.Viewpdct()
      props.cart()
      handleClose()}
    )
    console.log(name)
 }
  return (
    <div>
      <Button onClick={handleOpen}><FaEdit color="white" /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
           <div className="mt-5 border border-b-gray-300  p-5 w-[100%]">
        <h1 className=" text-center text-4xl  ">Edit Product</h1>
      </div>

      <form className="flex flex-col mt-1 p-3 w-[100%] ">
      
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 m-2">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="eg:Mobile"
                className="rounded-lg lg:w-[200px] p-2 text-sm md:w-[310px] xl:w-[200px] border border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 m-2">
              <label>Product Price</label>
              <input
                type="text"
                placeholder="$0000"
                className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[200px] border border-gray-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 m-2">
              <label>Category</label>
              <input
                type="text"
                placeholder="eg:electronics"
                className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[200px] border border-gray-300"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                
              />
            </div>
            <div className="flex flex-col gap-2 m-2">
              <label>Quantity</label>
              <input
                type="text"
                placeholder="eg:20"
                className="rounded-lg lg:w-[225px] p-2 text-sm md:w-[310px] xl:w-[200px] border border-gray-300"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
            
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 m-2">
              <label>Product details</label>
              <input
                type="text"
                placeholder="Enter product details"
                className="rounded-lg  p-2 text-sm xl:w-[400px] md:w-[310px]   border border-gray-300"
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
            
              />
            </div>
        
       
       
        <div className="flex justify-center gap-4 ">
        
         
              
                                                         
            <button
              className="text-white mt-5 bg-[#28a745] hover:bg-[green] w-[100px] h-10 rounded-lg "
              onClick={updatepdct}
            >
              Submit
            </button>
          
        </div>
      </form>
        </Box>
      </Modal>
    </div>
  );
}