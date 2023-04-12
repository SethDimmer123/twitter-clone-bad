import { SparklesIcon } from '@heroicons/react/outline';
import React from 'react'
import Input from '../components/Input';
import { useState,useEffect } from "react";
import { onSnapshot, collection, query, orderBy } from "@firebase/firestore";
import { db } from "../firebase";
import Post from "../components/Post";
import { useSession } from "next-auth/react";


function Feed() {
  const [posts,setPosts] = useState([]);
    // MESSY
  // useEffect(() => {// retrieving my posts
  //   const unsubscribe = onSnapshot(// snapshot function from firestore
  //     query(collection(db, "posts"), orderBy("timestamp", "desc")),
  //     (snapshot) => {//database
  //       setPosts(snapshot.docs);
  //     }
  //   );

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [db]);

  // CLEAN
  useEffect(//just fetched posts
    () =>
      onSnapshot(
        query(collection(db, "posts"), orderBy("timestamp", "desc")),
        (snapshot) => {
          setPosts(snapshot.docs);
        }
      ),
    [db]
  );

  console.log(posts);

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
    {/* rendering all posts */}
    <div className='pb-72'>
      {posts.map(post => (
        <Post key={post.id} id={post.id} post={post.data()}/>
      ))}
    </div>
  </div>
  );
}

export default Feed