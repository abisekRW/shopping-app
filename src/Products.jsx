import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


import appleImg from './assets/products/fruits-vegetables/apple.png';
import bananaImg from './assets/products/fruits-vegetables/banana.jpg';
import orangeImg from './assets/products/fruits-vegetables/orange.jpg';
import mangoImg from './assets/products/fruits-vegetables/mango.jpg';
import grapesImg from './assets/products/fruits-vegetables/grapes.jpeg';
import watermelonImg from './assets/products/fruits-vegetables/watermelon.jpeg';
import strawberryImg from './assets/products/fruits-vegetables/strawberry.jpeg';
import pineappleImg from './assets/products/fruits-vegetables/pineapple.jpg';
import kiwiImg from './assets/products/fruits-vegetables/kiwi.jpg';
import tomatoImg from './assets/products/fruits-vegetables/tomato.jpg';
import potatoImg from './assets/products/fruits-vegetables/potato.jpg';
import carrotImg from './assets/products/fruits-vegetables/carrot.jpg';
import brocolliImg from './assets/products/fruits-vegetables/brocolli.jpg';
import spinachImg from './assets/products/fruits-vegetables/spinach.jpg';
import onionImg from './assets/products/fruits-vegetables/onion.jpg';


import chipsImg from './assets/products/snacks/chips.jpg';
import cookiesImg from './assets/products/snacks/cookies.jpg';
import chocolateImg from './assets/products/snacks/chocolates.jpg';
import nutsImg from './assets/products/snacks/nuts.jpg';
import popcornImg from './assets/products/snacks/popcorn.jpg';

import tabletImg from './assets/products/electronics/tablet.jpg';
import cameraImg from './assets/products/electronics/camera.jpg';
import powerbankImg from './assets/products/electronics/powerbank.jpeg';
import vrImg from './assets/products/electronics/vrheadset.jpg';
import smarttvImg from './assets/products/electronics/smarttv.jpg';
import gameconsoleImg from './assets/products/electronics/gameconsole.jpg';
import smartwatchImg from './assets/products/electronics/smartwatch.jpg';
import bluetoothspeakerImg from './assets/products/electronics/bluetoothspeaker.jpg';



import carmountImg from './assets/products/mobile-accessories/carmount.jpg';
import selfiestickImg from './assets/products/mobile-accessories/selfiestick.jpg';
import usbcableImg from './assets/products/mobile-accessories/usbcable.jpg';
import wirelesschargerImg from './assets/products/mobile-accessories/wirelesscharger.jpg';
import bttrackerImg from './assets/products/mobile-accessories/bluetoothtracker.jpg';
import earphonesImg from './assets/products/mobile-accessories/earphones.jpg';
import screenguardImg from './assets/products/mobile-accessories/screenguard.jpg';
import chargerImg from './assets/products/mobile-accessories/charger.jpg';
import phonecaseImg from './assets/products/mobile-accessories/phonecase.jpg';



import thinkpadImg from './assets/products/laptops/lenovothinkpad.jpg';
import acerImg from './assets/products/laptops/aceraspire.jpg';
import asusImg from './assets/products/laptops/asuszenbook.jpg';
import surfaceImg from './assets/products/laptops/microsoftsurface.jpg';
import msiImg from './assets/products/laptops/msimodern.jpg';
import samsungbookImg from './assets/products/laptops/samsunggalaxybook.jpg';
import dellImg from './assets/products/laptops/dellinspiron.jpg';
import hpImg from './assets/products/laptops/hppavilion.jpg';
import macImg from './assets/products/laptops/macbookpro.jpg';



