import { useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const purchase = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert('Please log in to purchase items.');
      return;
    }
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);
      let purchases = [];
      if (userDocSnap.exists()) {
        purchases = userDocSnap.data().purchases || [];
      }

      cart.forEach(cartItem => {
        const idx = purchases.findIndex(item => item.id === cartItem.id);
        if (idx !== -1) {
          purchases[idx].quantity += cartItem.quantity;
        } else {
          purchases.push({ ...cartItem });
        }
      });

      let purchaseHistory = userDocSnap.exists() ? (userDocSnap.data().purchaseHistory || []) : [];
      purchaseHistory.push({
        date: new Date().toISOString(),
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      });
      await setDoc(userDocRef, { purchases, purchaseHistory }, { merge: true });
      setCart([]);
      setLoading(false);
      const popup = document.createElement('div');
      popup.textContent = 'Items purchased Successfully';
      popup.className = 'fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 text-lg font-bold animate-fade-in-out';
      document.body.appendChild(popup);
      setTimeout(() => {
        popup.remove();
        navigate('/Products');
      }, 1500);
    } catch (err) {
      alert('Error saving purchase: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-100 py-4 sm:py-8 px-2 sm:px-0">
      <div className="w-full max-w-lg bg-white shadow-2xl rounded-2xl p-4 sm:p-8 border border-blue-100 mt-4">
        <div className="relative mb-4 sm:mb-6">
          <button
          onClick={() => navigate('/Products')}
          className="group flex items-center gap-2 px-5 py-2 bg-white border-2 border-cyan-400 text-cyan-700 rounded-full shadow-md hover:bg-cyan-50 hover:border-cyan-600 hover:text-cyan-900 transition-all duration-200 font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-cyan-300"
          style={{ letterSpacing: '0.04em' }}
          aria-label="Go to main page"
        >
          <span className="inline-block text-2xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="hidden sm:inline font-semibold">Back</span>
        </button>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 tracking-wide drop-shadow text-center">🛒 My Cart</h2>
        </div>
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 sm:py-12">
            <svg className="w-20 h-20 text-gray-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v1" /></svg>
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-blue-100 mb-4 sm:mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 sm:py-4 px-2 hover:bg-blue-50 rounded transition-all gap-2 sm:gap-0">
                  <div>
                    <span className="font-semibold text-blue-800 text-xl">{item.name}</span>
                    <span className="block text-gray-500 text-sm">Qty: {item.quantity}</span>
                  </div>
                  <div className="flex flex-row sm:flex-col items-end gap-2">
                    <span className="text-blue-600 font-bold text-xl">₹{item.price * item.quantity}</span>
                    <span className="block text-sm text-gray-400">₹{item.price} each </span>
                  </div>
                  <button
                    className="mt-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow transition-all w-full sm:w-auto"
                    onClick={() => setCart(cart.filter(i => i.id !== item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-xl font-bold text-blue-900">Total:</span>
              <span className="text-2xl font-extrabold text-purple-700">₹{total}</span>
            </div>
            <button
              onClick={purchase}
              disabled={loading}
              className={`transition-all duration-200 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 w-full rounded-xl shadow-lg font-semibold text-lg ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Purchase'
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
