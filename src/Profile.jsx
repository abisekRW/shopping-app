import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        const userDocRef = doc(db, 'users', firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setPurchases(userDocSnap.data().purchases || []);
        } else {
          setPurchases([]);
        }
      } else {
        setPurchases([]);
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
      <div className="p-4 max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-cyan-700">Profile</h2>
        <p className="text-gray-600 mb-6">User details will be here.</p>
        <div className="flex flex-col gap-4">
          <button
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded transition-colors"
            onClick={() => navigate('/Signup')}
          >
            Sign Up
          </button>
          <button
            className="bg-cyan-100 hover:bg-cyan-200 text-cyan-700 font-semibold py-2 px-4 rounded transition-colors border border-cyan-300"
            onClick={() => navigate('/Login')}
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-cyan-700">Profile</h2>
      <div className="mb-6">
        <p className="text-lg font-semibold text-cyan-800">
          Welcome, {user?.displayName || user?.email || 'User'}!
        </p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-cyan-700">Previous Purchases</h3>
        {purchases.length === 0 ? (
          <p className="text-gray-500">No previous purchases found.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700">
            {purchases.map((item, idx) => (
              <li key={idx}>
                {item.name} (x{item.quantity})
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
