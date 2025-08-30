import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";
import { LogOut, User } from "lucide-react";

function Navbar() {
    const { user, logout } = useAuthStore();
    const navigate = useNavigate();

    return (
        <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                            Notes App
                        </h1>
                    </div>

                    {/* User Info & Actions */}
                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="flex items-center space-x-3 text-gray-300">
                                <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-800/50">
                                    <User className="w-4 h-4 text-gray-400" />
                                    <span className="text-sm font-medium">{user.username}</span>
                                </div>
                            </div>
                        )}
                        
                        <button 
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }} 
                            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:from-red-700 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;