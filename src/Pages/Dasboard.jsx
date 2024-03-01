import React from "react";
import Navbar from "../Components/Navbar";
import DataTable from "../Components/DataTable";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";

function Dasboard() {
  const [ishide, setIshide] = useState(false);
  function handleclick() {
    setIshide((current) => !current);
  }
  return (
    <div>
      <div>
        <Navbar handleclick={handleclick} />
      </div>
      <div className="flex">
        {ishide && <Sidebar />}
        <DataTable />
      </div>
    </div>
  );
}

export default Dasboard;
