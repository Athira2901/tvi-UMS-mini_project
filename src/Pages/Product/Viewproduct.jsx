import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import products from "../../assets/products.png";
import axios from 'axios';
import { FaRupeeSign } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Editpdct from './Editproduct';
import { CiCircleInfo } from "react-icons/ci";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: "80vh",
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Viewproduct(props) {

  const [viewpdct, setViewpdct] = useState({});
  const [imge, setImge] = useState([])
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");

  function Viewpdct() {
    axios.get("http://localhost:8000/api/get-one/" + props.vid, {
      headers: {
        Authorization: user1 || details,
        genericvalues: "admin",
      }
    }).then((response) => {
      setViewpdct(response.data.result);
      if(response.data.result.image.length > 0){
        const base64String = btoa(String.fromCharCode(...new Uint8Array(response.data.result.image[0].data)))
        setImge(base64String)
      }
    });
  }

  useEffect(() => {
    Viewpdct();
  }, []);

  function deletepdct(id) {
    axios.delete("http://localhost:8000/api/deleteProduct/" + id, {
      headers: {
        Authorization: user1 || details,
        genericvalue: "admin",
      }
    }).then((response) => {
      props.cart();
      handleClose();
    });
  }

  const handleClose = () => props.setOpen(false);

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded-lg">
          <div className="flex items-center justify-center">
            {imge.length > 0 ?(
            <img src={`data:image/png;base64,${imge}`} className="h-40 mt-5" alt="Product" />
            ) :(
              <img src={products} className="h-40 mt-5" alt="Product" />
            )}
            <div className="ml-10">
              <h1 className="text-4xl">{viewpdct.title}</h1>
              <div className='flex gap-3'>
              <h1 className="text-2xl mt-2 flex items-center "><FaRupeeSign className="mr-1" />{viewpdct.discountedPrice}</h1>
              <p className="text-md mt-2 flex items-center line-through text-[#878787]"><FaRupeeSign className="mr-1" />{viewpdct.price}</p>
              <p className="text-lg mt-2 flex items-center text-[#388E3C] ">{viewpdct.offer} % off</p>
               <div className='text-[grey] mt-4'>
              <CiCircleInfo />
              </div>
              </div>


              <h1 className="text-lg mt-2">Category: {viewpdct.category}</h1>
              <h1 className="text-lg mt-2">No. of stock available: {viewpdct.stock}</h1>
              
              <p className="text-sm mt-2">{viewpdct.description}</p>
              <div className="flex justify-center mt-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                  <Editpdct editid={viewpdct._id} cart={props.cart} viewproduct={Viewproduct} Viewpdct={Viewpdct} />
                </button>
                <button onClick={() => deletepdct(viewpdct._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
