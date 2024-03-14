import React from "react";
import Navbar from "../Components/Navbar";
import DataTable from "../Components/DataTable";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { AiOutlineAreaChart } from "react-icons/ai";
import { IoBarChart } from "react-icons/io5";

import Barchart from "../Components/Barchart";
import AreaChart from "../Components/Areachart";
function Dashboard() {
  const [ishide, setIshide] = useState(false);
  function handleclick() {
    setIshide((current) => !current);
  }
  return (
    <div >
    
      <div>
        <Navbar handleclick={handleclick} />
      </div>
      
      <div className="flex ">
        {/* {ishide && <Sidebar />} */}
        <div
          className={`transition-all duration-500 ${
            ishide ? "w-[225px]" : "w-0"
          } overflow-hidden`}
        >
          <Sidebar />
        </div>
        {/* <div className="flex justify-center gap-5">
        <h1 className="mt-2 text-xl">Areachart</h1>
        <h1 className="mt-2 flex-justify-center text-xl">Barchart</h1>
        </div> */}
        <div className="flex flex-col h-[900px] overflow-scroll w-screen ">
        <div className="ml-5">
      <h1 className="mt-2 text-4xl">Dashboard</h1>
      </div>
      <div>
        <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3"> Dashboard</h6>
      </div>
        <div className="flex border justify-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 ml-[50px]">
          <AiOutlineAreaChart  />
          <h1 className="mt-1 text-xl">Areachart</h1>
          </div>
          <AreaChart />
          </div>
          <div className="flex flex-col ">
            <div className="flex items-center gap-2 ml-[180px]">
          <IoBarChart />
          <h1 className="mt-1 flex- text-xl">Barchart</h1>
          </div>
          <Barchart />
          </div>
        </div>
        <DataTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
