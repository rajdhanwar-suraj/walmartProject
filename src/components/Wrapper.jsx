import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Wrapper = ({ children }) => {
  return (
    <div className="">
      <ToastContainer />
      <div>{children}</div>
    </div>
  )
}

export default Wrapper