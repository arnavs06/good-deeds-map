import React from 'react';
import { Clock, MapPin, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  title: string;
  description: string;
  location: string;
  distance: string;
  reward: number;
  urgency: 'low' | 'medium' | 'high';
  timePosted: string;
  requester: {
    name: string;
    avatar: string;
    rating: number;
  };
}

interface AlertCardProps {
  alert: Alert;
  onAccept: (alertId: string) => void;
}

const AlertCard: React.FC<AlertCardProps> = ({ alert, onAccept }) => {
  const urgencyConfig = {
    low: { color: 'bg-muted', text: 'Low Priority' },
    medium: { color: 'bg-alert/20 text-alert-foreground', text: 'Medium Priority' },
    high: { color: 'bg-destructive/20 text-destructive-foreground', text: 'Urgent' }
  };

  return (
    <Card className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img 
            src={alert.requester.avatar} 
            alt={alert.requester.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{alert.title}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{alert.requester.name}</span>
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-accent text-accent" />
                <span>{alert.requester.rating}</span>
              </div>
            </div>
          </div>
        </div>
        <Badge className={urgencyConfig[alert.urgency].color}>
          {urgencyConfig[alert.urgency].text}
        </Badge>
      </div>

      <p className="text-foreground mb-4 leading-relaxed">{alert.description}</p>

      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          <span>{alert.location} • {alert.distance}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{alert.timePosted}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="bg-gradient-to-r from-accent to-alert bg-clip-text text-transparent font-bold">
          +{alert.reward} Karma Points
        </div>
        <Button 
          onClick={() => onAccept(alert.id)}
          className="bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
        >
          Accept Mission
        </Button>
      </div>
    </Card>
  );
};

export default AlertCard;