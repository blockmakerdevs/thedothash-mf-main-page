import CodeEditor from '@/components/CodeEditor'
import NoResults from '@/components/NoResults'
import VideoCard from '@/components/VideoCard'
import { Video } from '@/types'
import { BASE_URL } from '@/utils'
import axios from 'axios'



export default function Home({videos}: {videos: Video[]}) {
  
  return (
    <div className='flex flex-col gap-10 videos h-full'>{
      videos?.length ? videos?.map((video: Video) => (<VideoCard key={video._id} post={video}/>))
      : (<NoResults text="No Posts" />)
    }
    </div>
  )
}




export const getServerSideProps = async ({query: {topic}} : {query: {topic: string}}) => {


  return {
    props: {
      videos: [{
        _id: 'string',
        userId: 'string',
        caption: 'https://picsum.photos/200',
        video: {
            asset: {
                _id: 'string',
                url: 'string',
            }
        },
        postedBy: {
            _id: 'string',
            userName: 'string',
            image: 'https://picsum.photos/200',
        },
        likes: {
            postedBy: {
                _id: 'string',
                userName: 'string',
                image: 'https://picsum.photos/200',
            }
        },
        comments: {
            comment: 'string',
            _key: 'string',
            postedBy: {
                _ref: 'string',
            }
        }
    }]
    }
  }
} 