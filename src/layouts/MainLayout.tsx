import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  activeMenu?: string;
}

function MainLayout({ children, activeMenu = 'notes' }: MainLayoutProps) {
  const [currentMenu, setCurrentMenu] = useState(activeMenu);

  return (
    <div className="h-screen w-full bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeMenu={currentMenu} 
        setActiveMenu={setCurrentMenu} 
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;