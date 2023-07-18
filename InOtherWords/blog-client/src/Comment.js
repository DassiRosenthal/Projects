import React from 'react'

export default function Comment({ comment: { author, date, body } }) {

    return (
        <div className='Comment'>
            <h4>by {author} on {new Date(date).toLocaleString()}</h4>
            <article>{body}</article>
        </div>
    )
}
