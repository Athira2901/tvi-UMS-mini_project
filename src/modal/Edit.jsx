import  React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FaRegEdit } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "40vw",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Edit(props) {

   console.log(props.obj)

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {id} =useParams()
  const [fname, setFname] = useState(props.obj.firstName)
  const [sname, setSname] = useState(props.obj.lastName)
  const [email, setEmail] = useState(props.obj.email)
  const [role, setRole] = useState(props.obj.role)
  
  const [password, setPassword] = useState(props.obj.password)
  let user1=useSelector((store)=>store.auth.user)
let details=localStorage.getItem("user")

  useEffect(()=>{
    // setFname(props.obj.firstName)
    // setSname(props.obj.lastName)
    // setEmail(props.obj.email)
    // setRole(props.obj.role)
    // setPassword(props.obj.password)
})
function updateuser(){
    
   
    var user={
     firstName:fname,
     lastName:sname,
     email:email,
     role:role,
     password:password,
    
    }
    axios.put("http://localhost:8000/api/update/"+props.obj.id,user,{
      headers:{
        Authorization:user1||details,
        genericvalue:"admin"
      }
    })
    .then((response)=>(response.status==200?handleClose():""))
   
   
    

}

  return (
    <div>
      <Button onClick={handleOpen}><FaRegEdit color="green" /></Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h1" className='text-center text-3xl'>
       Edit
          </Typography> */}
          <h1 className='text-center text-3xl'>Edit</h1>
          <form className="flex flex-col mt-5   border border-b-gray-300  p-5 w-[100%] ">
        <div className="grid grid-cols-1  ">
        <div className="flex flex-col gap-2 m-2  ">
          <label>First Name</label>
          <input

            type="text"
            placeholder="Enter first name"
            className="rounded-lg  p-2 text-sm  border border-gray-300  "
            // value={fname}
            defaultValue={fname}
            onChange={(e)=>setFname(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 m-2 ">
          <label>Last Name</label>
          <input

            type="text"
            placeholder="Enter last name"
            className="rounded-lg  p-2 text-sm  border border-gray-300 "
            defaultValue={sname}
            onInput={(e)=>setSname(e.target.value)}
          />
        </div>
        </div>
        <div className="flex flex-col gap-2 m-2 "> 
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
          <select name="role" id="role" value={role} 
            onInput={(e)=>setRole(e.target.value)}>
              <option value="qc">QC</option>
              <option value="qa">QA</option>
              <option value="agent">Agent</option>
              <option value="supervisor">Supervisor</option>
          </select>
        </div>
        <div className="grid grid-cols-1 ">
        <div className="flex flex-col gap-2 m-2 ">
          <label>Password</label>
          <input

            type="password"
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
          onClick={updateuser}
        >
          Submit
        </button>
        </form>
       
        </Box>
      </Modal>
    </div>
  );
}