import axios from 'axios';
import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'

const PageSignUp = () => {

    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;


  return (
    <>
    <div className='h-auto w-full bg-zinc-900 flex justify-center items-center flex-col'>
        <h1 className='text-4xl font-extrabold text-zinc-100 md:mr-3 mt-11'>SIGN UP</h1>
        <form onSubmit={async (e) => {
            e.preventDefault();

            let dataSignUp = {
                Username,
                Email,
                Password
            }

            let response = await axios.post(`${API_URL}signup`, dataSignUp, {
                headers: {
                    "Content-Type": 'application/json'
                }, withCredentials: true
            }
        );
        console.log(response.data);
        if(response.data){
            navigate('/profile');
        }

        }} action="">
        <div className='w-full h-190 flex flex-col gap-4 justify-start pt-5 items-center bg-zinc-900'>
            <div className='flex items-center justify-center'>
            <div className='text-zinc-100'>
            <p className='text-zinc-300 pl-2 pb-1'>Username</p>
            <input onChange={(e) => {
                setUsername(e.target.value)
                // console.log(e.target.value)
            }} type="text" className='bg-zinc-800 w-auto md:w-80 h-auto px-3 py-2 text-zinc-100 border-2 border-zinc-700 rounded-md text-center text-xl outline-none hover:bg-zinc-950 active:bg-zinc-950 hover:border-zinc-800 active:border-zinc-800' placeholder='Username' value={Username}/>
            </div>
            </div>
            <div className='flex items-center justify-center'>
            <div className='text-zinc-100'>
            <p className='text-zinc-300 pl-2 pb-1'>Email</p>
            <input onChange={(e) => {
                setEmail(e.target.value)
                // console.log(e.target.value)
            }} type="email" className='bg-zinc-800 w-auto md:w-80 h-auto px-3 py-2 text-zinc-100 border-2 border-zinc-700 rounded-md text-center text-xl outline-none hover:bg-zinc-950 active:bg-zinc-950 hover:border-zinc-800 active:border-zinc-800' placeholder='Email'value={Email}/>
            </div>
            </div>
            <div className='flex items-center justify-center'>
            <div className='text-zinc-100'>
            <p className='text-zinc-300 pl-2 pb-1'>Password</p>
            <input onChange={(e) => {
                setPassword(e.target.value)
                // console.log(e.target.value)
            }} type="password" className='bg-zinc-800 w-auto md:w-80 h-auto px-3 py-2 text-zinc-100 border-2 border-zinc-700 rounded-md text-center text-xl outline-none hover:bg-zinc-950 active:bg-zinc-950 hover:border-zinc-800 active:border-zinc-800' placeholder='Password'value={Password}/>
            </div>
            </div>

    
            <button className='text-xl mt-9 h-11 w-33 font-semibold rounded-md hover:bg-[#981037] active:bg-[#981037] cursor-pointer hover:scale-95 active:scale-95 text-zinc-100 bg-[#CB2957]'>SIGNUP</button>

            <Link className='text-zinc-300 hover:underline active:underline hover:text-zinc-100 active:text-zinc-100' to='/login'>Already have an Account? Login here</Link>
            
        </div>
        </form>

    </div>
    </>
  )
}

export default PageSignUp