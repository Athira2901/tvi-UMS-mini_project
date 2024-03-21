import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import DataTable from "../Components/DataTable";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";
import { AiOutlineAreaChart } from "react-icons/ai";
import { IoBarChart } from "react-icons/io5";
import Products from "./Product/Products";
import Barchart from "../Components/Barchart";
import AreaChart from "../Components/Areachart";
function Dashboard() {
  const [ishide, setIshide] = useState(false);
  const [dat, setDat] = useState("");
  function handleclick() {
    setIshide((current) => !current);
  }
  function click(msg) {
    console.log(msg)
    setDat(msg);
  }
  useEffect(()=>{
    console.log("sdsd",dat)
  },[])
  return (
    <div className="overflow-scroll h-screen">
      <div className="fixed z-10">
        <Navbar handleclick={handleclick} />
      </div>

      <div className="flex w-full  relative top-[56px]">
        {/* {ishide && <Sidebar />} */}
        <div
          className={`transition-all duration-500 ${
            ishide ? "w-[225px]" : "w-0"
          } overflow-hidden `}
        >
          <Sidebar click={click} />
        </div>
        {/* <div className="flex justify-center gap-5">
        <h1 className="mt-2 text-xl">Areachart</h1>
        <h1 className="mt-2 flex-justify-center text-xl">Barchart</h1>
        </div> */}
        {dat == "product" ? (
           <Products />
          
        ) : (
          <div className="flex flex-col h-[900px] overflow-scroll w-screen">
            <div className="ml-5">
              <h1 className="mt-2 text-4xl">Dashboard</h1>
            </div>
            <div>
              <h6 className="bg-[#E9ECEF] text-[#6c757D] ml-5 mt-3 p-3">
                {" "}
                Dashboard
              </h6>
            </div>
            <div className="flex flex-col md:flex-row gap-5 items-center md:justify-center p-4">
              <div className="flex flex-col">
                <div className="flex items-center gap-2 ml-[50px]">
                  <AiOutlineAreaChart />
                  <h1 className="mt-1 text-xl">Areachart</h1>
                </div>
                <AreaChart />
              </div>
              <div className="flex flex-col ">
                <div className="flex items-center gap-2 ml-[180px]">
                  <IoBarChart />
                  <h1 className="mt-1 r text-xl">Barchart</h1>
                </div>
                <Barchart />
              </div>
            </div>
            <DataTable />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
