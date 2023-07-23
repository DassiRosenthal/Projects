import React, { useState } from 'react';

export default function LikeCounter({ type, prevCount, postId, setError }) {
    let imgsrc;
    type === 'like' ? imgsrc = 'like-emoji.png' : imgsrc = 'dislike-emoji.png';
    const [count, setCount] = useState(prevCount);
    async function countClicks() {
        try {
            const response = await fetch(`https://inotherwords-api.onrender.com/addLike/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ 'type': type, 'count': count + 1 })
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized! You must log in before commenting.');
                }
                const errorText = await response.text();
                throw new Error(errorText);
            }
            setCount(count + 1);
        } catch (e) {
            setError(e.message);
        }
    }
    return (
        <>
            <button className='like-button' onClick={countClicks}>
                <img className='like-emoji' src={imgsrc} alt={type}></img>
                <span className={type + '-count'}>{count}</span>
            </button>

        </>
    )
}
