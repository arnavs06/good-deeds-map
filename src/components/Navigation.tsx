import React from 'react';
import { Map, Bell, User, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  alertCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange, alertCount }) => {
  const tabs = [
    { id: 'map', label: 'Map', icon: Map },
    { id: 'alerts', label: 'Alerts', icon: Bell, count: alertCount },
    { id: 'create', label: 'Request', icon: Plus },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 relative ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" />
                {tab.count && tab.count > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-alert text-alert-foreground">
                    {tab.count}
                  </Badge>
                )}
              </div>
              <span className="text-xs">{tab.label}</span>
              {isActive && (
                <div className="absolute bottom-0 w-full h-0.5 bg-primary rounded-full" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;