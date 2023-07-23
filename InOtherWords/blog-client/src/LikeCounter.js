import React, { useState } from 'react';

export default async function LikeCounter({ type, parent }) {
    let imgsrc;
    type === 'like' ? imgsrc = 'like-emoji.png' : imgsrc = 'dislike-emoji.png';
    const previousCount = 0 //await fetch() from db;
    const [count, setCount] = useState(previousCount);
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
