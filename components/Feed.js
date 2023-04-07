import { SparklesIcon } from '@heroicons/react/outline';
import React from 'react'
import Input from './input.js';

function Feed() {
    //   flex-grow lets me take as much space as possible for middle(feed component)
  return (
  <div className='text-white flex-grow border-l border-r
  border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]'>
  <div className='text-[#d9d9d9] flex items-center
  sm:justify-between py-2 px-2 sticky top-0 z-50 bg-black
  border-b border-gray-700'>
{/* when using position fixed or sticky i always have to give the top value */}
    <h2 className='text-lg sm:text-xl font-bold'>Home</h2>
    <div className='hoverAnimation w-9 flex items-center justify-center
    xl:px-0 ml-auto'>
        <SparklesIcon className='h-5 text-white'/>
        </div>  
    </div>


    <Input />
  </div>
  );
}

export default Feed