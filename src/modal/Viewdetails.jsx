import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FcViewDetails } from "react-icons/fc";
import { useState } from 'react';

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

 function Viewdetails(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fname, setFname] = useState(props.obj.firstName)
  const [sname, setSname] = useState(props.obj.lastName)
  const [email, setEmail] = useState(props.obj.email)
  const [role, setRole] = useState(props.obj.role)
  const [password, setPassword] = useState(props.obj.password)
  

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
        <h1 className='text-center text-3xl'>View User</h1>
          <form className="flex flex-col   w-[100%] ">
        <div className="grid grid-cols-1  ">
        <div className="flex flex-col gap-2   ">
          <label>First Name</label>
          <input

            type="text"
            placeholder="Enter first name"
            className="rounded-lg   text-sm p-2 border border-gray-300  "
            // value={fname}
            defaultValue={fname}
            onChange={(e)=>setFname(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2  ">
          <label>Last Name</label>
          <input

            type="text"
            placeholder="Enter last name"
            className="rounded-lg   text-sm p-2 border border-gray-300 "
            defaultValue={sname}
            onInput={(e)=>setSname(e.target.value)}
          />
        </div>
        </div>
        <div className="flex flex-col gap-2  "> 
          <label>Email</label>
          <input

            type="email"
            placeholder="Enter email address"
            className=" rounded-lg p-2 border border-gray-300 "
            defaultValue={email}
            onInput={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div>
        <label>Role:</label>
         
            <input

                type="text"
                placeholder="Enter email address"
                className=" rounded-lg  border border-gray-300 "
                defaultValue={role}
                onInput={(e)=>setRole(e.target.value)}
                />
            
        </div>
        <div className="grid grid-cols-1 ">
        <div className="flex flex-col gap-2  ">
          <label>Password</label>
          <input

            type="text"
            placeholder="Enter password"
            className="rounded-lg  p-2 text-sm   border border-gray-300 "
            defaultValue={password}
            onInput={(e)=>setPassword(e.target.value)}
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