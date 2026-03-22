// src/components/SignupForm.jsx
import { useState } from 'react';
import { signup } from '../services/auth';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signup({ name, email, password });
    if(res.error) setMessage(res.error);
    else setMessage('Signup Successful!');
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <input type="text" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
      <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
      <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 mb-4 border rounded" required />
      <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Signup</button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </form>
  )
}
