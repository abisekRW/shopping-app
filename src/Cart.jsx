function Cart({ cart, setCart }) {

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const purchase = () => {
    localStorage.setItem('purchasedItems', JSON.stringify(cart));
    alert('Items purchased Successfully');
    setCart([])
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

          <button onClick={purchase} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-4 w-full rounded">Purchase</button>
        </>
      )}
    </div>
    </div>
    
  );
}

export default Cart;
