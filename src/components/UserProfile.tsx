
import { UserRole } from '@/pages/Index';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, Microscope, MapPin, Globe } from 'lucide-react';

interface UserProfileProps {
  userRole: UserRole;
}

export const UserProfile = ({ userRole }: UserProfileProps) => {
  const profileData = {
    clinician: {
      title: "Clinical Decision Support",
      description: "Evidence-based medicine tailored for African healthcare practitioners",
      icon: Stethoscope,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      features: ["Patient Case Analysis", "Treatment Protocols", "Local Guidelines", "Emergency Protocols"]
    },
    researcher: {
      title: "Research Evidence Hub", 
      description: "Comprehensive research analysis from African medical journals",
      icon: Microscope,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      features: ["Study Design Analysis", "Research Gaps", "Meta-Analysis", "Publication Insights"]
    }
  };

  const profile = profileData[userRole];
  const Icon = profile.icon;

  return (
    <Card className={`bg-gradient-to-r ${profile.bgGradient} border-0 shadow-lg transition-all duration-500 transform`}>
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className={`bg-gradient-to-br ${profile.gradient} p-3 rounded-xl shadow-md`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{profile.title}</h2>
            <p className="text-gray-600 mb-4">{profile.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.features.map((feature, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="bg-white/50 text-gray-700 hover:bg-white/70 transition-colors"
                >
                  {feature}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>African Context</span>
              </div>
              <div className="flex items-center space-x-1">
                <Globe className="h-4 w-4" />
                <span>Global Standards</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
