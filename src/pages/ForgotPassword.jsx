import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import SummaryApi, { baseUrl } from '../common/SummaryApi'

const ForgotPassword = () => {
    const [data,setData] = useState({
       email:''
    })

    const navigate = useNavigate()

    const handleChange = (e)=>{
        const {name,value} = e.target

        setData((preve)=>{
            return{
             ...preve,
             [name] : value
            }
        })
    }
    // console.log(data);

    const isFieldEmpty = Object.values(data).every((key) => key)
    console.log('isDataEmpty',isFieldEmpty);
    
    const submitForm = async(e)=>{
        e.preventDefault()
        try{
            const response = await fetch(`${baseUrl}${SummaryApi.forgotPassword.url}`,{
                method: SummaryApi.forgotPassword.method,
                headers: {'Content-type' : 'application/json'},
                body: JSON.stringify(data)
            })
            const result = await response.json()
            console.log(result);
            if(result.error){
                toast.error(result.message)
            }
            if(result.success){
                toast.success(result.message)
                navigate('/otpVerification',{
                    state : {
                        email : data.email
                    }
                })
                setData({email:''})
            }
            
        }catch(error){
            toast.error('Something went wrong')
            console.log(error.message || error);
        }
    }
    

  return (
    <div className='container mx-auto mt-4 p-3'>
        <div className='max-w-lg bg-white mx-auto p-4 rounded-lg'>
            <form onSubmit={submitForm}>
            <p className='font-bold text-xl'>Forget Password</p>
            <div className='grid mt-3 mb-3'>
                <label htmlFor='email'>Email :-</label>
                <input
                placeholder='Enter your Email'
                className='p-2 rounded-lg bg-blue-50 mt-2 outline-none'
                id='email'
                name='email'
                value={data.email}
                onChange={handleChange}
                />
            </div>
            <button disabled={!isFieldEmpty} onClick={submitForm}  className={`w-full ${isFieldEmpty ?"bg-green-800":"bg-gray-500"} text-white p-2 rounded-lg mt-3`}>Send OTP</button>
            </form>
            <p className='mt-4'>Already have an account? <Link className='text-green-900 font-bold' to={'/login'}>Login</Link></p>
        </div>
    </div>
  )
}

export default ForgotPassword