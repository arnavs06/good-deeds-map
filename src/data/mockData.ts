export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Chen',
    latitude: 40.7589,
    longitude: -73.9851,
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    points: 1250
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    latitude: 40.7505,
    longitude: -73.9934,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    points: 890
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    latitude: 40.7614,
    longitude: -73.9776,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    points: 2100
  },
  {
    id: '4',
    name: 'David Kim',
    latitude: 40.7282,
    longitude: -73.9942,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    points: 675
  }
];

export const mockGoodDeeds = [
  {
    id: '1',
    title: 'Help elderly neighbor with groceries',
    description: 'My neighbor Mrs. Johnson (82) needs help carrying groceries up 3 flights of stairs. She has mobility issues but is too proud to ask for help directly.',
    latitude: 40.7600,
    longitude: -73.9800,
    requester: 'Sarah Chen',
    reward: 25,
    urgency: 'medium' as const
  },
  {
    id: '2',
    title: 'Walk rescue dog for busy single mom',
    description: 'Single mom working double shifts needs someone to walk her rescue dog Buddy. He\'s friendly but energetic and needs 30-45 min walks.',
    latitude: 40.7520,
    longitude: -73.9900,
    requester: 'Maria Santos',
    reward: 15,
    urgency: 'low' as const
  },
  {
    id: '3',
    title: 'URGENT: Help move elderly resident to hospital',
    description: 'Elderly resident needs immediate help getting to hospital for scheduled appointment. Wheelchair accessible vehicle needed.',
    latitude: 40.7650,
    longitude: -73.9750,
    requester: 'Community Center',
    reward: 50,
    urgency: 'high' as const
  },
  {
    id: '4',
    title: 'Tech support for senior center',
    description: 'Senior center needs help setting up tablets for online class. Basic tech knowledge required, very rewarding experience!',
    latitude: 40.7300,
    longitude: -73.9950,
    requester: 'Golden Years Center',
    reward: 30,
    urgency: 'medium' as const
  }
];

export const mockAlerts = [
  {
    id: '1',
    title: 'Help elderly neighbor with groceries',
    description: 'My neighbor Mrs. Johnson (82) needs help carrying groceries up 3 flights of stairs. She has mobility issues but is too proud to ask for help directly.',
    location: 'Upper West Side',
    distance: '0.3 miles',
    reward: 25,
    urgency: 'medium' as const,
    timePosted: '15 min ago',
    requester: {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
      rating: 4.8
    }
  },
  {
    id: '2',
    title: 'URGENT: Help move elderly resident',
    description: 'Elderly resident needs immediate help getting to hospital for scheduled appointment. Wheelchair accessible vehicle needed.',
    location: 'Midtown East',
    distance: '0.8 miles',
    reward: 50,
    urgency: 'high' as const,
    timePosted: '5 min ago',
    requester: {
      name: 'Community Center',
      avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop&crop=center',
      rating: 4.9
    }
  },
  {
    id: '3',
    title: 'Walk rescue dog for single mom',
    description: 'Single mom working double shifts needs someone to walk her rescue dog Buddy. He\'s friendly but energetic.',
    location: 'Greenwich Village',
    distance: '1.2 miles',
    reward: 15,
    urgency: 'low' as const,
    timePosted: '1 hour ago',
    requester: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      rating: 4.7
    }
  }
];

export const mockCurrentUser = {
  name: 'Alex Thompson',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
  joinDate: 'March 2024',
  location: 'New York, NY'
};

export const mockUserStats = {
  totalKarma: 1847,
  weeklyKarma: 125,
  completedDeeds: 23,
  helpedPeople: 18,
  rank: 'Community Hero',
  nextRankPoints: 153,
  currentLevelProgress: 73
};