import React, { useState } from 'react';

export default function ClickCounter(props) {
    const [count, setCount] = useState(0);
    function countClicks(){
        setCount(count + 1);
    }
    return (
        <>
            <button onClick={countClicks}>Click Me!</button>
            {count > 0 ?
                <h3>The button was clicked {count} times.</h3>
                :
                <h4>Click the button to start counting.</h4>}
        </>
    )
}
