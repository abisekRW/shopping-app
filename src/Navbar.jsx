import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
      <Link to="/Mainpage" className="text-xl font-bold hover:text-yellow-300">My Shop</Link>
      <div className="space-x-4">
        <Link to="/products" className="hover:text-yellow-300">Products</Link>
        <Link to="/cart" className="hover:text-yellow-300">Cart</Link>
        <Link to="/profile" className="hover:text-yellow-300">Profile</Link>
      </div>
    </nav>
  );
}

export default Navbar;