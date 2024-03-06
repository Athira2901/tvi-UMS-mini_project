import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


 function Supervisor() {

const navigate=useNavigate()
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      width: 90,
    },
    {
      field: "role",
      headerName: "Role",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
  
    
   
  ];
  
  
 
  
  let details = localStorage.getItem("user");

  const user1 = useSelector((store) => store.auth.user);
  const [datas, setDatas] = useState([]);
  function userlist(){
    axios
    .get("http://localhost:8000/api/users", {
      headers: {
        Authorization: user1 || details,
        genericvalue: "supervisor",
      },
    })
    .then((response) => setDatas(response.data.users))
    .catch((error) => console.error("Error fetching data:", error));
  }
  useEffect(() => {
    if (user1 || details) {
     userlist()
    }
  }, []);

 
  return (
   
    <div style={{ height: 400, width: "100%" }}>
      <div className="ml-5">
       <h1 className="mt-2 text-4xl text-center">USER DETAILS</h1>
       <div className="mt-5">
       <Link to='/' className="text-[#17a2b8] ">Back to Login</Link>
       </div>
       </div>
      <DataGrid  className="mt-[70px] "
        rows={datas} 
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}
export default Supervisor;