import React from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import LikeCounter from './LikeCounter';

export default function Post({ post: { _id, title, body, author, date, comments, likes, dislikes }, setError }) {

  return (
    <div className='post'>
      <h2>{title}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()} </h3>
      <article>{body}</article>
      <div className='comments'>        
        <LikeCounter type='like' prevCount={likes || 0} />
        <LikeCounter type='dislike' prevCount={dislikes || 0} />
        <AddComment postId={_id} setError={setError} />
        {comments ? comments.map(c => <Comment key={c.id} comment={c} />) : ''}
      </div>

    </div>
  )

}
