import React from 'react';
import { MdOutlineVideocamOff } from 'react-icons/md';
import {BiCommentX} from 'react-icons/bi'


const NoResults = ({text}: { text : string}) => {
  return (
    <div className='flex flex-col justify-center items-center h-full w-full'>
      <p className='text-8xl'>
        { text === "No comments yet!" 
        ? <></> 
        : <></>
        }
      </p>
      <p className='text-2xl text-center'>{text}</p>
    </div>
  );
};

export default NoResults