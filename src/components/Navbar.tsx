import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 onClick={() => navigate("/")} className="text-xl font-bold cursor-pointer">Blog Manager</h1>
      <div className="space-x-4">
        <NavLink to="/" className={({ isActive }) => isActive ? "font-bold underline" : ""}>
          Trang chủ
        </NavLink>
        <button onClick={() => navigate("/create")} className="bg-white text-blue-600 px-3 py-1 rounded">
          Viết bài
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
