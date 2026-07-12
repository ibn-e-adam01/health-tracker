import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Page = () => {

    const [Height, setHeight] = useState("");
    const [Weight, setWeight] = useState("");
    const [Category, setCategory] = useState("");
    const [BMI, setBMI] = useState("");
    const API_URL = import.meta.env.VITE_API_URL;

  return (
    <>
    <div className='h-auto w-full bg-zinc-900 flex justify-center items-center flex-col'>
        <h1 className='md:text-4xl text-3xl font-extrabold text-zinc-100 mt-11'>TRACK YOUR BMI</h1>
        <form onSubmit={async (e) => {
                e.preventDefault();

                const bmiData = {
                    Height,
                    Weight,
                    Category
                } //Here we HAVE TO pass Height, Weight & Category in an object to backend as otherwise(if we sent them directly), it will be sent as Number, which is not part of JSON!!!

                let res = await axios.post(`${API_URL}`, bmiData, {
                    headers: {
                         'Content-Type': 'application/json'
                        }, withCredentials: true
                });
                if(res.data){
                    setBMI(res.data.bmi.bmi)
                    setCategory(res.data.bmi.category)
                }

            }} action="">
        <div className='w-full h-190 flex flex-col gap-4 justify-start pt-5 items-center bg-zinc-900'>
            <div className='flex items-center justify-center'>
            <div className='text-zinc-100'>
            <p className='text-zinc-300 pl-2 pb-1'>Height(Ft)</p>
            <input onChange={(e) => {
                setHeight(e.target.value)
                // console.log(e.target.value)
            }} type="Number" step="any" className='bg-zinc-800 w-60 md:w-80 h-auto px-5 md:px-3 py-2 text-zinc-100 border-2 border-zinc-700 rounded-md text-center text-lg md:text-xl outline-none hover:bg-zinc-950 active:bg-zinc-950 hover:border-zinc-800 active:border-zinc-800' placeholder='Enter Your Height (e.g, 5.7...)' value={Height}/>
            </div>
            </div>
            <div className='flex items-center justify-center'>
            <div className='text-zinc-100'>
            <p className='text-zinc-300 pl-2 pb-1'>Weight(Kg)</p>
            <input onChange={(e) => {
                setWeight(e.target.value)
                // console.log(e.target.value)
            }} type="Number" step="any" className='bg-zinc-800 w-60 md:w-80 h-auto px-5 md:px-3  py-2 text-zinc-100 border-2 border-zinc-700 rounded-md text-center text-lg md:text-xl outline-none hover:bg-zinc-950 active:bg-zinc-950 hover:border-zinc-800 active:border-zinc-800' placeholder='Enter Your Weight (e.g, 60...)'value={Weight}/>
            </div>
            </div>

            <div className='bg-zinc-800 w-61 md:w-auto h-auto rounded-md mt-3 text-zinc-100 flex flex-col justify-center items-start gap-2 px-9 py-5'>
                <div className='flex gap-2 items-center justify-center overflow-hidden'>
                <h1 className='text-lg font-bold'>BMI: </h1><h1 className='text-lg font-bold'>{BMI}</h1>
                </div>
                <div className='flex gap-2 items-center justify-center overflow-hidden'>
                <h1 className='text-lg font-bold'>Category: </h1><h1 className='text-lg'>{Category}</h1>
                </div>
            </div>
            <button className='text-xl mt-9 h-11 w-38 font-semibold rounded-md hover:bg-[#981037] active:bg-[#981037] cursor-pointer hover:scale-95 active:scale-95 text-zinc-100 bg-[#CB2957]'>CALCULATE</button>
            
        </div>
        </form>

    </div>
    </>
  )
}

export default Page