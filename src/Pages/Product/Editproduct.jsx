import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaEdit } from "react-icons/fa";
import { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import products from "../../assets/products.png";
import Uploadimg from '../../Components/Uploadimg'
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',

  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
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
  const [picture, setPicture] = useState("")
  const [offer, setOffer] = useState("")
  const [category, setCategory] = useState("")
  const [stock, setStock] = useState("")
  const [detail, setDetail] = useState("")
  const [img, setImg] = useState({})
  const [image, setImage] = useState("")
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
      setName(response.data.result.title)
      setPrice(response.data.result.price)

      setOffer(response.data.result.offer)
      setCategory(response.data.result.category)
      setStock(response.data.result.stock)
      setDetail(response.data.result.description)
      // setImgfile(response.data.result.image)
      const base64String=btoa(String.fromCharCode(...new Uint8Array(response.data.result.image[0].data)))
      var imgUrl = `data:image/jpeg;base64,${base64String}`
      setPicture(imgUrl)
    })

  },[props.editid])
 function updatepdct(e){
    e.preventDefault()
    const product= new FormData()
    product.append("title", name)
    product.append("price", price)
    product.append("description", detail)
    product.append("category", category)
    product.append("offer", offer)
    product.append("stock", stock)
    product.append("color", "red")
    product.append("availability", "yes")
   if(image){
     product.append("image", img)
   }
    axios.put("http://localhost:8000/api/updateProdt/"+props.editid,product,{
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
 function handlefn(file,path){
   setImg(file)
   setImage(path)
  console.log(file,path);
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
        <Box sx={style} className="h-screen overflow-scroll md:h-[90vh]">
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
           <div className=" border border-b-gray-300   w-[100%]">
        <h1 className=" text-center text-4xl  ">Edit Product</h1>
      </div>

      <form className="flex flex-col mt-1 p-3 w-[100%] ">
      <div >
       
        <img src={image? image: picture? picture:products} className='h-[120px]'/>
      
       <Uploadimg handlefn={handlefn}/>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-3 m-3">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="eg:Mobile"
                className="rounded-lg lg:w-[245px] p-2 text-sm md:w-[250px] xl:w-[250px] border border-gray-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-3 m-3">
              <label>Product Price</label>
              <input
                type="text"
                placeholder="$0000"
                className="rounded-lg lg:w-[245px]  p-2 text-sm md:w-[250px] xl:w-[250px] border border-gray-300"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 m-2">
              <label>Offer</label>
              <input
                type="text"
                placeholder="eg:20%"
                className="rounded-lg  p-2 text-sm xl:w-[505px] md:w-[505px]   border border-gray-300"
                value={offer}
                onChange={(e) => setOffer(e.target.value)}

              />
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-3 m-3">
              <label>Category</label>
              <input
                type="text"
                placeholder="eg:electronics"
                className="rounded-lg lg:w-[245px] p-2 text-sm md:w-[250px] xl:w-[250px] border border-gray-300"
                value={category}
                onChange={(e) => setCategory(e.target.value)}

              />
            </div>
            <div className="flex flex-col gap-3 m-3">
              <label>Quantity</label>
              <input
                type="text"
                placeholder="eg:20"
                className="rounded-lg lg:w-[245px] p-2 text-sm md:w-[250px] xl:w-[250px] border border-gray-300"
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
                className="rounded-lg  p-2 text-sm xl:w-[505px] md:w-[505px]   border border-gray-300"
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
// import * as React from "react";
// import { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import { FaEdit } from "react-icons/fa";
// import {
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   Button,
//   TextField,
// } from "@mui/material";

// export default function EditProduct(props) {
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [offer, setOffer] = useState("");
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState("");
//   const [detail, setDetail] = useState("");
//   const user1 = useSelector((store) => store.auth.user);
//   let details = localStorage.getItem("user");

//   useEffect(() => {
//     axios
//       .get("http://localhost:8000/api/get-one/" + props.editid, {
//         headers: {
//           Authorization: user1 || details,
//           genericvalues: "admin",
//         },
//       })
//       .then((response) => {
//         setName(response.data.result.title);
//         setPrice(response.data.result.price);
//         setOffer(response.data.result.offer);
//         setCategory(response.data.result.category);
//         setStock(response.data.result.stock);
//         setDetail(response.data.result.description);
//       });
//   }, [props.editid]);

//   function updateProduct(e) {
//     e.preventDefault();
//     const product = new FormData();
//     product.append("title", name);
//     product.append("price", price);
//     product.append("description", detail);
//     product.append("category", category);
//     product.append("offer", offer);
//     product.append("stock", stock);
//     product.append("color", "red");
//     product.append("availability", "yes");

//     axios
//       .put("http://localhost:8000/api/updateProdt/" + props.editid, product, {
//         headers: {
//           Authorization: user1 || details,
//           genericvalue: "admin",
//         },
//       })
//       .then((response) => {
//         props.ViewProduct();
//         props.cart();
//         handleClose();
//       });
//   }

//   return (
//     <div>
//       <Button onClick={handleOpen}>
//         <FaEdit color="white" />
//       </Button>
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle className="bg-gray-900 text-white">
//           Edit Product
//         </DialogTitle>
//         <DialogContent className="p-3 m-2">
//           <form onSubmit={updateProduct}>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <TextField
//                 label="Product Name"
//                 variant="outlined"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full"
//               />
//               <TextField
//                 label="Product Price"
//                 variant="outlined"
//                 value={price}
//                 onChange={(e) => setPrice(e.target.value)}
//                 className="w-full"
//               />
//               <TextField
//                 label="Offer"
//                 variant="outlined"
//                 value={offer}
//                 onChange={(e) => setOffer(e.target.value)}
//                 className="w-full"
//               />
//               <TextField
//                 label="Category"
//                 variant="outlined"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//                 className="w-full"
//               />
//               <TextField
//                 label="Quantity"
//                 variant="outlined"
//                 value={stock}
//                 onChange={(e) => setStock(e.target.value)}
//                 className="w-full"
//               />
//               <TextField
//                 label="Product Details"
//                 variant="outlined"
//                 value={detail}
//                 onChange={(e) => setDetail(e.target.value)}
//                 className="w-full"
//                 multiline
//                 rows={4}
//               />
//             </div>
//             <div className="flex justify-center mt-4">
//               <Button variant="contained" color="success" type="submit">
//                 Submit
//               </Button>
//             </div>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
