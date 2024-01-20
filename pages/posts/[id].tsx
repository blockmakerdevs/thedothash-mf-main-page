import React, {useState, useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { GoVerified } from 'react-icons/go'
import { MdOutlineCancel } from 'react-icons/md'
import { BsFillPlayFill } from 'react-icons/bs';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import axios from 'axios'
import { BASE_URL } from '@/utils'
import { Video } from '../../types';
import useAuthStore from '@/store/authStore'
import LikeButton from '../../components/LikeButton'
import Comments from '../../components/Comments'


interface Props{
  postDetails: Video
}



export default function PostDetail({postDetails} : Props) {
  const router = useRouter()
  const {user} : {user: any} = useAuthStore()


  const [post, setPost] = useState<Video>(postDetails) // So we can manually change the post eg when someone likes the post it'll change that post to one with a like 
  
  const [comment, setComment] = useState<string>('')
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false)


  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false)
 
  // Pause and Play Func
  const onVideoClick = () => {
    if(isPlaying){
      videoRef?.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef?.current?.play()
      setIsPlaying(true)
    }
  }

  // Mutes The Video
  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isVideoMuted
    }
   }, [post, isVideoMuted])


   // Like Functions
  const handleLike = async(like:boolean) => {
    if(user) {
        const {data} = await axios.put(`${BASE_URL}/api/like`, {
          userId: user?._id,
          postId: post?._id,
          like: like
        })

        setPost({...post, likes: data?.likes})
    }
  }  


  // Add Comment Function
  const addComment = async (e:any) => {
    e.preventDefault()

    if(user && comment) {
      setIsPostingComment(true)
      const {data} = await axios.put(`${BASE_URL}/api/posts/${post?._id}`, {
        userId: user?._id,
        comment: comment
      })

      setPost({...post, comments: data?.comments})
      setComment('')
      setIsPostingComment(false)
    }
  }
  

  // If post doesn't exist
  if (!post) return null

  return (<> {post && (
    <div className='flex w-full absolute left-0 lg:left-2 top-0 lg:top-auto m-2 overflow-hidden bg-white flex-wrap lg:flex-nowrap'>
      <div className="relative  w-[1000px] lg:w-9/12 flex justify-center items-center bg-black">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className='cursor-pointer' onClick={() => router.back()}>
            <MdOutlineCancel className='text-white text-[35px]'/>
          </p>
        </div>
        
        <div className='relative'>
          <div className="lg:h-[80vh] h-[60vh]">
            <video src={post?.video?.asset?.url} className='h-full cursor-pointer'
             ref={videoRef} loop onClick={onVideoClick}></video>
          </div>
          <div className='absolute top-[45%] left-[45%] cursor-pointer'>
            {!isPlaying && (<button onClick={onVideoClick}>
              <BsFillPlayFill className='text-white text-6xl lg:text-8xl'/>
            </button>)}
          </div>
        </div>

        <div className='absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer'>
          {isVideoMuted ? <button onClick={() => setIsVideoMuted(false)}><HiVolumeOff className='text-white text-2xl lg:text-4xl'/></button>
                        : <button onClick={() => setIsVideoMuted(true)}><HiVolumeUp className='text-white text-2xl lg:text-4xl'/></button>
              }
        </div>
      </div>  

      <div className='relative w-[1000px] md:w-[900px] lg:w-[700px]'>
        <div className='lg:mt-20 mt-10'>
          <div className='flex gap-4 mb-4 bg-white w-full pl-10 cursor-pointer'>
            <div>
              <div className='text-md text-gray-600 italic lowercase tracking-wider flex gap-2 items-center justify-center'>
                <Image width={48} height={48} className="rounded-full" src={post?.postedBy?.image} alt="profile photo" />
                {post?.postedBy?.userName}{' '}
                <GoVerified className='text-blue-400 text-xl' />
              </div>

              <div className='px-10 pt-3'>
                <p className='text-xl font-bold'>{post?.caption}</p>
              </div>

              <div className='lg:mt-5 mt-2 px-10 flex items-center justify-center'>
                {user && (<LikeButton likes={post?.likes} handleLike={() => handleLike(true)} handleDislike={() => handleLike(false)} />)}
              </div>
            </div>
          </div>
          <Comments comment={comment} comments={post?.comments} setComment={setComment} addComment={addComment} isPostingComment={isPostingComment}/>
        </div>
      </div>
    </div>
)}
</>)
}


export const getServerSideProps = async ({params: {id}} : {params:{id: string}}) => {
    const {data} = await axios.get(`${BASE_URL}/api/posts/${id}`) 
    return {
        props: {
            postDetails: data
        }
    }
}
