import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const typing = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser?.email === form.email && storedUser?.password === form.password) {
      navigate('/Mainpage');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4">
      <form onSubmit={login} className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input name="email" type="email" required placeholder="Email" className="w-full px-3 py-2 border rounded" onChange={typing}/>
        <input name="password" type="password" required placeholder="Password" className="w-full px-3 py-2 border rounded" onChange={typing}/>
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Login</button>
        <p className="text-sm text-center">Don’t have an account?{' '}<a href="/signup" className="text-green-600 hover:underline">Signup</a></p>
      </form>
    </div>
  );
}

export default Login;
