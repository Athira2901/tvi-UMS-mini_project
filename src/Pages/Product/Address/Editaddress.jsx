import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useState,useEffect } from 'react';
import { TextField } from '@mui/material'
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

export default function Editaddress(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [altphno, setAltphno] = useState("")
  const [pincode, setPincode] = useState("")
  const [states, setStates] = useState("")
  const [city, setCity] = useState("")
  const [bname, setBname] = useState("")
  const [area, setArea] = useState("")
  const [landmark, setLandmark] = useState("")
  let user1=useSelector((store)=>store.auth.user)
  let details = localStorage.getItem("user");
  useEffect(()=>{
    console.log("props.editid:", props.editid);
    axios.get("http://localhost:8000/api/address-view",{
        headers:{
            Authorization:user1 || details,
            genericvalues: "agent",
          }
    })
    .then((response)=>{
      console.log(response)
      setFullName(response.data.result[0].address[0].fullName)
      setPhoneNumber(response.data.result[0].address[0].phoneNumber.toString())



      setAltphno(response.data.result[0].address[0].alternateNumber.toString())
      setPincode(response.data.result[0].address[0].pincode.toString())
      setStates(response.data.result[0].address[0].state)
      setCity(response.data.result[0].address[0].city)
      setBname(response.data.result[0].address[0].buildingName)
      setArea(response.data.result[0].address[0].area)
      setLandmark(response.data.result[0].address[0].landmark)
   
    })
},[])
function updateaddress(e){
 e.preventDefault()
 var list = {
    fullName: fullName,
    phoneNumber: phoneNumber,
    alternateNumber: altphno,
    pincode: pincode,
    state: states,
    city: city,
    buildingName: bname,
    area: area,
    landmark: landmark,
  };
  axios.put("http://localhost:8000/api/address-edit/"+props.editid,list,{
    headers:{
        Authorization:user1 || details,
        genericvalue:"agent"
        
      }
  }).then((response)=>{
    props.addresslist()
    handleClose()
    console.log(response)
  })
}

  return (
    <div>
      <Button onClick={handleOpen}>EDIT</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
          <div className='flex gap-3 justify-between w-full'>  
       <TextField
       
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Full Name(required)*"
            className="w-[50%]"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
        />
        <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Phone Number(required)*"
            className="w-[50%]"
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
        />
        </div>
        <div className='flex gap-3 justify-between w-full'>
        <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="+Add alternate number"
            className="w-[50%]"
            value={altphno}
            onChange={(e)=>setAltphno(e.target.value)}
        />
       
       <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Pincode(required)*"
            className="w-[50%]"
            value={pincode}
            onChange={(e)=>setPincode(e.target.value)}
        />
        </div>
        <div className='flex gap-3 justify-between w-full'>
         <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="State(required)*"
            className="w-[50%]"
            value={states}
            onChange={(e)=>setStates(e.target.value)}
        />
        
        <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="City(required)*"
            className="w-[50%]"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
        />
        </div>
        <div className='flex gap-3 justify-between w-full'>
        <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Building Name(required)*"
            value={bname}
            className="w-[50%]"
            onChange={(e)=>setBname(e.target.value)}
        />
        <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper "
            label="Area(required)*"  
            value={area}
            className="w-[50%]"
            onChange={(e)=>setArea(e.target.value)}
        />
       
        </div>
        <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper "
            label="Landmark"
            className="w-full"
            value={landmark}
            onChange={(e)=>setLandmark(e.target.value)}
        />
        <div className='bg-[#ff6f3c] w-[200px] h-[40px] text-center flex justify-center rounded-lg'>
        <button onClick={updateaddress}>Edit Address</button>
        </div>
        
        </Box>
      </Modal>
    </div>
  );
}