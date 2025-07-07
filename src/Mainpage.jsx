import { useNavigate } from "react-router-dom"

function Mainpage() {
  const navigate = useNavigate()
  const gotoproducts = () =>{
    navigate('/Products');
  };

  return (
    <div className="p-4 text-center">
      <h1 className="text-3xl font-bold mb-2">Welcome to My Shop</h1>
      <p className="text-gray-600">You can but products from the products page</p>
      <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-1 mt-3 w-1/4 rounded" onClick={gotoproducts}>Go to products</button>
    </div>
  )
}

export default Mainpage
