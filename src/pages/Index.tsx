import React, { useState } from 'react';
import { Heart, MapPin, Users } from 'lucide-react';
import Map from '@/components/Map';
import AlertCard from '@/components/AlertCard';
import UserProfile from '@/components/UserProfile';
import CreateDeedForm from '@/components/CreateDeedForm';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  mockUsers, 
  mockGoodDeeds, 
  mockAlerts, 
  mockCurrentUser, 
  mockUserStats 
} from '@/data/mockData';

const Index = () => {
  const [activeTab, setActiveTab] = useState('map');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  const handleAcceptAlert = (alertId: string) => {
    const alert = mockAlerts.find(a => a.id === alertId);
    if (alert) {
      toast({
        title: "Mission Accepted! 🎉",
        description: `You've accepted "${alert.title}". The requester will be notified.`,
      });
    }
  };

  const handleDeedClick = (deed: any) => {
    toast({
      title: "Good Deed Selected!",
      description: `You've shown interest in: ${deed.title}`,
    });
  };

  const handleCreateDeed = (deedData: any) => {
    toast({
      title: "Help Request Posted! 📢",
      description: "Your request has been shared with the community.",
    });
    setShowCreateForm(false);
    setActiveTab('alerts');
  };

  const renderHeader = () => (
    <div className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Heart className="w-6 h-6" />
            KindMap
          </h1>
          <p className="text-primary-foreground/80">Spread kindness, one deed at a time</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold">{mockUserStats.totalKarma}</div>
          <div className="text-sm text-primary-foreground/80">Karma Points</div>
        </div>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="text-center">
          <div className="text-lg font-semibold">{mockAlerts.length}</div>
          <div className="text-xs text-primary-foreground/80">Active Alerts</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">{mockUsers.length}</div>
          <div className="text-xs text-primary-foreground/80">Helpers Nearby</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold">+{mockUserStats.weeklyKarma}</div>
          <div className="text-xs text-primary-foreground/80">This Week</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    if (showCreateForm) {
      return (
        <div className="p-4">
          <CreateDeedForm 
            onSubmit={handleCreateDeed}
            onCancel={() => setShowCreateForm(false)}
          />
        </div>
      );
    }

    switch (activeTab) {
      case 'map':
        return (
          <div className="flex-1">
            <Map 
              users={mockUsers}
              goodDeeds={mockGoodDeeds}
              onDeedClick={handleDeedClick}
            />
          </div>
        );
      
      case 'alerts':
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Nearby Good Deeds</h2>
              <Badge variant="secondary">{mockAlerts.length} available</Badge>
            </div>
            {mockAlerts.map((alert) => (
              <AlertCard 
                key={alert.id} 
                alert={alert} 
                onAccept={handleAcceptAlert}
              />
            ))}
          </div>
        );
      
      case 'create':
        setShowCreateForm(true);
        return null;
      
      case 'profile':
        return (
          <div className="p-4">
            <UserProfile 
              user={mockCurrentUser}
              stats={mockUserStats}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {renderHeader()}
      
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      
      <Navigation 
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === 'create') {
            setShowCreateForm(true);
          } else {
            setShowCreateForm(false);
            setActiveTab(tab);
          }
        }}
        alertCount={mockAlerts.length}
      />
    </div>
  );
};

export default Index;
