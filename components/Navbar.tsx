import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {GoogleLogin, googleLogout} from '@react-oauth/google'
import Logo from '../public/logo2.png'
import { createOrGetUser } from '@/utils'
import useAuthStore from '@/store/authStore'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { User } from '@/types'


const Navbar = () => {
  const { user, addUser, removeUser } : {user: any, addUser: any, removeUser: any} = useAuthStore() 
  
  const [searchValue, setSearchValue] = useState('')

  const router = useRouter()

  const handleSearch = (e: any) => {
    e.preventDefault()
    router.push(`/search/${searchValue}`)
  }

  const [userProfile, setUserProfile] = useState<User | null>();

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 px-2 md:px-4'>
        <Link href="/">
            <div className=' flex m-0'>
                <p className="flex  italic pt-7 pr-1">Dot Hash</p>
            </div>
        </Link>

        <div className='relative hidden md:block'>
          <form onSubmit={handleSearch}  className='absolute md:static top-10 -left-20 bg-white'>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)}
              className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full  md:top-0'
              placeholder='Search accounts and videos'
            />
            <button
              onClick={handleSearch}  className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400' >
              <BiSearch />
            </button>
          </form>
        </div>

        <div>
          {
            userProfile ? (
              <div className='flex gap-5 md:gap-10 pt-5'>
                <Link href='/upload'>
                  <button className='border-2 lg:pt-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                    <IoMdAdd className='text-xl' />{' '}
                    <span className='hidden md:block'>Upload </span>
                  </button>
                </Link>
                {userProfile?.image && (<Link href={`/profile/${userProfile?._id}`}>
                  <div>
                    <Image className='rounded-full cursor-pointer' src={userProfile?.image} alt='userProfile' width={40} height={40}/>
                  </div>
                </Link>)}
                <button type='button' className=' border-2 p-2 rounded-full cursor-pointer outline-none shadow-md' 
                  onClick={() => {
                    googleLogout();
                    removeUser()
                  }}
                >
                  <AiOutlineLogout color='red' fontSize={21} />
                </button>
              </div>
            ) : (
              <GoogleLogin 
                onSuccess={credentialResponse => createOrGetUser(credentialResponse, addUser)}
                onError={() => {console.log('Login Failed')}}/>
            )
          }
        </div>
        
          
    </div>
  )
}


export default Navbar