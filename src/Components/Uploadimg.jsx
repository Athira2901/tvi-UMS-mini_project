import React, { useState } from 'react'

function Uploadimg(props) {
    const[img,setImg]=useState("")
    function upload(e){
        const file=e.target.files[0]
        if(file){
            const reader=new FileReader();
            reader.onload=()=>{
                setImg(reader.result);
                props.handlefn(file,reader.result)
            };
            reader.readAsDataURL(file);
        }
      
    }
  return (
    <div><input
    type="file"
    className="border-none text-sm mt-3 inline-block h-[30px]"
    onChange={upload}
    accept="image/*"
  />

    </div>
  )
}

export default Uploadimg