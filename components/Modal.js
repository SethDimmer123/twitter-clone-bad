import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
  } from "@firebase/firestore";
  import { Dialog, Transition } from "@headlessui/react";
  import { useSession } from "next-auth/react";
  import { useRouter } from "next/router";
  import { Fragment,useEffect, useState } from "react";
  import Moment from "react-moment";
  import { useRecoilState } from "recoil";
  import { modalState, postIdState } from "../atoms/modalAtom";
  import { db } from "../firebase";
  import {
    CalendarIcon,
    ChartBarIcon,
    EmojiHappyIcon,
    PhotographIcon,
    XIcon,
  } from "@heroicons/react/outline";

function Modal() {
    const {data: session} = useSession();
    //desctructuring posts and id and changing 
    // info dynamically with props in this component
    const [isOpen,setIsOpen] = useRecoilState(modalState)// this is globally available to me 
    const [postId,setPostId] = useRecoilState(postIdState)
    const [post,setPost] = useState();
   // imported the userecoilState 
  // and the modalState from the modal Atom and recoil. 
  const [comments, setComments] = useState("")
  const router = useRouter();


  if(postId === true) {
      useEffect(() =>
          onSnapshot(doc(db, "posts", postId), (snapshot) => {
            setPost(snapshot.data());
          }),
        [db,postId]
      );
  }


    return (//headless ui
    //code below just animations from headless UI
        <Transition.Root show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed z-50 inset-0 pt-8" onClose={setIsOpen}>
                <div className="flex items-start justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-[#5b7083] bg-opacity-40 transition-opacity" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom
                         bg-black rounded-2xl text-left overflow-hidden 
                         shadow-xl transform transition-all sm:my-8 sm:align-middle 
                         sm:max-w-xl sm:w-full">
                            <div className="flex items-center px-1.5 py-2 border-b
                            border-gray-700">
                                <div className="hoverAnimation w-9 h-9  flex 
                                items-center justify-center xl:px-0"
                                onClick={() => setIsOpen(false)}>
                                    <XIcon className="h-[22px] text-white"/>
                                </div>
                            </div>
                            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                                <div className="w-full">
                                    <div className="text-[#6e767d] flex gap-x-3 relative">
                                        <span className="w-0.5 h-full z-[-1] absolute
                                        left-5 top-11 bg-gray-600"/>
                                        <img src={post?.userImg} alt="" className="h-11 w-11 rounded-full"
                                        />
                                        <div>
                                            <div className="inline-block group">
                                                <h4 className="font-bold text-[#d9d9d9] inline-block 
                                                text-[15px] sm:text-base">{post?.username}
                                                </h4>
                                                <span className="ml-1.5 text-sm sm:text-[15px]">
                                                    @{post?.tag}
                                                </span>
                                            </div>{" "}
                                            ·{" "}
                                            <span className="hover:underline text-sm sm:text-[15px]">
                                                <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
                                                {/* moment js timestamps */}
                                                </span>
                                                <p className="text-[#d9d9d9] text-[15px]
                                                sm:text-base ">{post?.text}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <img src={session.user.image}
                                        className="h-11 w-11 rounded-full" alt=""/>
                                    </div>
                                </div>
                            </div>
                         </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Modal;