import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

function Navbar() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <h1 className="font-bold text-xl">Notes App</h1>
            <div className="flex gap-4 items-center">
                {user && <span>{user.username}</span>}
                <button onClick={() => {
                    logout();
                    navigate("/login");
                }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Logout</button>
            </div>
        </nav>
    );
}

export default Navbar