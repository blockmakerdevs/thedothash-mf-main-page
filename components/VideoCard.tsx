import { Video } from '@/types'
import React, {useState, useEffect, useRef} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';
import CodeEditor from './CodeEditor'





const VideoCard = ({post} : {post: Video}) => {
 const [isHover, setIsHover] = useState(false)
 const [isPlaying, setIsPlaying] = useState(false)
 const [isVideoMuted, setIsVideoMuted] = useState(false)
 
 const videoRef = useRef<HTMLVideoElement>(null)

 const onVideoClick = () => {
  if(isPlaying){
    videoRef?.current?.pause()
    setIsPlaying(false)
  } else {
    videoRef?.current?.play()
    setIsPlaying(true)
  }
 }


 useEffect(() => {
  if (videoRef?.current) {
    videoRef.current.muted = isVideoMuted
  }
 }, [isVideoMuted])

  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 pb-2 cursor-pointer font-semibold'>
          
          <div className="md:w-16 md:h-16 w-10 h-10">
              <>
                <Image width={62} height={62} className="rounded-full" src={post?.postedBy?.image} alt="profile photo" />
              </>
          </div>
        
            <div className='flex items-center gap-2'>
              <p className='flex gap-2 items-center md:text-md font-bold text-primary'>{post?.postedBy?.userName}</p>{" "}
              <GoVerified className='text-blue-400 text-md' />
              <p className='capitalize font-medium text-xs text-gray-500 hidden md:block'>{post?.postedBy?.userName}</p>
            </div>

        </div>
      </div>

      <div className="lg:ml-20 flex gap-4 relative">
        <div onMouseEnter={() => {setIsHover(true)}} onMouseLeave={() => {setIsHover(false)}} className="rounded-3xl" style={{display: 'block', width: '100%'}}>
          <p>lorem lorem</p>
          <CodeEditor />
            {

              //<video src={post?.video?.asset?.url} loop ref={videoRef} className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded cursor-pointer bg-gray-100'></video>
            }
          
{
  /*

          {isHover && (<div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
            {isPlaying ? <button onClick={onVideoClick}><BsFillPauseFill className='text-black text-2xl lg:text-4xl'/></button>
                      : <button onClick={onVideoClick}><BsFillPlayFill className='text-black text-2xl lg:text-4xl'/></button>
            }
            {isVideoMuted ? <button onClick={() => setIsVideoMuted(false)}><HiVolumeOff className='text-black text-2xl lg:text-4xl'/></button>
                      : <button onClick={() => setIsVideoMuted(true)}><HiVolumeUp className='text-black text-2xl lg:text-4xl'/></button>
            }
          </div>)}
  */
}
        </div>
      </div>
    </div>
  )
}


export default VideoCard