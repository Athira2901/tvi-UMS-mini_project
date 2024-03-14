import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FcViewDetails } from "react-icons/fc";
import { useState } from 'react';
import userLogo from "../assets/userLogo.jpg";
const style = {
  position: 'absolute',
  top: '50%',
 
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height:600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

 function Viewdetails(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fname, setFname] = useState(props.obj.firstName)
  const [sname, setSname] = useState(props.obj.lastName)
  const [email, setEmail] = useState(props.obj.email)
  const [role, setRole] = useState(props.obj.role)
  const [password, setPassword] = useState(props.obj.password)
  const [imge, setImge] = useState(props.obj.imageURL)
  

  function view(){
   
    axios.get("http://localhost:8000/api/user/"+props.obj.id,{
      headers:{
        Authorization:user1||details,
        genericvalues:"admin"
      }
    })
    
  }

  return (
    <div>
      <Button onClick={handleOpen}> <FcViewDetails /></Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <h1 className='text-center text-2xl'>View User</h1>
          <form className="flex flex-col   w-[100%] ">
              <img 
              src={imge?imge: userLogo}
              className="h-[100px] w-[100px] ml-[115px] mt-3 rounded-lg"
            />
        <div className=" flex w-[150px] mt-2">
        <div className="flex flex-col gap-1  ">
          <label>First Name</label>
          <input

            type="text"
            placeholder="Enter first name"
            className="rounded-lg   text-sm p-1 border-none  border-gray-300  "
            // value={fname}
            defaultValue={fname}
           disabled
          />
        </div>
        <div className="flex flex-col gap-1   ">
          <label>Last Name</label>
          <input

            type="text"
            placeholder="Enter last name"
            className="rounded-lg  w-[100px] text-sm p-2 border-none border-gray-300 "
            defaultValue={sname}
           disabled
          />
        </div>
        </div>
        <div className="flex flex-col gap-1   "> 
          <label>Email</label>
          <input

            type="email"
            placeholder="Enter email address"
            className=" rounded-lg p-2 border-none border-gray-300 "
            defaultValue={email}
            disabled
          />
        </div>
        <div>
        <label>Role:</label>
         
            <input

                type="text"
                placeholder="Enter email address"
                className=" rounded-lg  border-none border mt-3 border-gray-300 "
                defaultValue={role}
                disabled
                />
            
        </div>
        <div className="grid grid-cols-1 ">
        <div className="flex flex-col gap-2  ">
          <label>Password</label>
          <input

            type="text"
            placeholder="Enter password"
            className="rounded-lg  border-none p-2 text-sm   border border-gray-300 "
            defaultValue={password}
             disabled
          />
        </div>
     
        </div>
        
        <button
          type="submit"
          className="text-white mt-6 bg-[#17a2b8] hover:bg-[#007bff] w-full   h-10 rounded-lg "
          onClick={view}
        >
          Back to dashboard
        </button>
        </form>
        </Box>
      </Modal>
    </div>
  );
}
export default Viewdetails;