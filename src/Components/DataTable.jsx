import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import Edit from "../modal/Edit";
import { FcViewDetails } from "react-icons/fc";
import Viewdetails from "../modal/Viewdetails";



 function DataTable() {


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
  
    {
      field: "edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => (
        <button >
          <Edit obj={params.row}/>
        </button>
      ),
    },
    {
      field: "delete",
  
      headerName: "Delete",
      width: 140,
  
      renderCell: (params) => (
        <button onClick={() => handleRemove(params.row.id)}>
          <MdDelete color="red" />
        </button>
      ),
    },
    {
      field: "view",
      headerName: "View",
      width: 120,
      renderCell: (params) => (
        <button >
          <Viewdetails obj={params.row}/>
        </button>
      ),
     
      
    },
  ];
  //  function handleEdit(){
  //   navigate
  // }
  
  function handleRemove(id) {
    // console.log(id);
    axios(`http://localhost:8000/api/delete/${id}`, {
        method: "DELETE",
        headers: {
          genericvalue: "admin",
          Authorization: user1 || details,
        },
      })
      .then((response) => console.log(response))
      userlist()
      .catch((error) => console.error("Error fetching data:", error.message));
  }
  
  let details = localStorage.getItem("user");

  const user1 = useSelector((store) => store.auth.user);
  const [datas, setDatas] = useState([]);
  function userlist(){
    axios
    .get("http://localhost:8000/api/users", {
      headers: {
        Authorization: user1 || details,
        genericvalue: "admin",
      },
    })
    .then((response) => setDatas(response.data.data))
    .catch((error) => console.error("Error fetching data:", error));
  }
  useEffect(() => {
    // if (user1 || details) {
     userlist()
    
  }, []);


  return (
   
    <div style={{ height: 400, width: "100%" }}>
      <div className="ml-5">
       <h1 className="mt-2 text-4xl">Dashboard</h1>
       <h5 className="bg-[#E9ECEF] text-[#6c757D] mt-3 p-3">Dashboard</h5>
       </div>
      <DataGrid  className="mt-5"
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
export default DataTable