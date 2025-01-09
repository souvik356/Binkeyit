import React from "react";
import logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
import { BsCart4 } from "react-icons/bs";


const Header = () => {
    const location = useLocation()
    const[ isMobile ] = useMobile()
    const navigate = useNavigate()
    // console.log('isMobile',isMobile);

    const isSearchPage = location.pathname === '/search'

    console.log('isSearchPage',isSearchPage);

    const redirectToLoginPage = ()=>{
         navigate('/login')
    }
    
    
  return (
    <header className="h-22 lg:h-20 shadow-md sticky top-0 flex items-center flex-col bg-white">
        {
            !(isMobile && isSearchPage) && <div className="container  flex items-center h-full px-2 justify-between mt-2">
            {/* logo */}
            <Link to={'/'}>
                <img src={logo} width={170} height={70} alt="logo" className="hidden lg:block " />
                <img src={logo} width={120} height={70} alt="logo" className="lg:hidden"/>
            
            </Link>
            {/* search*/}
             <div className="hidden lg:block">
                <Search />
             </div>
            {/* login and my cart*/}
            <div>
              {/* Desktop */}
                <div className="hidden lg:flex items-center gap-10">
                 <button className="font-thin text-xl" onClick={redirectToLoginPage}>Login</button>
                  <button className="flex items-center gap-2 bg-green-800 hover:bg-green-600 px-3 py-3 rounded-lg text-white">
                    <div className="animate-bounce">
                    <BsCart4 size={28} />
                    </div>
                    <div className="font-semibold">
                      <p>My cart</p>
                    </div>
                  </button>
                </div>
                {/* mobile  */}
                <div className="lg:hidden">
                    <button onClick={redirectToLoginPage}>
                    <FaUser size={25}/>
                    </button>
                </div>
            </div>
          </div>
        }
      
      <div className="container mx-auto px-4 mt-1 mb-2 lg:hidden">
        <Search />
      </div>
    </header>
  );
};

export default Header;
