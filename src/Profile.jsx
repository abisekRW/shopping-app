import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';


function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPurchaseHistory(userDocSnap.data().purchaseHistory || []);
        } else {
          setPurchaseHistory([]);
        }
      } else {
        setPurchaseHistory([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-purple-100 py-8">
      <div className="w-full flex justify-start max-w-lg mt-4">
        <button
          onClick={() => navigate('/Products')}
          className="group flex items-center gap-2 px-5 py-2 bg-white border-2 border-cyan-400 text-cyan-700 rounded-full shadow-md hover:bg-cyan-50 hover:border-cyan-600 hover:text-cyan-900 transition-all duration-200 font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-cyan-300"
          style={{ letterSpacing: '0.04em' }}
          aria-label="Go to main page"
        >
          <span className="inline-block text-2xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="hidden sm:inline font-semibold">Back</span>
        </button>
      </div>
        <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-8 border border-cyan-100">
          <h2 className="text-3xl font-extrabold text-cyan-700 mb-6 text-center tracking-wide drop-shadow">👤 Profile</h2>
          <div className="flex flex-col items-center justify-center py-8">
            <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 15.232A6 6 0 1112 6a6 6 0 013.232 9.232z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.5a9 9 0 0115 0" /></svg>
            <p className="text-gray-500 text-lg mb-6">Please log in or sign up to view your profile.</p>
            <div className="flex gap-4 w-full justify-center">
              <button
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-6 rounded-xl shadow transition-colors"
                onClick={() => navigate('/Signup')}
              >
                Sign Up
              </button>
              <button
                className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-semibold py-2 px-6 rounded-xl border border-cyan-300 shadow"
                onClick={() => navigate('/Login')}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const totalAmount = purchaseHistory.reduce((sum, entry) => {
    return sum + entry.items.reduce((itemSum, item) => itemSum + (item.price ? item.price * item.quantity : 0), 0);
  }, 0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-cyan-50 to-purple-100 py-4 sm:py-8 px-2 sm:px-0">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-4 sm:p-8 border border-cyan-100">
        <div className="flex items-center mb-4 sm:mb-6">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 mr-4 px-5 py-2 bg-white border-2 border-cyan-400 text-cyan-700 rounded-full shadow-md hover:bg-cyan-50 hover:border-cyan-600 hover:text-cyan-900 transition-all duration-200 font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-cyan-300"
            style={{ letterSpacing: '0.04em' }}
            aria-label="Go to main page"
          >
            <span className="inline-block text-2xl group-hover:-translate-x-1 transition-transform">←</span>
            <span className="hidden sm:inline font-semibold">Back</span>
          </button>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-cyan-700 tracking-wide drop-shadow">👤 Profile</h2>
        </div>
        <div className="flex flex-col items-center mb-6 sm:mb-8 mt-2">
          <div className="w-24 h-24 rounded-full bg-cyan-100 flex items-center justify-center mb-4 shadow">
            <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 15.232A6 6 0 1112 6a6 6 0 013.232 9.232z" /><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 20.5a9 9 0 0115 0" /></svg>
          </div>
          <p className="text-xl font-bold text-cyan-800 mb-1">{user?.displayName || user?.email || 'User'}</p>
          <span className="text-gray-400 text-sm">{user?.email}</span>
        </div>
        <div className="mb-4 flex flex-col sm:flex-row items-center justify-center gap-2">
          <span className="text-lg font-semibold text-cyan-700">Total Amount Spent:</span>
          <span className="text-2xl font-extrabold text-purple-700">₹{totalAmount}</span>
        </div>
        <div className="mb-6 sm:mb-8">
          <h3 className="text-lg font-bold mb-3 text-cyan-700 text-center">Purchase History</h3>
          {purchaseHistory.length === 0 ? (
            <div className="flex flex-col items-center py-8">
              <svg className="w-14 h-14 text-gray-200 mb-2" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v1" /></svg>
              <p className="text-gray-400 text-base">No previous purchases found.</p>
            </div>
          ) : (
            <div className="max-h-56 overflow-y-auto rounded-lg border border-cyan-50 bg-cyan-50 p-2 sm:p-4">
              {purchaseHistory.map((entry, idx) => {
                const entryTotal = entry.items.reduce((sum, item) => sum + (item.price ? item.price * item.quantity : 0), 0);
                return (
                  <div key={idx} className="mb-4 pb-2 border-b border-cyan-100 last:border-b-0 last:mb-0 last:pb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-cyan-700 text-sm">{new Date(entry.date).toLocaleString()}</span>
                      <span className="text-purple-700 font-bold text-sm">Total: ₹{entryTotal}</span>
                    </div>
                    <ul className="ml-2 text-gray-700 text-sm">
                      {entry.items.map((item, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{item.name}</span>
                          <span className="text-cyan-500">x{item.quantity}</span>
                          {item.price && (
                            <span className="ml-2 text-gray-400">₹{item.price * item.quantity}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 sm:py-3 rounded-xl font-semibold text-base sm:text-lg shadow hover:from-red-600 hover:to-pink-600 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
