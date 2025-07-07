import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const typing = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(form));
    navigate('/Login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 px-4">
      <form onSubmit={signup} className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input name="email" type="email" required placeholder="Email" onChange={typing} className="w-full px-3 py-2 border rounded"/>
        <input name="password" type="password" required placeholder="Password" onChange={typing} className="w-full px-3 py-2 border rounded"/>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
        <p className="text-sm text-center">Already have an account?{' '}<a href="/login" className="text-blue-600 hover:underline">Login</a></p>
      </form>
    </div>
  );
}

export default Signup;
