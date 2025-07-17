import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import apple from './assets/fruits-vegetables/apple.png';
import banana from './assets/fruits-vegetables/banana.jpg';
import orange from './assets/fruits-vegetables/orange.jpg';
import mango from './assets/fruits-vegetables/mango.jpg';
import grapes from './assets/fruits-vegetables/grapes.jpeg';
import watermelon from './assets/fruits-vegetables/watermelon.jpeg';
import strawberry from './assets/fruits-vegetables/strawberry.jpeg';
import pineapple from './assets/fruits-vegetables/pineapple.jpg';
import chips from './assets/snacks/chips.jpg';
import chocolates from './assets/snacks/chocolates.jpg';
import cookies from './assets/snacks/cookies.jpg';
import nuts from './assets/snacks/nuts.jpg';
import popcorn from './assets/snacks/popcorn.jpg';
import bluetoothspeaker from './assets/electronics/bluetoothspeaker.jpg';
import camera from './assets/electronics/camera.jpg';
import gameconsole from './assets/electronics/gameconsole.jpg';
import headphones from './assets/electronics/headphones.jpg';
import powerbank from './assets/electronics/powerbank.jpeg';
import smarttv from './assets/electronics/smarttv.jpg';
import smartwatch from './assets/electronics/smartwatch.jpg';
import tablet from './assets/electronics/tablet.jpg';
import vrheadset from './assets/electronics/vrheadset.jpg';
import phonecase from './assets/mobile-accessories/phonecase.jpg';
import screenguard from './assets/mobile-accessories/screenguard.jpg';
import charger from './assets/mobile-accessories/charger.jpg';
import earphones from './assets/mobile-accessories/earphones.jpg';
import carmount from './assets/mobile-accessories/carmount.jpg';
import selfiestick from './assets/mobile-accessories/selfiestick.jpg';
import usbcable from './assets/mobile-accessories/usbcable.jpg';
import wirelesscharger from './assets/mobile-accessories/wirelesscharger.jpg';
import bttracker from './assets/mobile-accessories/bluetoothtracker.jpg';
import mac from './assets/laptops/macbookpro.jpg';
import dell from './assets/laptops/dellinspiron.jpg';
import hp from './assets/laptops/hppavilion.jpg';
import thinkpad from './assets/laptops/lenovothinkpad.jpg';
import acer from './assets/laptops/aceraspire.jpg';
import asus from './assets/laptops/asuszenbook.jpg';
import surface from './assets/laptops/microsoftsurface.jpg';
import msi from './assets/laptops/msimodern.jpg';
import samsungbook from './assets/laptops/samsunggalaxybook.jpg';

const imageLinks = {
  apple, banana, orange, mango, grapes, watermelon, strawberry, pineapple,
  chips, chocolates, cookies, nuts, popcorn,
  bluetoothspeaker, camera, gameconsole, headphones, powerbank, smarttv, smartwatch, tablet, vrheadset,
  phonecase, screenguard, charger, earphones, carmount, selfiestick, usbcable, wirelesscharger, bttracker,
  mac, dell, hp, thinkpad, acer, asus, surface, msi, samsungbook
};

