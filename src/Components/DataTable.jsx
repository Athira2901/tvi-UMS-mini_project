import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";




export default function DataTable() {
  function handleEdit(id) {
    console.log(id);
  }

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
        <button onClick={() => handleEdit(params.row.id)}>
          <FaRegEdit color="green" />
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
  ];
  function handleEdit(){
    navigate
  }
  
  function handleRemove(id) {
    console.log(id);
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
      <DataGrid
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
