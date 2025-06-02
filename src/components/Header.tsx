
import { Stethoscope, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/pages/Index';

interface HeaderProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Header = ({ userRole, setUserRole, sidebarOpen, setSidebarOpen }: HeaderProps) => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-emerald-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-500 to-amber-500 p-2 rounded-xl">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                  AfroEvidence
                </h1>
                <p className="text-xs text-gray-600">African Medical Evidence Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <Button
                variant={userRole === 'clinician' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUserRole('clinician')}
                className={`text-xs transition-all duration-200 ${
                  userRole === 'clinician' 
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md' 
                    : 'hover:bg-gray-200'
                }`}
              >
                Clinician
              </Button>
              <Button
                variant={userRole === 'researcher' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setUserRole('researcher')}
                className={`text-xs transition-all duration-200 ${
                  userRole === 'researcher' 
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-md' 
                    : 'hover:bg-gray-200'
                }`}
              >
                Researcher
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