function Products({ cart, setCart }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);
  const fruitsAndVegetables = [
    { id: 1, name: "Apple", price: 10, image: imageLinks.apple },
    { id: 2, name: "Banana", price: 5, image: imageLinks.banana },
    { id: 3, name: "Orange", price: 8, image: imageLinks.orange },
    { id: 4, name: "Mango", price: 15, image: imageLinks.mango },
    { id: 5, name: "Grapes", price: 12, image: imageLinks.grapes },
    { id: 6, name: "Watermelon", price: 20, image: imageLinks.watermelon },
    { id: 7, name: "Strawberry", price: 18, image: imageLinks.strawberry },
    { id: 8, name: "Pineapple", price: 25, image: imageLinks.pineapple },
  ];
  const snacks = [
    { id: 16, name: "Chips", price: 20, image: imageLinks.chips },
    { id: 17, name: "Cookies", price: 30, image: imageLinks.cookies },
    { id: 18, name: "Chocolate", price: 25, image: imageLinks.chocolates },
    { id: 19, name: "Nuts", price: 40, image: imageLinks.nuts },
    { id: 20, name: "Popcorn", price: 15, image: imageLinks.popcorn },
  ];
  const electronics = [
    { id: 21, name: "Headphones", price: 1200, image: imageLinks.earphones },
    { id: 22, name: "Smart Watch", price: 2500, image: imageLinks.smartwatch },
    { id: 23, name: "Bluetooth Speaker", price: 1800, image: imageLinks.bluetoothspeaker },
    { id: 30, name: "Tablet", price: 15000, image: imageLinks.tablet },
    { id: 31, name: "Camera", price: 22000, image: imageLinks.camera },
    { id: 32, name: "Power Bank", price: 1200, image: imageLinks.powerbank },
    { id: 33, name: "VR Headset", price: 8000, image: imageLinks.vrheadset },
    { id: 34, name: "Smart TV", price: 35000, image: imageLinks.smarttv },
    { id: 35, name: "Game Console", price: 40000, image: imageLinks.gameconsole },
  ];
  const mobileAccessories = [
    { id: 24, name: "Phone Case", price: 300, image: imageLinks.phonecase },
    { id: 25, name: "Screen Guard", price: 150, image: imageLinks.screenguard },
    { id: 26, name: "Charger", price: 500, image: imageLinks.charger },
    { id: 36, name: "Earphones", price: 350, image: imageLinks.earphones },
    { id: 37, name: "Car Mount", price: 450, image: imageLinks.carmount },
    { id: 38, name: "Selfie Stick", price: 250, image: imageLinks.selfiestick },
    { id: 39, name: "USB Cable", price: 120, image: imageLinks.usbcable },
    { id: 40, name: "Wireless Charger", price: 900, image: imageLinks.wirelesscharger },
    { id: 41, name: "Bluetooth Tracker", price: 600, image: imageLinks.bttracker },
  ];
  const laptops = [
    { id: 27, name: "MacBook Pro", price: 120000, image: imageLinks.mac },
    { id: 28, name: "Dell Inspiron", price: 70000, image: imageLinks.dell },
    { id: 29, name: "HP Pavilion", price: 65000, image: imageLinks.hp },
    { id: 42, name: "Lenovo ThinkPad", price: 60000, image: imageLinks.thinkpad },
    { id: 43, name: "Acer Aspire", price: 55000, image: imageLinks.acer },
    { id: 44, name: "Asus ZenBook", price: 75000, image: imageLinks.asus },
    { id: 45, name: "Microsoft Surface", price: 95000, image: imageLinks.surface },
    { id: 46, name: "MSI Modern", price: 80000, image: imageLinks.msi },
    { id: 47, name: "Samsung Galaxy Book", price: 85000, image: imageLinks.samsungbook },
  ];

  const plus = (id) => {
    setQuantity((old) => ({ ...old, [id]: (old[id] || 1) + 1 }));
  };

  const minus = (id) => {
    setQuantity((old) => ({
      ...old,
      [id]: old[id] > 1 ? old[id] - 1 : 1,
    }));
  };

  const add = async (product) => {
    if (!user) {
      alert("Please log in to purchase items.");
      navigate("/Login");
      return;
    }

    const qty = quantity[product.id] || 1;
    const exists = cart.find((item) => item.id === product.id);
    let newCart;

    if (exists) {
      newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + qty }
          : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: qty }];
    }

    setCart(newCart);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

    // Save purchase to Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);
    let purchases = [];
    if (userDocSnap.exists()) {
      purchases = userDocSnap.data().purchases || [];
    }
    const idx = purchases.findIndex((item) => item.id === product.id);
    if (idx !== -1) {
      purchases[idx].quantity += qty;
    } else {
      purchases.push({ ...product, quantity: qty });
    }
    await setDoc(userDocRef, { purchases }, { merge: true });
  };

  const goToCart = () => navigate("/Cart");

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-2 sm:p-4">
      <div className="w-full flex justify-start mb-2 sm:mb-4">
        <button
          onClick={() => navigate('/')}
          className="group flex items-center gap-2 px-5 py-2 bg-white border-2 border-cyan-400 text-cyan-700 rounded-full shadow-md hover:bg-cyan-50 hover:border-cyan-600 hover:text-cyan-900 transition-all duration-200 font-bold text-lg tracking-wide focus:outline-none focus:ring-2 focus:ring-cyan-300"
          style={{ letterSpacing: '0.04em' }}
          aria-label="Go to main page"
        >
          <span className="inline-block text-2xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="hidden sm:inline font-semibold">Back</span>
        </button>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8 text-cyan-700">Shop by Category</h2>
      <div className="flex flex-wrap justify-center mb-4 sm:mb-8 gap-2">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 0 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(0)}
        >
          Fruits & Vegetables
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 1 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(1)}
        >
          Snacks
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 2 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(2)}
        >
          Electronics
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 3 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(3)}
        >
          Mobile Accessories
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition-colors duration-200 focus:outline-none ${page === 4 ? 'bg-cyan-500 text-white shadow' : 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'}`}
          onClick={() => setPage(4)}
        >
          Laptops
        </button>
      </div>
      {page === 0 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Fruits &amp; Vegetables</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {fruitsAndVegetables.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div
                  key={product.id}
                  className="border p-4 sm:p-6 rounded-2xl shadow-lg bg-white bg-opacity-90 flex flex-col justify-between items-center min-w-[160px] max-w-[340px] w-full sm:min-w-[220px] h-[320px] sm:h-[360px]"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}

                  <h4 className="text-lg font-semibold text-center">{product.name}</h4>
                  <p className="text-base mb-2">₹{product.price}</p>

                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`mt-auto text-white px-4 py-2 w-full rounded-lg text-base font-semibold ${isAdded
                      ? "bg-green-600 cursor-default"
                      : "bg-cyan-500 hover:bg-green-600"
                      }`}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>

              );
            })}
          </div>
        </>
      )}
      {page === 1 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Snacks</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {snacks.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div
                  key={product.id}
                  className="border p-4 sm:p-6 rounded-2xl shadow-lg bg-white bg-opacity-90 flex flex-col justify-between items-center min-w-[160px] max-w-[340px] w-full sm:min-w-[220px] h-[320px] sm:h-[360px]"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}

                  <h4 className="text-lg font-semibold text-center">{product.name}</h4>
                  <p className="text-base mb-2">₹{product.price}</p>

                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`mt-auto text-white px-4 py-2 w-full rounded-lg text-base font-semibold ${isAdded
                      ? "bg-green-600 cursor-default"
                      : "bg-cyan-500 hover:bg-green-600"
                      }`}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>

              );
            })}
          </div>
        </>
      )}
      {page === 2 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Electronics</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {electronics.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div
                  key={product.id}
                  className="border p-4 sm:p-6 rounded-2xl shadow-lg bg-white bg-opacity-90 flex flex-col justify-between items-center min-w-[160px] max-w-[340px] w-full sm:min-w-[220px] h-[320px] sm:h-[360px]"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}

                  <h4 className="text-lg font-semibold text-center">{product.name}</h4>
                  <p className="text-base mb-2">₹{product.price}</p>

                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`mt-auto text-white px-4 py-2 w-full rounded-lg text-base font-semibold ${isAdded
                      ? "bg-green-600 cursor-default"
                      : "bg-cyan-500 hover:bg-green-600"
                      }`}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>

              );
            })}
          </div>
        </>
      )}
      {page === 3 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Mobile Accessories</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {mobileAccessories.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div
                  key={product.id}
                  className="border p-4 sm:p-6 rounded-2xl shadow-lg bg-white bg-opacity-90 flex flex-col justify-between items-center min-w-[160px] max-w-[340px] w-full sm:min-w-[220px] h-[320px] sm:h-[360px]"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}

                  <h4 className="text-lg font-semibold text-center">{product.name}</h4>
                  <p className="text-base mb-2">₹{product.price}</p>

                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`mt-auto text-white px-4 py-2 w-full rounded-lg text-base font-semibold ${isAdded
                      ? "bg-green-600 cursor-default"
                      : "bg-cyan-500 hover:bg-green-600"
                      }`}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>

              );
            })}
          </div>
        </>
      )}
      {page === 4 && (
        <>
          <h3 className="text-2xl font-semibold mb-4 text-cyan-600">Laptops</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {laptops.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div
                  key={product.id}
                  className="border p-4 sm:p-6 rounded-2xl shadow-lg bg-white bg-opacity-90 flex flex-col justify-between items-center min-w-[160px] max-w-[340px] w-full sm:min-w-[220px] h-[320px] sm:h-[360px]"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-24 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-3xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}

                  <h4 className="text-lg font-semibold text-center">{product.name}</h4>
                  <p className="text-base mb-2">₹{product.price}</p>

                  <div className="flex items-center space-x-3 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg">{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`mt-auto text-white px-4 py-2 w-full rounded-lg text-base font-semibold ${isAdded
                        ? "bg-green-600 cursor-default"
                        : "bg-cyan-500 hover:bg-green-600"
                      }`}
                  >
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>

              );
            })}
          </div>
        </>
      )}
      <div className="flex justify-center mt-4 sm:mt-8 w-full">
        <button className="bg-green-600 text-white py-2 px-4 sm:px-8 rounded-full text-base sm:text-lg font-bold shadow-lg hover:bg-green-700 transition-colors duration-200 w-full max-w-xs" onClick={goToCart}>Go to Cart</button>
      </div>
    </div>
  );
}

export default Products;
