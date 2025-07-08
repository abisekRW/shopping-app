import { useState } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function Cart({ cart, setCart }) {
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
      // Merge cart items into purchases
      cart.forEach(cartItem => {
        const idx = purchases.findIndex(item => item.id === cartItem.id);
        if (idx !== -1) {
          purchases[idx].quantity += cartItem.quantity;
        } else {
          purchases.push({ ...cartItem });
        }
      });
      await setDoc(userDocRef, { purchases }, { merge: true });
      alert('Items purchased Successfully');
      setCart([]);
    } catch (err) {
      alert('Error saving purchase: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cart.map(item => (
              <div key={item.id} className="border p-2 mb-2 rounded">{item.name} - ₹{item.price} × {item.quantity}</div>
            ))}

            <p className="mt-4 font-bold">Total: ₹{total}</p>

            <button onClick={purchase} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 w-full rounded">
              {loading ? 'Processing...' : 'Purchase'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
