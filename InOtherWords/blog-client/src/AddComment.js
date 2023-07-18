import React from 'react';
import useForm from './useForm';
import './AddComment.css';

export default function AddComment({ postId, setError }) {
    const [formData, setFormData] = useForm({
        body: ''
    });

    async function onSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/addComment/${postId}`, {
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
            const event = {target: {name:'body', value:''}};
            setFormData(event);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <form className='addComment' onSubmit={onSubmit}>
            <textarea name='body' value={formData.body} onChange={setFormData} ></textarea>
            <button className='addComment'>Add Comment</button>
        </form>
    )
}
