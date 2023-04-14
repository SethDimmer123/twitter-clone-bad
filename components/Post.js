// most difficult component of the entire twitter bulid
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "@firebase/firestore";
import {
  ChartBarIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  ShareIcon,
  SwitchHorizontalIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import {
  HeartIcon as HeartIconFilled,
  ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { useRecoilState } from "recoil";
import { modalState, postIdState } from "../atoms/modalAtom";
import { db } from "../firebase";


function Post({ id, post, postPage }) {
  const { data: session } = useSession();
  //desctructuring posts and id and changing 
  // info dynamically with props in this component
  const [isOpen, setIsOpen] = useRecoilState(modalState)// this is globally available to me 
  const [postId, setPostId] = useRecoilState(postIdState)
  // imported the userecoilState 
  // and the modalState from the modal Atom and recoil. 
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const router = useRouter();


  useEffect(// fetching comments
    () =>
      onSnapshot(
        query(collection(db, "posts", id, "comments"), orderBy
          ("timestamp", "desc")),
        (snapshot) => setComments(snapshot.docs)

      ),
    [db, id]
  );


  useEffect(() =>
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    ), [db, id]//dependencies 2 in this case whenever there is something outside the useEffect i include the dependencies.
  );

  useEffect(
    () =>
      setLiked(//setting my likes inside the useEffect
        likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ), //finding the index and getting 1 like and checking like ID if it matches the session.user.id
    // and RETURNS AS TRUE INSTEAD OF FALSE.
    [likes]
  );

  const likePost = async () => {
    if (liked) {// IF LIKE IS TRUE 
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid))
    }//THEN I WILL DELETE DOCUMENT because i already created a collection
    else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });//once already liked to know if i already set liked i use a useEffect becasue by default setLiked is false.
    }
  };

  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700"
      onClick={() => router.push(`/${id}`)}
    >
      {!postPage && (
        <img src={post?.userImg} alt="" className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className="flex flex-col space-y-2 w-full">
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage && (
            <img src={post?.userImg} alt="Profile Pic"
              className="h-11 w-11 rounded-full mr-4"
            />
          )}
          <div className="text-[#6e767d]">
            <div className="inline-block group">
              <h4 className={`font-bold text-[15px] sm:text-base text-[#d9d9d9]
              group-hover:underline ${!postPage && "inline-block"}`}>{post?.username}</h4>
              <span className={`text-sm:text-[15px] ${!postPage && "ml-1.5"}`}>
                @{post?.tag}
              </span>
            </div>{" "}{/**spacing using js */}
            ·{" "}
            <span className="hover:underline text-sm sm:text-[15px]">
              <Moment fromNow>{post?.timestamp?.toDate()}</Moment>
              {/* moment js timestamps */}
            </span>
            {!postPage && (
              <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">{post?.text}</p>
            )}
          </div>
          <div className="icon group flex-shrink-0 ml-auto">
            <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
          </div>
        </div>
        {postPage && (
          <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
            {post?.text}
          </p>
        )}
        <img src={post?.image} alt=""
          className="rounded-2xl max-h-[700px] object-cover mr-2"
        />
        <div className={`text-[#6e767d] flex justify-between w-10/12 
        ${postPage && "mx-auto"
          }`}
        >
          {/* if it is a post page i want my left and right margin to be auto */}
          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();//prevents me from routing to a onclick 
              // routing when i do not have stop propagation on a button
              //  i will route to a new page
              // LIKE ICON AND CHAT ICON I HAVE STOP PROPOGATION
              setPostId(id);//setted this globally
              setIsOpen(true);//modalState
            }}
          >
            <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
              <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
            </div>
            {comments.length > 0 && (
              //if there is a single reply the comment number shows up
              <span className="group-hover:text-[#1d9bf0] text-sm">
                {comments.length}
              </span>
            )}
          </div>
          {session.user.uid === post?.id ? (//only users can delete their own posts
            <div
              className="flex items-center space-x-1 group"
              onClick={(e) => {
                e.stopPropagation();
                deleteDoc(doc(db, "posts", id));// go into(firebase) my database then posts folder with the id of the post i want to delete
                router.push("/");//when deleting my own post (user post) i want to reroute back to my home page
              }}
            >
              <div className="icon group-hover:bg-red-600/10">
                <TrashIcon className="h-5 group-hover:text-red-600" />
              </div>
            </div>
          ) : (// this icon below will show up only if the post is 
            // not of that particular user but some elses post then the switch 
            // horizontal i con below will show up.
            <div className="flex items-center space-x-1 group">
              <div className="icon group-hover:bg-green-500/10">
                <SwitchHorizontalIcon className="h-5 group-hover:text-green-500" />
              </div>
            </div>
          )}

          <div
            className="flex items-center space-x-1 group"
            onClick={(e) => {
              e.stopPropagation();
              likePost();// when clicked this function is activated
            }}
          >
            <div className="icon group-hover:bg-pink-600/10">
              {liked ? (//if liked the this icon will show otherwise the unfilled heart icon shows.
                <HeartIconFilled className="h-5 text-pink-600" />
              ) : (
                <HeartIcon className="h-5 group-hover:text-pink-600" />
              )}
            </div>
            {likes.length > 0 && (//if likes i greater than 0 display the likes
              <span
                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                  }`}
              >
                {likes.length}
              </span>
            )}
          </div>

          <div className="icon group">
            <ShareIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
          <div className="icon group">
            <ChartBarIcon className="h-5 group-hover:text-[#1d9bf0]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post

// session.user.image
// post?.userImg