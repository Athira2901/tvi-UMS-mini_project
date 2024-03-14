import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import Edit from "../modal/Edit";
import { FcViewDetails } from "react-icons/fc";
import Viewdetails from "../modal/Viewdetails";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaginationSize from "./Pagination";
function DataTable() {
  const [input, setInput] = useState();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "email", headerName: "Email", type: "email", width: 90 },
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
        <button>
          <Edit obj={params.row} />
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
        <button>
          <Viewdetails obj={params.row} />
        </button>
      ),
    },
  ];

  let details = localStorage.getItem("user");
  const navigate = useNavigate();
  const user1 = useSelector((store) => store.auth.user);
  const [datas, setDatas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [total, setTotal] = useState();

  function handleRemove(id) {
    axios
      .delete(`http://localhost:8000/api/delete/${id}`, {
        headers: {
          genericvalue: "admin",
          Authorization: user1 || details,
        },
      })
      .then((response) => console.log(response))
      .then(userlist)
      .catch((error) => console.error("Error fetching data:", error.message));
  }

  function userlist(n = 1) {
    axios
      .get(`http://localhost:8000/api/users?page=${n}`, {
        headers: {
          Authorization: user1 || details,
          genericvalue: "admin",
        },
      })
      .then((response) => {
        setDatas(response.data.users);
        // console.log(response.data.totalCount);
        setTotal(response.data.totalCount);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }
  function cpage(num) {
    console.log(num)
    userlist(num);
  }

  function Searchuser() {
    axios
      .get(`http://localhost:8000/api/users?search=${searchQuery}`, {
        headers: {
          Authorization: user1 || details,
          genericvalue: "admin",
        },
      })
      .then((response) => setDatas(response.data.users))
      .catch((error) => console.error("Error fetching data:", error));
  }

  useEffect(() => {
    userlist();
  }, [searchQuery]);
  function backbtn() {
    navigate("/Dashboard");
  }
  return (
    <div style={{ height: 485, width: "100%" }} >
      <div className="ml-5">
        <h5 className="mt-2 text-3xl">Data Table</h5>
        <div className="bg-[#E9ECEF] text-[#6c757D] ml-2 mt-3 p-3 flex">
          <input
            placeholder="Search for..."
            className="h-[36px] outline-none rounded-s-[4px] p-2 w-[230px] border-none "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={Searchuser}
            className="w-[40px] flex items-center justify-center h-[36px] rounded-r-[4px]"
          >
            <FaSearch font-size="20px" />
          </button>
        </div>
      </div>
      {datas.length > 0 ? (
        <div className="mt-5 ">
        <DataGrid
          // className="mt-5 h-[500] border border-[red]"
          rows={datas}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          // pageSizeOptions={[5, 10, 15]}
        />
        </div>
      ) : (
        <div className="text-[red]">
          <p>No users found</p>
        </div>
      )}
      <PaginationSize cpage={cpage} total={total} />
    </div>
  );
}

export default DataTable;
