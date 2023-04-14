import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
  } from "@firebase/firestore";
  import { getProviders, getSession, useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { useEffect, useState } from "react";
  import { useRecoilState } from "recoil";
  import { modalState } from "../atoms/modalAtom";
  import Modal from "../components/Modal";
  import Sidebar from "../components/Sidebar";
  
//   import Widgets from "../components/Widgets";
  import Post from "../components/Post";
  import { db } from "../firebase";
  import { ArrowLeftIcon } from "@heroicons/react/solid";
//   import Comment from "../components/Comment";
  import Head from "next/head";
import Login from "../components/Login";
import Comment from "../components/Comment";




function PostPage({trendingResults, followResults, providers }) {
    const {data: session} = useSession();
    const [isOpen,setIsOpen] = useRecoilState(modalState);
    const router = useRouter();
    const { id } = router.query;
    //retrieved id from Post.js
    // object in console when routing to new page in the query 
    // tab is the same id that is in the URL.

    // console.log(router);
    const [post,setPost] = useState();
    const [comment,setComment] = useState([])

    useEffect(
        () =>
          onSnapshot(doc(db, "posts", id), (snapshot) => {
            setPost(snapshot.data());
          }),
        [db]
      );

      useEffect(
        () =>
          onSnapshot(
            query(
              collection(db, "posts", id, "comments"),
              orderBy("timestamp", "desc")
            ),
            (snapshot) => setComment(snapshot.docs)
          ),
        [db, id]
      );

      if (!session) return <Login providers={providers} />;

  return (
    <div className="">
    <Head>
      <title>
      {post?.username} on Twitter: "{post?.text}"
      </title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
      <Sidebar/>
      <div className="flex-grow border-l border-r border-gray-700 max-w-2xl sm:ml-[73px] xl:ml-[370px]">
        <div className="flex items-center px-1.5 py-2 border-b
         border-gray-700 text-[#d9d9d9] font-semibold text-xl
         gap-x-4 sticky  top-0 z-50 bg-black">
            <div className="hoverAnimation w-9 h-9 flex
            items-center justify-center xl:px-0"
            onClick={() => router.push("/")}>
                <ArrowLeftIcon className="h-5 text-white" />
            </div>
            Tweet
        </div>
        <Post id={id} post={post} postPage/>
        {comment.length > 0 && (
            <div className="pb-72">
                {comment.map(comment => (
                    <Comment key={comment.id} id={comment.id}
                    comment={comment.data()}/>
                ))}
            </div>
        )}
      </div>
      {/* Feed */}
      {/* <Feed/> */}
      {/* Widgets */}

      {/* Modal */}
      {isOpen && <Modal />}
      <Modal/>
      {/*only display modal if my isOpen state is true  */} 
    </main>
    </div>
  )
}

export default PostPage

export async function getServerSideProps(context) {
    const trendingResults = await fetch("https://www.jsonkeeper.com/b/NKEV").then(//api endpoint
      (res) => res.json()
    );
    const followResults = await fetch("https://jsonkeeper.com/b/WWMJ").then(//api endpoint
      (res) => res.json()
    );
    const providers = await getProviders();
    console.log(providers)
    const session = await getSession(context);// get rid of flickering of login page
  
    return {
      props: {
        trendingResults,
        followResults,
        providers,
        session,
        //prevents flickering of login (in react app)
      },
    };
  }