import React from 'react';
import useForm from './useForm';
import './AddComment.css';

export default function AddComment({ postId, setError }) {
    const [formData, setFormData] = useForm({
        //author: localStorage.username,
        body: ''
    });
    async function onSubmit(e) {
        e.preventDefault();
        //const event1 = { target: { name: 'auther', value: 'localStorage.username' } };
        setFormData({ target: { name: 'auther', value: 'localStorage.username' } });
       // setFormData({'author': localStorage.username, 'body': formData.body})
        try {
            const response = await fetch(`https://inotherwords-api.onrender.com/addComment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Unauthorized! You must log in before commenting.');
                }
                const errorText = await response.text();
                throw new Error(errorText);
            }
            //const event = { target: { name: 'body', value: '' } };
            setFormData({ target: { name: 'body', value: '' } });
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <form className='addCommentForm' onSubmit={onSubmit}>
            <textarea name='body' value={formData.body} onChange={setFormData} ></textarea>
            <button className='addComment'>Add Comment</button>
        </form>
    )
}
