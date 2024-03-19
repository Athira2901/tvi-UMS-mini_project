import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FcViewDetails } from "react-icons/fc";
import { useState } from "react";
import userLogo from "../assets/userLogo.jpg";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
function Viewdetails(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [fname, setFname] = useState(props.obj.firstName);
  const [sname, setSname] = useState(props.obj.lastName);
  const [email, setEmail] = useState(props.obj.email);
  const [role, setRole] = useState(props.obj.role);
  const [password, setPassword] = useState(props.obj.password);
  const [imge, setImge] = useState(props.obj.imageURL);
  const fullname =
    fname && fname.length > 0 && sname && sname.length > 0
      ? fname[0] + sname[0]
      : "";
  console.log(fullname);
  function view() {
    axios.get("http://localhost:8000/api/user/" + props.obj.id, {
      headers: {
        Authorization: user1 || details,
        genericvalues: "admin",
      },
    }).then((response)=>console.log(response))
  }

  React.useEffect(()=>{
    const imagee=props.obj.image?.data
    console.log(" ~ React.useEffect ~ image:", imagee)
    
    const base64String = btoa(
      String.fromCharCode(...new Uint8Array(imagee))
      );
      
      setImge(base64String);
  })

  return (
    <div>
      <Button onClick={handleOpen}>
        {" "}
        <FcViewDetails />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="text-center text-2xl">View User</h1>
          <form className="flex flex-col items-center justify-center ">
            {/* <img 
          src={imge ? imge : userLogo}
          className="h-[100px] w-[100px] ml-[115px] mt-3 rounded-lg"
        /> */}<div className="ml-4">
            <div className="h-[100px] flex justify-center items-center w-[100px]  mt-4 rounded-lg text-center ">

              {imge ? (
                <img
                src={`data:image/png;base64,${imge}`}
                  className="h-[100px] w-[100px] ml-[250px] mt-3 rounded-lg"
                />
              ) : (
                <div className="text-3xl rounded-[50%] flex justify-center items-center p-5  bg-[#343a40] text-white ml-[280px] ">{fullname}</div>
              )}
            </div>
            <div className="flex  mt-2">
              <div className="flex flex-col gap-1">
                <label className="text-sm" >First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="rounded-lg text-lg p-1 border-none border-gray-300"
                  defaultValue={fname}
                  disabled
                />
              </div>
              <div className="flex flex-col gap-1">
                <label  className="text-sm">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="rounded-lg w-[100px] text-lg p-2 border-none border-gray-300"
                  defaultValue={sname}
                  disabled
                  
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label  className="text-sm mt-2">Email</label>
              <input
                type="email"
                placeholder="Enter email address"
                className="rounded-lg text-lg border-none border-gray-300"
                defaultValue={email}
                disabled
              />
            </div>
            <div>
              <label  className="text-sm mt-2">Role:</label>
              <input
                type="text"
                placeholder="Enter email address"
                className="rounded-lg border-none text-lg  border  border-gray-300"
                defaultValue={role}
                disabled
              />
            </div>
            <div className="grid grid-cols-1">
              <div className="flex flex-col gap-2">
                <label  className="text-sm mt-2">Password</label>
                <input
                  type="text"
                  placeholder="Enter password"
                  className="rounded-lg border-none text-lg    border border-gray-300"
                  defaultValue={password}
                  disabled
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white mt-6 bg-[#17a2b8] hover:bg-[#007bff] w-[90%] h-10 rounded-lg"
              onClick={view}
            >
              Back to dashboard
            </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
export default Viewdetails;
