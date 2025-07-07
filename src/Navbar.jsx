import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 text-white px-6 py-4 flex flex-col sm:flex-row justify-between items-center shadow-lg rounded-b-2xl gap-2 sm:gap-0">
      <Link to="/" className="text-2xl font-extrabold tracking-wide drop-shadow-lg hover:text-cyan-100 transition-colors duration-200">NOZAMA.in</Link>
      <div className="flex space-x-2 sm:space-x-6 mt-2 sm:mt-0">
        <Link to="/Products" className="px-4 py-2 rounded-full font-semibold bg-cyan-100 text-cyan-700 hover:bg-cyan-200 hover:text-cyan-900 transition-colors duration-200 shadow">Products</Link>
        <Link to="/Cart" className="px-4 py-2 rounded-full font-semibold bg-cyan-100 text-cyan-700 hover:bg-cyan-200 hover:text-cyan-900 transition-colors duration-200 shadow">Cart</Link>
        <Link to="/Profile" className="px-4 py-2 rounded-full font-semibold bg-cyan-100 text-cyan-700 hover:bg-cyan-200 hover:text-cyan-900 transition-colors duration-200 shadow">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;