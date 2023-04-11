import { useSession } from 'next-auth/react';
function Post({ id, post, postPage }) { //desctructuring posts and id
  const {data: session} = useSession();
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      {!postPage && (
        <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
      )}
      <div className='flex flex-col space-y-2 w-full'>
        <div className={`flex ${!postPage && "justify-between"}`}>
          {postPage &&(
          <img
          src={post?.userImg}
          alt=""
          className="h-11 w-11 rounded-full mr-4"
        />
          )}
        </div>
      </div>
    </div>
  )
}

export default Post

// session.user.image