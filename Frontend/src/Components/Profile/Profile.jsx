import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import SmallFooter from '../Auth/SmallFooter'
import { Logo } from '@/Utils/Data'
import ProfileForm from './ProfileForm'
import { useDispatch } from "react-redux";
import { checkUser } from '@/Store/userSlice'

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUser());
  }, [dispatch]);
  return (
    <div className='basicLayout notMobile modernInApp hasLargeTypography signupSimplicity-registration simplicity'>
    <div className='nfHeader noBorderHeader signupBasicHeader onboarding-header'>
      <Link className='svg-nfLogo signupBasicHeader onboarding-header'>
        <img className='svg-icon svg-icon-netflix-logo' src={Logo}/>
      </Link>
    </div>
    <div className='simpleContainer gradd'>
      <div className='centerContainer'>
        <ProfileForm/>
      </div>
    </div>
    <SmallFooter colorfooter={"bg-[#f3f3f3]"} coptextcol={"text-black"} acol={"text-[#888]"}  hacol={"hover:text-[#111]"}/>
  </div>
  )
}

export default Profile