import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { act } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend, BarChart, Bar, PieChart, Pie } from 'recharts';
import Lenis from 'lenis'

const PageProfile = () => {
    const lenis = new Lenis();

// Use requestAnimationFrame to continuously update the scroll
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    raf();
    
    const [User, setUser] = useState([]);
    const [BMI, setBMI] = useState([]);
    const [error, setError] = useState('');
    const [BMIs, setBMIs] = useState([]);
    const [Activity, setActivity] = useState([]);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
 
    const dataUser = async () => {
            try {
                let res = await axios.get(`${API_URL}/profile`, {
                    withCredentials: true
                });

                if (res?.data?.success) {
                    let latestBMI = res.data.bmi?.[0];
                    setUser([res.data.user]);
                    console.log(res.data.bmi);
                    console.log(res.data.activitySorted);
                    console.log(res.data.bmi[0]);
                    setBMI(latestBMI? [latestBMI] : []);
                    setBMIs(res.data.bmi || []);
                    setActivity(res.data.activitySorted || []);
                    setError('');

                } else {
                    setError(res?.data?.message || 'Unable to load profile');
                }
            } catch (err) {
                console.error(err);
                setError('Please log in first to view your profile');
            }
        }

    useEffect(() => {
        dataUser();
        
    },[]);

    const updateActivityStatus = async (activity) => {
            let response = await axios.put(`${API_URL}/profile`,{
                activityId: activity._id,
                activityStatus: activity.activityStatus
            }, {
                withCredentials: true
        })
            if(response.data){
            console.log(response.data)
        }
        await dataUser();
    }

    const deleteActivity = async (activity) => {
            let fetchedData = await axios.post(`${API_URL}/profile`,{
                activityId: activity._id,
            }, {
                withCredentials: true
        })
            if(fetchedData.data){
            console.log(fetchedData.data)
        }
        await dataUser();
    }

    const logOut = async () => {
        console.log("Before Axios");
            let fetchedData = await axios.post(`${API_URL}/logout`,{
            }, {
                withCredentials: true
        })
            if(fetchedData.data){
            console.log(fetchedData.data)
            navigate('/login')
        }
        console.log("After Axios")
        await dataUser();
    }

  return (
    <>
    {error && (
        <div className='w-full flex flex-col justify-center items-center bg-zinc-800 text-center py-3 text-red-400 font-medium'>
            {error}
            <Link className='text-xl flex items-center justify-center mt-5 mb-8 h-10 md:h-13 w-28 md:w-29 font-semibold rounded-md hover:bg-[#981037] active:bg-[#981037] cursor-pointer hover:scale-95 active:scale-95 text-zinc-100 bg-[#CB2957]' to="/login">LOGIN</Link>
        </div>
    )}
    {User?.map((user) => (
    <form key={user._id} action="" onSubmit={(e) => {
        e.preventDefault();
        console.log("Button Clicked")
        logOut()
    }}>
    <div className='flex justify-end px-12 h-10'><button className='text-xl flex items-center justify-center mt-5 mb-8 h-10 md:h-11 w-28 md:w-29 font-semibold rounded-md hover:bg-[#981037] active:bg-[#981037] cursor-pointer hover:scale-95 active:scale-95 text-zinc-100 bg-[#CB2957]'>LOGOUT</button></div>
    </form>
    ))}
    <div className='h-auto w-full bg-zinc-900 justify-between md:px-12 px-7 gap-3 items-center flex flex-wrap py-4  md:py-5 text-zinc-100'>
            
            <div className='flex items-center justify-center gap-1 px-2 md:px-3'>
        <div className='h-24 w-24 md:w-30 md:h-30  rounded-full bg-zinc-300 overflow-hidden md:mx-3'>
            <img className='object-cover' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkzb0dW2wEKVLrObwnKjy5NiR-XYIV5AkMGZwotFHVGkYOvFeP_cGA-Ubg&s=10" alt="" />
        </div>
        {User?.map((user) => (
        <div key={user._id} className='flex flex-col justify-start items-center md:mr-9 bg-[#212121]  py-1 px-3 rounded-md w-auto md:w-auto'>
            <div className='w-full flex md:items-start'>
        <h1 className='mr-5 text-lg font-extrabold md:font-bold md:text-2xl'>{user?.username}</h1>
        </div>
        <div className='flex gap-1 text-zinc-400 md:pr-0 pr-1'>
        <h1 className=' text-sm font-extrabold  md:font-bold md:text-lg'>Joined On</h1>
        <h1 className=' text-sm font-extrabold  md:font-bold md:text-lg'>{user?.joinedAt?.slice(0, 10).split('-').reverse().join('-').slice(0, 10)}</h1>
        </div>
        </div>
        ))} </div>
        <div className='  gap-1 flex flex-col justify-center items-center'>
        <h1 className='hover:scale-95 hover:text-zinc-100 active:scale-95 active:text-zinc-100 hover:cursor-pointer'><i className="fa-solid fa-gear text-2xl md:text-4xl"></i></h1>
        <p className='text-sm md:font-bold font-semibold '>Settings</p> </div>
        </div>


        <div className='md:grid flex flex-col justify-center gap-4 md:grid-cols-3 md:gap-2 text-zinc-100 md:px-16 px-4 max-w-7xl mx-auto'>
        <div className='flex justify-between px-7 md:px-3 flex-wrap items-center rounded-md w-full h-auto md:max-w-90 md:h-auto md:pt-7 pb-5 pt-5 md:pb-7 md:mr-1 gap-12 bg-zinc-800 md:gap-3'>
            
        <div className='md:pl-7'>
            <h1 className='text-md font-bold mb-4'>Primary Metric</h1>
            <div className='flex items-end gap-2'>
                {BMI?.length ? (
                    BMI.map((bmi) => (
                        <h1 key={bmi._id} className='text-4xl md:text-5xl font-bold mb-1'>{bmi?.bmi}</h1>
                    ))
                ) : (
                    <h1 className='text-sm md:text-base font-semibold text-zinc-400'>No BMI data yet</h1>
                )}
            <h1 className='text-2xl md:text-2xl font-bold mb-1 text-zinc-300'>BMI</h1>
            </div>
            
            <div className='flex flex-wrap gap-1'>
            <h1 className='text-sm font-bold'>Category ~</h1>
            {BMI?.length ? (
                BMI.map((bmi) => (
                    <h1 key={bmi.calculatedAt} className='text-md font-bold'>{bmi?.category}</h1>
                ))
            ) : (
                <h1 className='text-sm md:text-base font-semibold text-zinc-400'>Can't Tell Yet</h1>
            )}
            </div>
        </div>
        
        <div className='md:pr-5'>
            <h1><i className="fa-solid fa-scale-unbalanced text-4xl"></i></h1>
        </div>
       
        </div>
        <div className='flex justify-start items-center rounded-md w-full h-auto md:max-w-90 md:h-auto md:pt-7 pb-5 pt-5 md:pb-7 bg-zinc-800 md:gap-3'>
        <div className='md:pl-7 pl-7 w-full pr-7'>
            <h1 className='text-md font-bold mb-4'>Weekly Trend</h1>
            <ResponsiveContainer width="100%" aspect={2}>
                <LineChart data={BMIs}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="day" interval={'preserveStartEnd'}/>
                    <YAxis dataKey="bmi" tickFormatter={(value) => 
                        value + " BMI"
                     }/>
                    <Legend />
                    <Tooltip dataKey="bmi" contentStyle={{backgroundColor:'#CB2957', outline:'none', borderRadius: '0.5rem'}} itemStyle={{color: 'white'}} />
                           <Line dataKey="bmi" type="monotone" activeDot={{ r: 5 }} stroke="skyblue" fill="skyblue" />
                    
                </LineChart>
            </ResponsiveContainer>
           
            
        </div>
       
        </div>

        <div className='flex justify-evenly items-center rounded-md w-full h-auto md:max-w-90 md:h-auto md:pt-7 pb-5 pt-5 md:pb-7 bg-zinc-800 md:gap-3 gap-4 md:pl-4'>
            <div className='flex flex-col'>
            <h1 className='text-md font-bold mb-4'>Steps(Today)</h1>
            <h1 className='text-md text-zinc-300 font-semibold'>Automatic Steps Tracking</h1>
            <h1 className='text-md text-zinc-300 font-semibold mb-1'>Coming Soon <i className="fa-solid fa-spinner"></i></h1>
            </div>
    
        <div className='md:pr-5'>
            <h1><i className="fa-solid fa-shoe-prints text-4xl rotate-270"></i></h1>
        </div>
       
        </div>
        </div>
        
        
        <div className='flex flex-col gap-5 px-4 md:px-16 max-w-7xl mx-auto'>
            <h1 className='text-md font-bold mb-1 mt-2 text-zinc-100'>Daily Goals</h1>
            {Activity?.length?(
                Activity?.map((activity) => (
            <div className='flex items-center justify-center gap-3'>
            <div key={activity._id} className={`w-full gap-4 rounded-md h-auto pt-4 pb-4 bg-[#CB2957] flex items-center justify-between px-3 ${activity.activityStatus? "opacity-40 line-through" : ""}`}>
                <h1 className='font-bold ml-2 text-2xl text-zinc-100'>{activity?.activity}</h1>
                <input type="checkbox" className="h-6 w-6 hover:scale-95 hover:text-zinc-100 active:scale-95 active:text-zinc-100 hover:cursor-pointer" checked={activity.activityStatus} onChange={() => updateActivityStatus(activity)}/>
            </div>
            <Link className='hover:scale-95 hover:text-zinc-100 active:scale-95 active:text-zinc-100' onClick={() => {
                deleteActivity(activity)
            }}><i className="fa-solid fa-trash-can text-zinc-100 text-2xl"></i></Link>
            </div>
            ))

            ) : (
                <h1 className='text-md text-zinc-300 font-semibold'>No Goals Yet!</h1>
            )
        
        }
        </div>
        <div className='w-full flex items-center justify-center'>
        <Link className='text-xl flex items-center justify-center mt-5 mb-8 h-11 md:h-13 w-59 md:w-86 font-semibold rounded-md hover:bg-[#981037] active:bg-[#981037] cursor-pointer hover:scale-95 active:scale-95 text-zinc-100 bg-[#CB2957]' to="/addActivity">ADD ACTIVITY</Link>
    </div>
    
    </>
  )
}

export default PageProfile