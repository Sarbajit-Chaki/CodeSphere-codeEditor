import React from 'react'
import Left from './Left'
import Right from './Right'

const Login = () => {
  return (
    <>
      <div className="main w-full h-screen flex flex-col lg:flex-row overflow-hidden">
        <div className=" h-[30%] lg:w-1/2 lg:h-full">
          <Left />
        </div>
        
        <div className=" h-[70%] lg:w-1/2 lg:h-full">
          <Right signIn={true}/>
        </div>
      </div>
    </>
  )
}

export default Login
