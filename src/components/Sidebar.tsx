import React, { use, useState } from 'react';
import { FileText, Image, User, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/auth';

interface SidebarProps {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
}

function Sidebar({ activeMenu, setActiveMenu }: SidebarProps) {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [emailUserLogin, setEmailUserLogin] = useState<string | null>(user?.email || localStorage.getItem("USER") ? JSON.parse(localStorage.getItem("USER")!).email : null);

  const menuItems = [
    { id: 'notes', icon: FileText, label: 'Notes', path: '/' },
    { id: 'media', icon: Image, label: 'Media', path: '/media' },
    { id: 'profile', icon: User, label: 'Profile', path: '/profile' }
  ];

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = (item: any) => {
    setActiveMenu(item.id);
    if (item.path !== location.pathname) {
      navigate(item.path);
    }
  };

  // Cek active menu berdasarkan current path juga
  const getIsActive = (item: any) => {
    return activeMenu === item.id || location.pathname === item.path;
  };

  return (
    <div 
      className={`${
        sidebarExpanded ? 'w-64' : 'w-16'
      } bg-gray-800/50 backdrop-blur-xl border-r border-gray-700/50 transition-all duration-300 flex flex-col h-full`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          {sidebarExpanded && (
            <h1 className="text-lg font-bold text-gray-100 whitespace-nowrap">
              ModernNotes
            </h1>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4">
        <div className="space-y-2 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = getIsActive(item);
            
            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {sidebarExpanded && (
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* User Info & Logout */}
      <div className="p-2 border-t border-gray-700/50">
        {sidebarExpanded && emailUserLogin && (
          <div className="mb-3 px-3 py-2 bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-300 truncate">
                {emailUserLogin}
              </span>
            </div>
          </div>
        )}
        
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 lg:justify-center text-gray-400 hover:text-red-400 hover:bg-gray-700/50 rounded-xl transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {sidebarExpanded && (
            <span className="font-medium whitespace-nowrap">Logout</span>
          )}
        </button>
      </div>
    </div>
  );
}

export default Sidebar;