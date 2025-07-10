import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';

// Back to Home button uses material-icons (Google Fonts) for arrow icon

function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const typing = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(userCredential.user, { displayName: form.name });
      navigate('/login');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
        <div className="w-full flex justify-start max-w-md">
        </div>
      <form onSubmit={signup} className="bg-white w-full max-w-sm p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <input name="name" type="text" required placeholder="Username" onChange={typing} className="w-full px-3 py-2 border rounded"/>
        <input name="email" type="email" required placeholder="Email" onChange={typing} className="w-full px-3 py-2 border rounded"/>
        <input name="password" type="password" required placeholder="Password" onChange={typing} className="w-full px-3 py-2 border rounded"/>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Sign Up</button>
        <p className="text-sm text-center">Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </form>
    </div>
  );
}

export default Signup;
