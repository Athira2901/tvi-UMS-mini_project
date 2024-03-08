import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { removeUser } from '../Store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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

export default function Logout(props) {
  // const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => props.setOpen(false);
  let dispatch=useDispatch()
  let  navigate=useNavigate()

function handleexit(){
  dispatch(removeUser())
  navigate('/')
}
function handlecancel(){
  props.setOpen(false)
  navigate('/dashboard')
}
  return (
    <div>
      <button onClick={props.handleOpen} className='w-[80px] text-sm'>LOGOUT</button>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <h2 className='text-[red] text-sm text-center'>Are you sure ! Do you want to exit</h2>
          </Typography>
          <Typography id="modal-modal-descriptionDuis mollis, est non commodo luctus, nisi er" sx={{ mt: 2 }}>
            <div className='flex justify-between p-5 mt-[20px]'>
           <button onClick={handlecancel} className='bg-[dodgerblue] text-black rounded-lg w-[90px] h-[40px]'>Cancel</button>

          <button onClick={handleexit} className='bg-[peru] rounded-lg w-[90px] h-[40px]' >Exit</button>
          </div>
          </Typography>
          
           
        </Box>
      </Modal>
    </div>
  );
}