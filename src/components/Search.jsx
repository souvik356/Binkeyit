import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import useMobile from "../hooks/useMobile";
import { FaArrowLeft } from "react-icons/fa";


const Search = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const [isMobile] = useMobile()
  const[isSearchPage,setIsSearchPage] = useState(false)

  useEffect(()=>{
      const isSearch = location.pathname === '/search'
      setIsSearchPage(isSearch)
  },[location])
    
  //  console.log('search',isSearchPage);
   
  const redirectToSearchPage =()=>{
    navigate('/search')
  }

  return (
    <div className="w-full  min-w-[320px] lg:min-w-[420px] h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-zinc-100 group focus-within:border-primary-100">
      
      {
        (isMobile && isSearchPage) ?(
          <Link to={"/"} className="flex items-center h-full justify-center p-3 group-focus-within:text-primary-100 rounded-[50%] bg-slate-200">
          <FaArrowLeft />
        </Link>
        ):(
          <button className="flex items-center h-full justify-center p-3 group-focus-within:text-primary-100">
          <CiSearch size={25} />
        </button>
        )
      }
      <div className="w-full h-full flex items-center">
        {
          !isSearchPage ?(
            <div onClick={redirectToSearchPage}>
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed once, initially
                "Search 'Milk'",
                1000,
                "Search 'Rice'",
                1000,
                "Search 'Bread'",
                1000,
                "Search 'Condom'",
                1000,
                "Search 'Atta'",
                100
              ]}
              speed={50}
              style={{ fontSize: "1rem" }}
              repeat={Infinity}
            />
          </div>
          ):(
               <div className="w-full h-full">
                <input
                type="text"
                placeholder="Search for products and many more"
                autoFocus
                className="bg-transparent w-full outline-none h-full"
                />
               </div>
          )
        }
      </div>
    </div>
  );
};

export default Search;
