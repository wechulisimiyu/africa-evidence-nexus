
import { useState, useEffect } from 'react';
import { UserProfile } from '@/components/UserProfile';
import { ChatInterface } from '@/components/ChatInterface';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export type UserRole = 'clinician' | 'researcher';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('clinician');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const handleRoleChange = (role: UserRole) => {
    setUserRole(role);
    setChatKey(prev => prev + 1); // Force chat component to reset
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Header 
        userRole={userRole} 
        setUserRole={handleRoleChange}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex">
        <Sidebar 
          isOpen={sidebarOpen} 
          userRole={userRole}
          onClose={() => setSidebarOpen(false)}
        />
        
        <main className="flex-1 transition-all duration-300">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="mb-8">
              <UserProfile userRole={userRole} />
            </div>
            
            <ChatInterface key={chatKey} userRole={userRole} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
