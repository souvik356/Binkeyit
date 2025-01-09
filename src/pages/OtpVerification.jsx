import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import SummaryApi, { baseUrl } from '../common/SummaryApi'
import { useLocation, useNavigate } from 'react-router-dom'

const OtpVerification = () => {
    const[otp,setOtp] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    console.log('location',location);

    useEffect(()=>{
        if(!(location?.state?.email)){
            navigate('/forgotPassword')
        }
    })
    
    // const [error,setError] = useState('')
    const handleChange = (e)=>{
        setOtp(e.target.value)
    }
    console.log(otp);

    
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        
       try {
        const response = await fetch(`${baseUrl}${SummaryApi.verifyOtp.url}`,{
            method: SummaryApi.verifyOtp.method,
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify({
                otp: otp,
                email : location?.state?.email
            })
        })

        const result = await response.json()
        console.log(result);
        if(result.error){
            toast.error(result.message)
        }
        if(result.success){
            toast.success(result.message)
            navigate('/resetPassword',{
                state : {
                    data : result,
                    email: location.state.email
                }
            })
            setOtp('')
        }
       } catch (error) {
         toast.error('something went wrong')
         console.log(error || error.message);
       }
        
        
    }


    

  return (
    <div className='container mx-auto p-2'>
        <div className='max-w-lg bg-white mx-auto mt-4 rounded-lg p-4'>
             <p className='mt-3 mb-3 font-bold'>OTP verification :-</p>
             <div className='grid'>
                <form onSubmit={handleSubmit}>
                 <label>Enter your OTP:-</label>
                            <input
                            minLength={6}
                            maxLength={6}
                            value={otp}
                            name='otp'
                            className='p-2 bg-blue-50 mt-3 rounded-lg outline-none text-center w-full'
                            onChange={handleChange}
                            />
             
             <button  className='bg-green-800 text-white w-full p-2 rounded-lg mt-6'>Submit OTP</button>
             </form>
             </div>
        </div>
    </div>
  )
}

export default OtpVerification