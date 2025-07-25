import React from 'react';
import { Award, TrendingUp, Heart, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface UserStats {
  totalKarma: number;
  weeklyKarma: number;
  completedDeeds: number;
  helpedPeople: number;
  rank: string;
  nextRankPoints: number;
  currentLevelProgress: number;
}

interface UserProfileProps {
  user: {
    name: string;
    avatar: string;
    joinDate: string;
    location: string;
  };
  stats: UserStats;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, stats }) => {
  const achievements = [
    { icon: Heart, name: 'First Helper', description: 'Completed your first good deed' },
    { icon: Users, name: 'Community Hero', description: 'Helped 10 different people' },
    { icon: TrendingUp, name: 'Weekly Warrior', description: 'Active 7 days in a row' },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">{user.location}</p>
            <p className="text-sm text-muted-foreground">Member since {user.joinDate}</p>
          </div>
          <Badge className="bg-gradient-to-r from-primary to-primary-glow text-primary-foreground px-4 py-2">
            {stats.rank}
          </Badge>
        </div>

        {/* Progress to next rank */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress to next rank</span>
            <span>{stats.currentLevelProgress}% ({stats.nextRankPoints} points needed)</span>
          </div>
          <Progress value={stats.currentLevelProgress} className="h-2" />
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            {stats.totalKarma}
          </div>
          <p className="text-sm text-muted-foreground">Total Karma</p>
          <div className="text-xs text-accent mt-1">
            +{stats.weeklyKarma} this week
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-foreground">
            {stats.completedDeeds}
          </div>
          <p className="text-sm text-muted-foreground">Good Deeds</p>
          <div className="text-xs text-muted-foreground mt-1">
            Completed
          </div>
        </Card>

        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-foreground">
            {stats.helpedPeople}
          </div>
          <p className="text-sm text-muted-foreground">People Helped</p>
        </Card>

        <Card className="p-4 text-center flex flex-col items-center justify-center">
          <Award className="w-8 h-8 text-accent mb-2" />
          <p className="text-sm text-muted-foreground">Top 10%</p>
          <div className="text-xs text-muted-foreground">
            This month
          </div>
        </Card>
      </div>

      {/* Recent Achievements */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Recent Achievements</h2>
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
              <achievement.icon className="w-8 h-8 text-accent" />
              <div>
                <h3 className="font-medium">{achievement.name}</h3>
                <p className="text-sm text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;