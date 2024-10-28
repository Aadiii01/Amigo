import React from 'react'
import SignInForm from './SignInForm'
import SmallFooter from './SmallFooter';
import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Logo } from '@/Utils/Data';

const SignInPage = () => {

  return (
    <div className='basicLayout notMobile modernInApp hasLargeTypography signupSimplicity-registration simplicity'>
      <div className='nfHeader noBorderHeader signupBasicHeader onboarding-header'>
        <Link className='svg-nfLogo signupBasicHeader onboarding-header' to="/">
          <img className='svg-icon svg-icon-netflix-logo' src={Logo}/>
        </Link>
        <Link className='authLinks signupBasicHeader onboarding-header' to="/auth">
          <Button className="h-[30px] sm:h-[40px] border-1 border-solid border-white bg-[#e50914] hover:bg-[#e64e4e] 
          font-[NetflixR]">Sign Up</Button>
        </Link>
      </div>
      <SignInForm/>
      <div className='mt-16 lg:mt-0'>
        <SmallFooter colorfooter={"bg-[#f3f3f3]"} coptextcol={"text-black"} acol={"text-[#888]"}  hacol={"hover:text-[#111]"}/>
      </div>
    </div>
  )
}

export default SignInPage