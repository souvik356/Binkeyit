import React from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className='border-t'>
        <div className='p-4 text-center flex flex-col lg:flex-row lg: justify-between bg-slate-300'>
            <p>© All rights are reserved 2025</p>
             <div className='flex items-center justify-center gap-4 text-2xl lg: mt-3'>
             <a href='' ><FaFacebook/></a>
            <a href=''><FaInstagramSquare/></a>
            <a href=''><FaLinkedin/></a>
             </div>
        </div>
    </footer>
  )
}

export default Footer