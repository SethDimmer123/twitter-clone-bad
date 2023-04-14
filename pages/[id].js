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

    useEffect(
        () =>
          onSnapshot(doc(db, "posts", id), (snapshot) => {
            setPost(snapshot.data());
          }),
        [db]
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
      <div className="">

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