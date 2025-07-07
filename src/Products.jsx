import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Products({ cart, setCart }) {
  const products = [
    { id: 1, name: "Apple", price: 10 },
    { id: 2, name: "Banana", price: 5 },
    { id: 3, name: "Orange", price: 8 },
    { id: 4, name: "Mango", price: 15 },
    { id: 5, name: "Grapes", price: 12 },
    { id: 6, name: "Watermelon", price: 20 },
    { id: 7, name: "Strawberry", price: 18 },
    { id: 8, name: "Pineapple", price: 25 },
    { id: 9, name: "Kiwi", price: 30 },
  ];

  const [quantity, setQuantity] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const navigate = useNavigate()

  const plus = (id) => {
    setQuantity((old) => ({ ...old, [id]: (old[id] || 1) + 1 }));
  };

  const minus = (id) => {
    setQuantity((old) => ({
      ...old, [id]: old[id] > 1 ? old[id] - 1 : 1,
    }));
  };

  const add = (product) => {
    const qty = quantity[product.id] || 1;
    const exists = cart.find((item) => item.id === product.id);

    if (exists) {
      const updated = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
      setCart(updated);
    } else {
      setCart([...cart, { ...product, quantity: qty }]);
    }

    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

  };

  function gotocart () {
      navigate('/Cart');
    }

  return (
    <div className="p-4 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => {
        const isAdded = addedItems[product.id];
        return (
          <div key={product.id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p>₹{product.price}</p>

            <div className="flex items-center space-x-2 mt-2">
              <button
                onClick={() => minus(product.id)}
                className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"> - </button>
              <span>{quantity[product.id] || 1}</span>
              <button
                onClick={() => plus(product.id)}
                className="bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded"> + </button>
            </div>

            <button
              onClick={() => add(product)}
              disabled={isAdded}
              className={`text-white px-4 py-1 mt-3 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
              {isAdded ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        );
      })}

        <div className="col-span-full flex justify-center mt-4">
          <button className="bg-green-600 text-white py-2 px-6 rounded" onClick={gotocart}> Go to Cart </button>
        </div>
      
    </div>
  );
}

export default Products;
