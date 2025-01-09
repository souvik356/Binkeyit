import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import SummaryApi, { baseUrl } from '../common/SummaryApi'
import { FaRegEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";

const ResetPassword = () => {
    const [newPassword,setNewPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const[showNewPassword,setShowNewPassword] = useState(false)
    const[showConfirmPassword,setShowConfirmPassword] = useState(false)

    const location = useLocation()
    // console.log('location',location);

    const navigate = useNavigate()

    useEffect(()=>{
        if(!(location?.state?.data?.success)){
            navigate('/')
        }
    },[])

    const handleSubmitBtn = async()=>{
        try {
            if(location?.state?.email){
                const response = await fetch(`${baseUrl}${SummaryApi.resetPassword.url}`,{
                    method : SummaryApi.resetPassword.method,
                    headers:{
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({
                        email: location?.state?.email,
                        newPassword : newPassword,
                        confirmPassword : confirmPassword
                    })
                })
                if(!response.ok){
                    // toast.error('something went wrong')
                    // console.log(response);
                    
                }
                
                const result = await response.json()
    
                if(result.error){
                    toast.error(result.message)
    
                }
                if(result.success){
                    toast.success(result.message)
                    navigate('/login')
                    setNewPassword('')
                    setConfirmPassword('')
                }
            }

            else{
                throw new Error('something went wrong')
            }
            
        } catch (error) {
            toast.error('Something went wrong')
            console.error(error.message || error)
        }
    }
    
  return (
    <div className='container mx-auto p-4'>
        <div className='max-w-lg bg-white mx-auto mt-6 p-6 rounded-lg'>
            <p className='font-bold mb-2 mt-2'>Reset your password :-</p>

            <div className='grid mb-2 mt-2 w-full'>
                <label>Password :-</label>
                <div className='flex items-center mt-3 w-full bg-blue-50 rounded-lg p-2'>
                <input
                type={showNewPassword ?'text':'password'}
                className=' bg-transparent outline-none w-full'
                placeholder='Enter your Password'
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                />
                <div onClick={()=>setShowNewPassword(!showNewPassword)}>
                    { showNewPassword?<LuEye size={20}/>:<FaRegEyeSlash size={20}/>}
                    </div>
                </div>
            </div>

            <div className='grid mt-5'>
                <label>Confirm-Password :-</label>
                <div className='flex items-center w-full mt-3 bg-blue-50 rounded-lg p-2 '>
                <input
                type={showConfirmPassword ?'text':'password'}
                className=' bg-transparent  mt-2 outline-none w-full'
                placeholder='Enter your Password'
                value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}
                />
                <div onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                { showConfirmPassword?<LuEye size={20}/>:<FaRegEyeSlash size={20}/>}
                </div>
                </div>
            </div>

            <button onClick={handleSubmitBtn} className='w-full bg-green-800 text-white rounded-lg p-2 mt-8'>Submit</button>
        </div>
    </div>
  )
}

export default ResetPassword