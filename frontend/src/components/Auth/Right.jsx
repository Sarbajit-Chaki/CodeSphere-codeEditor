import React from 'react'
import Button from './Button'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'
import { GoogleOAuthProvider } from '@react-oauth/google'

const Right = ({ signIn }) => {

  const Google_clientId = import.meta.env.VITE_Google_Client_id;

  return (
    <>
      <div className="w-full h-fit lg:h-full flex flex-col-reverse lg:flex-col lg:px-12 lg:py-8">
        <nav className=' flex items-center justify-center lg:justify-end gap-x-4 lg:gap-x-6 mt-2 lg:mt-0'>
          <div className=' text-[#b1b1b1] '>
            {signIn ? "Don't have an account ?" : "Already have an account ?"}
          </div>
          <Button text={signIn ? "SIGN UP" : "LOG IN"} className={" hidden lg:block px-8 py-3"} />
          <div className='text-[#fb4c19] hover:underline block lg:hidden'>
            {signIn ? "SIGN UP" : "LOG IN"}
          </div>
        </nav>

        <div className=' w-full h-full flex justify-center items-start lg:justify-center xl:justify-start 2xl:justify-start lg:items-center'>
          <GoogleOAuthProvider clientId={Google_clientId}>
            {signIn ?
              <SignInForm className={"transition-all animate-popup"} />
              :
              <SignUpForm className={"transition-all animate-popup"} />
            }
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  )
}

export default Right