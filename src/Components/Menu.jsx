import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUser } from "react-icons/fa";
import { removeUser } from '../Store/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IoMdArrowDropdown } from "react-icons/io";
import Logout from '../modal/Logout';


export default function bMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  let dispatch=useDispatch()
 let  navigate=useNavigate()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  function handleClose(){
    dispatch(removeUser())
    navigate('/')

    // <Logout/>
  }

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
      
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}