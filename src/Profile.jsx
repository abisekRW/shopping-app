import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
      const purchased = JSON.parse(localStorage.getItem('purchases')) || [];
      setPurchases(purchased);
    }
  }, []);

  if (!localStorage.getItem('isLoggedIn')) {
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
        <p className="text-lg font-semibold text-cyan-800">Welcome, {user?.name || 'User'}!</p>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2 text-cyan-700">Previous Purchases</h3>
        {purchases.length === 0 ? (
          <p className="text-gray-500">No previous purchases found.</p>
        ) : (
          <ul className="list-disc pl-6 text-gray-700">
            {purchases.map((item, idx) => (
              <li key={idx}>{item.name} (x{item.quantity})</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Profile;
