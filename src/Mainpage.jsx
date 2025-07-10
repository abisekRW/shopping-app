import { useNavigate } from "react-router-dom";
import appleImg from './assets/products/fruits-vegetables/apple.png';
import chipsImg from './assets/products/snacks/chips.jpg';
import smartwatchImg from './assets/products/electronics/smartwatch.jpg';
import phonecaseImg from './assets/products/mobile-accessories/phonecase.jpg';
import macImg from './assets/products/laptops/macbookpro.jpg';
import cameraImg from './assets/products/electronics/camera.jpg';
import popcornImg from './assets/products/snacks/popcorn.jpg';
import surfaceImg from './assets/products/laptops/microsoftsurface.jpg';

function Mainpage() {
  const navigate = useNavigate();
  const gotoproducts = () => {
    navigate('/Products');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-200 p-6">
      <div className="w-full flex justify-start max-w-4xl">
      </div>
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-center animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-600 mb-4 drop-shadow-lg">Welcome to My Shop!</h1>
        <p className="text-lg text-gray-700 mb-6">Discover the best products at unbeatable prices. Enjoy a seamless shopping experience with fast delivery and secure checkout.</p>
        <div className="w-full mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={appleImg} alt="Apple" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Fresh Apples</span>
              <span className="text-xs text-gray-500">Now only ₹10!</span>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-red-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={chipsImg} alt="Chips" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Crunchy Chips</span>
              <span className="text-xs text-gray-500">Snacks starting ₹20</span>
            </div>
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={smartwatchImg} alt="Smart Watch" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Smart Watches</span>
              <span className="text-xs text-gray-500">From ₹2500</span>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-lime-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={phonecaseImg} alt="Phone Case" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Trendy Phone Cases</span>
              <span className="text-xs text-gray-500">Mobile Accessories</span>
            </div>
            <div className="bg-gradient-to-br from-gray-100 to-blue-200 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={macImg} alt="MacBook Pro" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">MacBook Pro</span>
              <span className="text-xs text-gray-500">Laptops from ₹55,000</span>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={cameraImg} alt="Camera" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Cameras</span>
              <span className="text-xs text-gray-500">Capture moments</span>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-yellow-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={popcornImg} alt="Popcorn" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Movie Popcorn</span>
              <span className="text-xs text-gray-500">Perfect for movie night</span>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-green-100 rounded-xl p-4 flex flex-col items-center shadow">
              <img src={surfaceImg} alt="Microsoft Surface" className="w-16 h-16 rounded-full mb-2 object-cover border-2 border-cyan-200" />
              <span className="font-bold text-cyan-700">Microsoft Surface</span>
              <span className="text-xs text-gray-500">Premium laptops</span>
            </div>
          </div>
        </div>
        <button className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 text-white px-8 py-3 mt-2 rounded-full text-lg font-bold shadow-lg hover:scale-105 transform" onClick={gotoproducts}>
          Start Shopping
        </button>
      </div>
      <div className="mt-10 text-gray-400 text-xs">&copy; {new Date().getFullYear()} My Shop. All rights reserved.</div>
    </div>
  );
}

export default Mainpage
