import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import SummaryApi, { baseUrl } from '../common/SummaryApi'
import { FaRegEyeSlash } from "react-icons/fa";
import { LuEye } from "react-icons/lu";

const Login = () => {
  const[formData,setFormData] = useState({
    email : "",
    password : ""
  })
    const[showNewPassword,setShowNewPassword] = useState(false)
    const[showConfirmPassword,setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e)=>{
    //  console.log(e.target);
     const {name,value} = e.target
     setFormData((preve)=>{
       return{
        ...preve,
        [name] :value
       }
     })   
  }
  const isValidField = Object.values(formData).every((key) => key)
  // console.log('isValidField',isValidField);
  
  // console.log(formData);
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${baseUrl}${SummaryApi.login.url}`,{
        method: SummaryApi.login.method,
        headers:{
          'Content-type' :'Application/json'
        },
        body: JSON.stringify(formData)
      })
      const result = await response.json()
      if(result.error){
        toast.error(result.message)
        
      }
      if(result.success){
        toast.success(result.message)
        setFormData({
          email:'',
          password:''
        })
        navigate('/')
      }
    } catch (error) {
      console.log(error.message || error);
      toast.error('Something went wrong please try again later')
    }
  }


  
  return (
    <div className='container mx-auto p-2'>
       <div className='max-w-lg mt-4 bg-white mx-auto p-4 rounded-lg'>
           <form onSubmit={handleSubmit}>

            {/* email */}
             <div className='grid mb-4'>
             <label htmlFor='email'>Email :-</label>
             <input 
             type='text' 
             id='email'
             className='bg-blue-50 mt-1 p-2 outline-none rounded-lg'
             placeholder='Enter your Email-Id'
             value={formData.email}
             name='email'
             onChange={handleChange}
             />
             </div>  

             {/* password */}
             <div className='grid mb-4'>
             <label htmlFor='password'>Password :-</label>
             <div className='flex items-center mt-3 w-full bg-blue-50 rounded-lg p-2'>
                <input
                type={showNewPassword ?'text':'password'}
                name='password'
                className=' bg-transparent outline-none w-full'
                placeholder='Enter your Password'
                value={formData.password}
                onChange={handleChange}
                />
                <div onClick={()=>setShowNewPassword(!showNewPassword)}>
                    { showNewPassword?<LuEye size={20}/>:<FaRegEyeSlash size={20}/>}
                    </div>
                </div>
             </div>
              <div className='text-right'>
                <Link to={'/forgotPassword'} className='text-green-900 font-bold'>Forgot password?</Link>
              </div>
             <button disabled={!isValidField} className={`w-full ${isValidField? 'bg-green-800':'bg-gray-500'} mt-4 text-white py-2 rounded-lg mb-4`}>Login</button>
             </form>
           <p>Don't have an Account? <Link to={'/register'} className='text-green-900 font-bold'>Register!</Link></p>
       </div>
    </div>
  )
}

export default Login