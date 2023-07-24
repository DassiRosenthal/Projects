import React, { useEffect, useState } from 'react';
import AddComment from './AddComment';
import Comment from './Comment';
import LikeCounter from './LikeCounter';
import { io } from 'socket.io-client';

export default function Post({ post/*: { _id, title, body, author, date, comments, likes, dislikes }*/, setError }) {
  let { _id, title, body, author, date, comments, likes, dislikes } = post;
  const [curPost, setPost] = useState(post);
  useEffect(() => {
    const socket = io('https://inotherwords-api.onrender.com/');
    socket.on('like', like => {
      if (curPost._id === like.post) {
       const newPost = {...curPost, likes: like.count};
       setPost(newPost);
      }
    });
    socket.on('dislike', dislike => {
      if (curPost._id === dislike.post) {
        const newPost = {...curPost, dislikes: dislike.count};
        setPost(newPost);
      }
    });
  },[curPost._id]);
  return (
    <div className='post'>
      <h2>{title}</h2>
      <h3>by {author} on {new Date(date).toLocaleString()} </h3>
      <article>{body}</article>
      <div className='comments'>
        <AddComment postId={_id} setError={setError} />
        <LikeCounter type='like' prevCount={likes || 0} postId={_id} setError={setError} />
        <LikeCounter type='dislike' prevCount={dislikes || 0} postId={_id} setError={setError} />
        {comments ? comments.map(c => <Comment key={c.id} comment={c} />) : ''}
      </div>

    </div>
  )

}
