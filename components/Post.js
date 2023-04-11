function Post ({ id, post, postPage }) { //desctructuring posts and id and changing info dynamically with props in this component
  return (
    <div className="p-3 flex cursor-pointer border-b border-gray-700">
      {!postPage && (
        <img src={post?.userImg} alt="" className="h-11"/>
      )}
    </div>
  )
}

export default Post

// session.user.image
// post?.userImg