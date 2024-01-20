import React, {useState} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {AiFillHome, AiOutlineMenu} from 'react-icons/ai'
import {ImCancelCircle} from 'react-icons/im'
import Discover from './Discover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'
import useAuthStore from '@/store/authStore';

const Sidebar = () => {
  const [showSideBar, setShowSideBar] = useState(true)
  
  const { fetchAllUsers, allUsers }: any = useAuthStore();

  const {pathname} = useRouter()

  const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded'
  const activeLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded';

    return (
    <div>
        <div className="block xl:hidden m-2 ml-4 mt-3 text-xl" onClick={() => setShowSideBar((prev) => !prev)}>
            {showSideBar ? <ImCancelCircle/> : <AiOutlineMenu/>}
        </div>
        {showSideBar && (<div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100 xl:border-0 p-3 '>
            
          

          <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
                <Link href='/'>
                    <div className={pathname === '/' ? activeLink : normalLink}>
                        <p className='text-2xl'><AiFillHome /></p>
                        <span className='capitalize text-xl hidden xl:block'>For You</span>
                    </div>
                </Link>
          </div>

          <Discover/>
          <SuggestedAccounts fetchAllUsers={fetchAllUsers} allUsers={allUsers} />
          <Footer/>
        </div>)}
    </div>
  )
}

export default Sidebar