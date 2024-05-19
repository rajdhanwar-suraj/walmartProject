import React, { useState, useContext, useEffect } from "react";
import logo from "../assets/logo1.png";
import { FaLayerGroup } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";
import { GoSearch } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { CiHeart } from "react-icons/ci";
import { BiBookmarkAltPlus } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import MainContext from './../ContextApi/MainContext';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const Navbar = () => {
  const systemContext = useContext(MainContext);
  const [signInExpanded, setSignInExpanded] = useState(false);
  const [userName, setUserName] = useState("Profile");
  const [searchBy, setSearchBy] = useState(systemContext.searchBy);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signin');
  };


  useEffect(() => {
    if (systemContext.userData.user && systemContext.userData.user.user) {
      setUserName(systemContext.userData.user.user.fname);
    }
  }, [systemContext.userData.user]);

  const handleSignInClick = () => {
    setSignInExpanded(!signInExpanded);
  };
  const handleSignOutClick = () => {
    console.log("signOut");
    systemContext.logout();
    toast.success("Log Out successful!", {
      position: "top-center"
    });
  };

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      systemContext.handleSearchSubmit(searchBy);
    }
  };

  const handleSearchClick = () => {
    systemContext.handleSearchSubmit(searchBy);
  };

  return (
    <>
      <div className="bg-[#0071dc] px-3 py-2 lg:px-8 text-white flex justify-between items-center">
        {/* Left */}
        <div className="flex  items-center gap-x-3 shrink-0">
          <div className="hover:bg-[#06529a] p-2 rounded-full ">
            <img src={logo} alt="" className="h-8" />
          </div>

          <div className="md:flex items-center gap-2 hidden hover:bg-[#06529a] p-3 rounded-full">
            <HiUserGroup className="text-[20px]" />
            <p className="text-[16px] font-semibold">{userName}</p>
          </div>
          <div className="md:flex hidden  items-center gap-2 hover:bg-[#06529a] p-3 rounded-full ">
            <FaLayerGroup className="text-[17px]" />
            <p className="text-[16px] font-semibold">Become a seller</p>
          </div>
        </div>
        {/* Middle */}
        <div className="hidden relative lg:flex items-center flex-1 mx-6">
          <input
            type="search"
            placeholder="Search everything at Walmart online and in store"
            value={searchBy}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
            className="rounded-full py-2 px-4 outline-none flex-1 h-12 text-black"
          />
          <div
            className="absolute bg-[#004f9a] p-1.5 rounded-full right-1.5 cursor-pointer"
            onClick={handleSearchClick}
          >
            <GoSearch className="text-white" />
          </div>
        </div>

        {/* Right */}
        <div className="flex  items-center gap-x-2">
          <div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full">
            <CiHeart className="text-[16px] font-semibold" />
            <p className="text-[16px] font-semibold">My Item</p>
          </div>
          {userName === "Profile" && (<div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap" onClick={handleSignInClick}>
            <MdLogout className="text-[20px] -rotate-90" />
            <p className="text-[16px] font-semibold">Sign in</p>
          </div>)}

          {userName !== "Profile" && (<div className="flex items-center gap-2 hover:bg-[#06529a] p-3 rounded-full whitespace-nowrap" onClick={handleSignOutClick}>
            <MdLogout className="text-[20px] -rotate-90" />
            <p className="text-[16px] font-semibold">Log Out</p>
          </div>)}
          <div className="hover:bg-[#06529a] p-3 rounded-full">
            <AiOutlineShoppingCart className="w-7 h-7" />
          </div>
        </div>
      </div>
      {/* Categories */}
      <div className="bg-[#f2f8fd] mt-[1px] text-navy px-3 py-2 lg:px-8 flex items-center gap-6">
        <div className="flex items-center gap-1 border border-solid border-transparent p-2 border-radius rounded-full hover:border-blue-500">
          <RxDashboard />
          <p className="text-[15px] font-bold">Departments</p>
        </div>
        <div className="flex items-center gap-1 border border-solid border-transparent p-2 border-radius rounded-full hover:border-blue-500">
          <TbLayoutDashboard />
          <p className="text-[15px] font-bold ">Services</p>
        </div>
        <div style={{ color: '#007bff' }}>|</div>

        <p className="text-[14px] hidden md:flex hover:underline">Deals</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Grocery & Essentials</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Mother's Day</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Teacher Appreciation</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Graduation</p>
        <p className="text-[14px] hidden md:flex hover:underline ">National Pet Month</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Home</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Fashion</p>
        <p className="text-[14px] hidden md:flex hover:underline ">New Toys</p>
        <p className="text-[14px] hidden md:flex hover:underline ">Registry</p>
        <p className="text-[14px] hidden md:flex hover:underline ">ONE Debit</p>
      </div>

      {/* Sign in section */}
      <div className="flex justify-end  relative">
        {signInExpanded && (
          <div className=" absolute top-0 right-8 border w-[15%] bg-white rounded-b p-2 z-10">
            <button onClick={handleClick} className="rounded-l-full rounded-r-full bg-blue-600 text-white py-1 px-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Sign in or create account</button>
            <div className="border-t border-gray-300 mt-2 py-2 ">
              <div className="flex items-center my-2" >
                <BiBookmarkAltPlus />
                <a href="/link2" className="underline pl-2 text-gray-600 text-sm">Purchase History</a>
              </div>
              <div className="flex items-center my-2">
                <img src={logo} alt="" className=" h-4" />
                <a href="/link2" className="underline pl-2 text-gray-600 text-sm">Walmart+</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;