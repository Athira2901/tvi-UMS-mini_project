import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";
import { useSelector } from "react-redux";
import cart from "../../../assets/cartorder.png"

// import tick from "../../assets/icons8-tick.gif"


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Orderconfirm() {
    let details = localStorage.getItem("user");
    const user1 = useSelector((store) => store.auth.user);
  const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
function handleOpen(){
    setOpen(true)
    axios.post("http://localhost:8000/api/order",{},{
        headers: {
          Authorization: user1 || details,
          genericvalue: "agent",
        },
     }).then((response)=>{
        console.log(response)
        // toastmsg("order placed")
    
     })

}

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} >Place Order</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div>
          <img src={cart} height="300px" width="150px" className='ml-[70px]'/>
          <h1 className='text-center text-3xl text-[#00b300]'>Order Placed!!!</h1>
          </div> 
         
        </Box>
      </Modal>
    </div>
  );
}