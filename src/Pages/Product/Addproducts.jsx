import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import products from "../../assets/products.png";
import Uploadimg from '../../Components/Uploadimg'
function Addproducts() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
   
    const [offer, setOffer] = useState("")
    const [category, setCategory] = useState("")
    const [stock, setStock] = useState("")
    const [detail, setDetail] = useState("")
    const [img, setImg] = useState("")
    const [imgfile, setImgfile] = useState({})
    let user1=useSelector((store)=>store.auth.user)
    let details = localStorage.getItem("user");
    const navigate=useNavigate()
function add(e){
    e.preventDefault()
    const product= new FormData()
    product.append("title", name)
    product.append("price", price)
    product.append("description", detail)
    product.append("category", category)
    product.append("offer", offer)
    product.append("stock", stock)
    product.append("color", "red")
    product.append("availability", "yes") 
    product.append("image",imgfile)

    
    axios.post("http://localhost:8000/api/addProdt",product,{
        headers:{
            Authorization:user1 || details,
            genericvalue:"admin"
        }
    }).then((response)=>{console.log(response)
        navigate(-1)
    })
   
}
function handlefn(file,imge){
 setImgfile(file)
 setImg(imge)
}
  return (
   
    <div className="bg-[#2d2d2d] h-full md:h-[655px]  flex flex-col items-center">
   
    <div className="bg-[#E6E6E6] relative top-[40px] h-[800px] overflow-scroll flex flex-col items-center   m-[20px] w-[80%] md:w-[90%] lg:w-[40%]  rounded-lg">
      <div className="mt-5 border border-b-gray-300  p-3 w-[100%]">
        <h1 className=" text-center text-4xl  ">Add Products</h1>
      </div>

      <form className="flex flex-col mt-1 p-3 w-[100%] ">
      <div >
       {img ? (
        <img src={img} className='h-[120px]'/>):(
          <img src={products} className='h-[120px]'/>)
        }
       <Uploadimg handlefn={handlefn}/>
        </div>
      
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 m-2">
              <label>Product Name</label>
              <input
                type="text"
                placeholder="eg:Mobile"
                className="rounded-lg lg:w-[180px] p-2 text-sm md:w-[310px] xl:w-[210px] border border-gray-300"
               
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2 m-2">
              <label>Product Price</label>
              <input
                type="text"
                placeholder="$0000"
                className="rounded-lg lg:w-[180px] p-2 text-sm md:w-[310px] xl:w-[230px] border border-gray-300"
              
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
         
         
          <div className="flex flex-col gap-2 m-2">
              <label>Offer</label>
              <input
                type="text"
                placeholder="20%"
                className="rounded-lg  p-2 text-sm xl:w-[475px] md:w-[310px]   border border-gray-300"
               
                onChange={(e) => setOffer(e.target.value)}
            
              />
            </div>
         
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="flex flex-col gap-2 m-2">
              <label>Category</label>
              <input
                type="text"
                placeholder="eg:electronics"
                className="rounded-lg lg:w-[180px] p-2 text-sm md:w-[310px] xl:w-[230px] border border-gray-300"
               
                onChange={(e) => setCategory(e.target.value)}
                
              />
            </div>
            <div className="flex flex-col gap-2 m-2">
              <label>No: of stock</label>
              <input
                type="text"
                placeholder="eg:20"
                className="rounded-lg lg:w-[180px] p-2 text-sm md:w-[310px] xl:w-[230px] border border-gray-300"
               
                onChange={(e) => setStock(e.target.value)}
            
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 m-2">
              <label>Product details</label>
              <input
                type="text"
                placeholder="Enter product details"
                className="rounded-lg  p-2 text-sm xl:w-[475px] md:w-[310px]   border border-gray-300"
               
                onChange={(e) => setDetail(e.target.value)}
            
              />
            </div>
        
       
       
        <div className="flex justify-center gap-4 ">
        
         
              
                                                         
            <button
              className="text-white mt-5 bg-[#28a745] hover:bg-[green] w-[100px] h-10 rounded-lg "
              onClick={add}
            >
              Add
            </button>
          
        </div>
      </form>
    </div>
  </div>
  )
}

export default Addproducts