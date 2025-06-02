
import { useState } from 'react';
import { UserProfile } from '@/components/UserProfile';
import { ChatInterface } from '@/components/ChatInterface';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

export type UserRole = 'clinician' | 'researcher';

const Index = () => {
  const [userRole, setUserRole] = useState<UserRole>('clinician');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-amber-50">
      <Header 
        userRole={userRole} 
        setUserRole={setUserRole}
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
            
            <ChatInterface userRole={userRole} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
