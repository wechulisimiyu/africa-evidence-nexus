
import { UserRole } from '@/pages/Index';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, BookOpen, Users, Activity, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  userRole: UserRole;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, userRole, onClose }: SidebarProps) => {
  const resources = {
    clinician: [
      { title: "AJOL Clinical Cases", count: "2,340", icon: BookOpen },
      { title: "Treatment Protocols", count: "156", icon: Activity },
      { title: "Emergency Guidelines", count: "89", icon: TrendingUp },
    ],
    researcher: [
      { title: "ECAJS Publications", count: "1,890", icon: BookOpen },
      { title: "Research Collaborations", count: "234", icon: Users },
      { title: "Ongoing Studies", count: "67", icon: TrendingUp },
    ]
  };

  const currentResources = resources[userRole];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-80 bg-white/90 backdrop-blur-md border-r border-gray-200 
        transform transition-transform duration-300 z-50 pt-20
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:pt-0
      `}>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between md:hidden">
            <h3 className="font-semibold">Resources</h3>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Access</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">{resource.title}</span>
                    </div>
                    <Badge variant="secondary">{resource.count}</Badge>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Updates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <p className="font-medium text-emerald-800">New AJOL Publications</p>
                  <p className="text-emerald-600">15 new surgical case studies added</p>
                </div>
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="font-medium text-amber-800">Guidelines Updated</p>
                  <p className="text-amber-600">WHO treatment protocols revised</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
    </>
  );
};
