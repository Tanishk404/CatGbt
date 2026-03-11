import React, { useState } from 'react'

function RuffImagePractice() {

    const [Img, setImg] = useState("");
    const [Prewimg, setPrewImg] = useState("");

    const inputHandle = (e) =>{
       const file =  e.target.files[0]
       if(file){
        setImg(file)
        setPrewImg(URL.createObjectURL(file));
       }
    }

  return (
    <div className='bg-gray-300'>
        Iam Home IMAGE
        <input type="file" accept='image/*' onChange={inputHandle} name='file'/>
        

        <div className='h-28 w-28'>
            <img src={Prewimg} alt="" />
            </div>
        

    </div>
  )
}

export default RuffImagePractice