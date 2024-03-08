import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUser } from "react-icons/fa";

import { IoMdArrowDropdown } from "react-icons/io";
import Logout from '../modal/Logout';


export default function bMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openm, setOpenm] = React.useState(false);
  const handleOpen = () => setOpenm(true);
  
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // function handleClose(){
  //   dispatch(removeUser())
  //   navigate('/')

    // <Logout/>
  

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      
      >
       <FaUser color='grey ' font-size="20px" />
       <IoMdArrowDropdown color='grey' />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
      
      
        <Logout open={openm} setOpen={setOpenm} handleOpen={handleOpen}/>
      </Menu>
    </div>
  );
}