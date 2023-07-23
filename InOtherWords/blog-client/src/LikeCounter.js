import React, { useState } from 'react';

export default async function LikeCounter({ type, prevCount }) {
    let imgsrc;
    type === 'like' ? imgsrc = 'like-emoji.png' : imgsrc = 'dislike-emoji.png';
    const [count, setCount] = useState(prevCount);
    function countClicks() {
        setCount(count + 1);

    }
    return (
        <>
            <button onClick={countClicks}>
                <img src={imgsrc} alt='like'></img> <span>{count}</span>
            </button>
        </>
    )
}
