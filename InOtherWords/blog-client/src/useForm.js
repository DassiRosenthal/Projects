import { useState } from 'react'

export default function useForm(initialValues) {
  const [formData, setFormData] = useState(initialValues);
  
  return [
    formData,
    e => setFormData({...formData, [e.target.name]: e.target.value})
  ]
}