function Products({ cart, setCart, isLoggedIn }) {

  const fruitsAndVegetables = [
    { id: 1, name: "Apple", price: 10, image: appleImg },
    { id: 2, name: "Banana", price: 5, image: bananaImg },
    { id: 3, name: "Orange", price: 8, image: orangeImg },
    { id: 4, name: "Mango", price: 15, image: mangoImg },
    { id: 5, name: "Grapes", price: 12, image: grapesImg },
    { id: 6, name: "Watermelon", price: 20, image: watermelonImg },
    { id: 7, name: "Strawberry", price: 18, image: strawberryImg },
    { id: 8, name: "Pineapple", price: 25, image: pineappleImg },
    { id: 9, name: "Kiwi", price: 30, image: kiwiImg },
    { id: 10, name: "Tomato", price: 6, image: tomatoImg },
    { id: 11, name: "Potato", price: 4, image: potatoImg },
    { id: 12, name: "Carrot", price: 7, image: carrotImg },
    { id: 13, name: "Broccoli", price: 14, image: brocolliImg },
    { id: 14, name: "Spinach", price: 9, image: spinachImg },
    { id: 15, name: "Onion", price: 5, image: onionImg },
  ];
  const snacks = [
    { id: 16, name: "Chips", price: 20, image: chipsImg },
    { id: 17, name: "Cookies", price: 30, image: cookiesImg },
    { id: 18, name: "Chocolate", price: 25, image: chocolateImg },
    { id: 19, name: "Nuts", price: 40, image: nutsImg },
    { id: 20, name: "Popcorn", price: 15, image: popcornImg },
  ];
  const electronics = [
    { id: 21, name: "Headphones", price: 1200, image: earphonesImg },
    { id: 22, name: "Smart Watch", price: 2500, image: smartwatchImg },
    { id: 23, name: "Bluetooth Speaker", price: 1800, image: bluetoothspeakerImg },
    { id: 30, name: "Tablet", price: 15000, image: tabletImg },
    { id: 31, name: "Camera", price: 22000, image: cameraImg },
    { id: 32, name: "Power Bank", price: 1200, image: powerbankImg },
    { id: 33, name: "VR Headset", price: 8000, image: vrImg },
    { id: 34, name: "Smart TV", price: 35000, image: smarttvImg },
    { id: 35, name: "Game Console", price: 40000, image: gameconsoleImg },
  ];
  const mobileAccessories = [
    { id: 24, name: "Phone Case", price: 300, image: phonecaseImg },
    { id: 25, name: "Screen Guard", price: 150, image: screenguardImg },
    { id: 26, name: "Charger", price: 500, image: chargerImg },
    { id: 36, name: "Earphones", price: 350, image: earphonesImg },
    { id: 37, name: "Car Mount", price: 450, image: carmountImg },
    { id: 38, name: "Selfie Stick", price: 250, image: selfiestickImg },
    { id: 39, name: "USB Cable", price: 120, image: usbcableImg },
    { id: 40, name: "Wireless Charger", price: 900, image: wirelesschargerImg },
    { id: 41, name: "Bluetooth Tracker", price: 600, image: bttrackerImg },
  ];
  const laptops = [
    { id: 27, name: "MacBook Pro", price: 120000, image: macImg },
    { id: 28, name: "Dell Inspiron", price: 70000, image: dellImg },
    { id: 29, name: "HP Pavilion", price: 65000, image: hpImg },
    { id: 42, name: "Lenovo ThinkPad", price: 60000, image: thinkpadImg },
    { id: 43, name: "Acer Aspire", price: 55000, image: acerImg },
    { id: 44, name: "Asus ZenBook", price: 75000, image: asusImg },
    { id: 45, name: "Microsoft Surface", price: 95000, image: surfaceImg },
    { id: 46, name: "MSI Modern", price: 80000, image: msiImg },
    { id: 47, name: "Samsung Galaxy Book", price: 85000, image: samsungbookImg },
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
    if (!isLoggedIn) {
      alert('Please log in first to purchase items.');
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
      setCart(newCart);
    } else {
      newCart = [...cart, { ...product, quantity: qty }];
      setCart(newCart);
    }
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

    // Save purchases to localStorage for profile page
    let purchases = JSON.parse(localStorage.getItem('purchases')) || [];
    const purchaseIdx = purchases.findIndex((item) => item.id === product.id);
    if (purchaseIdx > -1) {
      purchases[purchaseIdx].quantity += qty;
    } else {
      purchases.push({ ...product, quantity: qty });
    }
    localStorage.setItem('purchases', JSON.stringify(purchases));
  };

  function gotocart () {
      navigate('/Cart');
    }

  // Page state: 0 = Fruits & Vegetables, 1 = Snacks, 2 = Electronics, 3 = Mobile Accessories, 4 = Laptops
  const [page, setPage] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 p-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-cyan-700">Shop by Category</h2>
      <div className="flex flex-wrap justify-center mb-8 gap-2">
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {fruitsAndVegetables.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  ) : (
                    <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-2xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {snacks.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  ) : (
                    <div className="w-16 h-16 mb-2 rounded-full bg-gradient-to-br from-cyan-200 to-blue-200 flex items-center justify-center text-2xl font-bold text-cyan-700">
                      {product.name[0]}
                    </div>
                  )}
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {electronics.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {mobileAccessories.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {laptops.map((product) => {
              const isAdded = addedItems[product.id];
              return (
                <div key={product.id} className="border p-4 rounded-xl shadow bg-white bg-opacity-90 flex flex-col items-center">
                  <img src={product.image} alt={product.name} className="w-16 h-16 mb-2 rounded-full object-cover border-2 border-cyan-200 shadow" />
                  <h4 className="text-lg font-bold mb-1">{product.name}</h4>
                  <p className="mb-2">₹{product.price}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <button
                      onClick={() => minus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> - </button>
                    <span>{quantity[product.id] || 1}</span>
                    <button
                      onClick={() => plus(product.id)}
                      className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"> + </button>
                  </div>
                  <button
                    onClick={() => add(product)}
                    disabled={isAdded}
                    className={`text-white px-4 py-1 w-full rounded ${isAdded ? "bg-green-600 cursor-default" : "bg-cyan-500 hover:bg-green-600"}`}>
                    {isAdded ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
      <div className="flex justify-center mt-8">
        <button className="bg-green-600 text-white py-2 px-8 rounded-full text-lg font-bold shadow-lg hover:bg-green-700 transition-colors duration-200" onClick={gotocart}>Go to Cart</button>
      </div>
    </div>
  );
}

export default Products;
