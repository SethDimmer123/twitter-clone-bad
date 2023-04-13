import {
    collection,
    deleteDoc,
    doc,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    addDoc
} from "@firebase/firestore";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
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
import { serverTimestamp } from "firebase/firestore";

function Modal() {
    const { data: session } = useSession();
    //desctructuring posts and id and changing 
    // info dynamically with props in this component
    const [isOpen, setIsOpen] = useRecoilState(modalState)// this is globally available to me 
    const [postId, setPostId] = useRecoilState(postIdState)
    const [post, setPost] = useState();
    // imported the userecoilState 
    // and the modalState from the modal Atom and recoil. 
    const [comments, setComments] = useState("")
    const router = useRouter();


    if (postId === true) {
        useEffect(() =>
            onSnapshot(doc(db, "posts", postId), (snapshot) => {
                setPost(snapshot.data());
            }),
            [db, postId]
        );
    }

    const sendComment = async (e) => {
        e.preventDefault();

        await addDoc(collection(db,'posts',postId,"comments"),{//collection called comments to firebase
            comment:comments,
            username:session.user.name,
            tag:session.user.tag,
            userImg:session.user.image,
            timestamp:serverTimestamp()
        })

        setIsOpen(false)
        setComments("")

        router.push(`/${postId}`)//pushing to id route
    };


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
                                    <XIcon className="h-[22px] text-white" />
                                </div>
                            </div>
                            <div className="flex px-4 pt-5 pb-2.5 sm:px-6">
                                <div className="w-full">
                                    <div className="text-[#6e767d] flex gap-x-3 relative">
                                        <span className="w-0.5 h-full z-[-1] absolute
                                        left-5 top-11 bg-gray-600"/>
                                        <img src={session.user.image} alt="" className="h-11 w-11 rounded-full"
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
                                            className="h-11 w-11 rounded-full mt-6" alt="" />
                                        <div className="flex-grow mt-2">
                                            <textarea
                                                value={comments}
                                                onChange={(e) => setComments(e.target.value)}
                                                placeholder="Tweet your reply"
                                                rows="2"
                                                className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[120px] pt-2"
                                            />
                                            <div className="flex items-center justify-between pt-2.5">
                                                    <div className="flex items-center">
                                                    <div className="icon">
                                                        <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon rotate-90">
                                                        <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon">
                                                        <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>

                                                    <div className="icon">
                                                        <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
                                                    </div>
                                                    </div>
                                                    <button
                                                    className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
                                                    type="submit"
                                                    onClick={sendComment}//function called send comment
                                                    disabled={!comments.trim()}
                                                    >
                                                    Reply
                                                    </button>
                                                </div>
                                            </div>
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