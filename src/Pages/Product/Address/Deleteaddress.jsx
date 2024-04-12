import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';


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

export default function Deleteaddress(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user1 = useSelector((store) => store.auth.user);
  let details = localStorage.getItem("user");

 function deleteaddr(){
    axios.delete("http://localhost:8000/api/delete-address/"+props.deleteid,{
        headers: {
            Authorization: user1 || details,
        
          }
    }).then((response)=>{
        props.getaddr()
        handleClose()
    })
 }
 function cancelmodal(){
    props.getaddr()
    handleClose()
 }
  return (
    <div>
      <Button onClick={handleOpen} >DELETE</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2 className='text-[red] text-sm text-center'>Are you sure ! Do you want to remove</h2>
          </Typography>
          <Typography id="modal-modal-descriptionDuis mollis, est non commodo luctus, nisi er" sx={{ mt: 2 }}>
            <div className='flex justify-between p-5 mt-[20px]'>
           <button onClick={cancelmodal} className='bg-[dodgerblue] text-black rounded-lg w-[90px] h-[40px]'>Cancel</button>

          <button onClick={deleteaddr} className='bg-[red] text-[white] rounded-lg w-[90px] h-[40px]' >Remove</button>
          </div>
          </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}