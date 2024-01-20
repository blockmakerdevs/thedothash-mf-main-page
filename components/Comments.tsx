import React, { Dispatch, SetStateAction } from 'react'
import {GoVerified} from 'react-icons/go'
import Image from 'next/image'
import Link from 'next/link'
import NoResults from './NoResults'
import useAuthStore from '@/store/authStore'
import { User } from '../types';


interface Props {
  isPostingComment: boolean
  comment: string
  addComment: (e: React.FormEvent) => void
  setComment: Dispatch<SetStateAction<string>>
  comments: Comment[]
}

interface Comment {
  comment: string
  length?: number
  _key: string
  postedBy: { _ref?: string; _id?: string };

}


export default function Comments({comment, comments, addComment, setComment, isPostingComment}: Props) {
  const {user, allUsers} : {user:any, allUsers:any} = useAuthStore()


  return (
    <div className='border-t-2 border-gray-200 pt-4 px-10 bg-[#F8F8F8] border-b-2 lg:pb-o pb-[100px]'>
      <div className='overflow-scroll lg:h-[475px]'>
        {comments?.length 
        ? (
          comments.map((comment:Comment, index: number) => (<>
            {allUsers?.map((user:User) => user?._id === comment?.postedBy?._id && (
              <div className=' p-2 items-center' key={index}>
                <Link href={`/profile/${user?._id}`}>
                  <div className='flex items-start gap-3'>
                    <div className='w-12 h-12'>
                      <Image width={48}  height={48}  className='rounded-full cursor-pointer'  src={user.image}  alt='user-profile'/>
                    </div>

                    <p className='flex cursor-pointer gap-1 items-center text-[18px] font-bold leading-6 text-primary'>
                      {user.userName}{' '}
                      <GoVerified className='text-blue-400' />
                    </p>
                  </div>
                </Link>
                <div>
                  <p className='-mt-5 ml-16 text-[16px] mr-8'>
                    {comment.comment}
                  </p>
                </div>
              </div>
            )
          )}
          </>))
        ) 
        : (<NoResults text="No comments yet!" />)}
      </div>

      {user && (<div className='absolute bottom-0 left-0 pb-6 px-2 md:px-10'>
        <form onSubmit={addComment} className='flex gap-4'>
          <input value={comment} onChange={(e) => {setComment(e.target.value)}} placeholder="Add comment...." 
          className='bg-primary px-6 py-4 text-medium font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg'/>
          <button onClick={addComment} className='text-md text-gray-400' >
            {isPostingComment ? 'Commenting....' : 'Comment'}
          </button>
        </form>
      </div>)}
    </div>
  )
}
