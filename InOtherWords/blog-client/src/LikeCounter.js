import React, { useState } from 'react';

export default function LikeCounter({ type, prevCount }) {
    let imgsrc;
    type === 'like' ? imgsrc = 'like-emoji.png' : imgsrc = 'dislike-emoji.png';
    const [count, setCount] = useState(prevCount);
    function countClicks() {
        setCount(count + 1);

    }
    return (
        <>
            <button className='like-button' onClick={countClicks}>
                <img className='like-emoji' src={imgsrc} alt='like'></img> 
                <span className={type + '-count'}>{count}</span>
            </button>
            
        </>
    )
}
