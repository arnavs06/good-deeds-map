import React, { useState } from 'react';
import { MapPin, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface CreateDeedFormProps {
  onSubmit: (deed: {
    title: string;
    description: string;
    location: string;
    urgency: 'low' | 'medium' | 'high';
    reward: number;
    category: string;
  }) => void;
  onCancel: () => void;
}

const CreateDeedForm: React.FC<CreateDeedFormProps> = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    urgency: 'medium' as 'low' | 'medium' | 'high',
    reward: 10,
    category: ''
  });

  const categories = [
    'Elderly Care',
    'Pet Care',
    'Moving Help',
    'Grocery Shopping',
    'Transportation',
    'Tech Support',
    'Childcare',
    'Cleaning',
    'Other'
  ];

  const urgencyOptions = [
    { value: 'low', label: 'Low Priority', points: '5-15 karma' },
    { value: 'medium', label: 'Medium Priority', points: '10-30 karma' },
    { value: 'high', label: 'Urgent', points: '20-50 karma' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Request Help</h2>
        <p className="text-muted-foreground">
          Describe what you need help with and let the community assist you!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">What do you need help with?</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Help moving furniture, Walk my dog, Grocery shopping"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Provide more details about what you need help with..."
            className="min-h-[100px]"
            required
          />
        </div>

        {/* Location and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Address or area"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Urgency and Reward */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="urgency">Priority Level</Label>
            <Select 
              value={formData.urgency} 
              onValueChange={(value: 'low' | 'medium' | 'high') => setFormData({ ...formData, urgency: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {urgencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{option.label}</span>
                      <span className="text-xs text-muted-foreground ml-2">{option.points}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reward">Karma Reward</Label>
            <div className="relative">
              <Star className="absolute left-3 top-3 w-4 h-4 text-accent" />
              <Input
                id="reward"
                type="number"
                value={formData.reward}
                onChange={(e) => setFormData({ ...formData, reward: parseInt(e.target.value) || 0 })}
                placeholder="10"
                className="pl-10"
                min="5"
                max="100"
                required
              />
            </div>
          </div>
        </div>

        {/* Karma Info */}
        <div className="bg-accent/10 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-5 h-5 text-accent" />
            <h3 className="font-medium">About Karma Points</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Karma points are earned by helpers who complete your request. Higher rewards attract more helpers!
            Typical range: 5-15 for simple tasks, 15-30 for moderate help, 30+ for urgent or complex requests.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary via-primary-glow to-accent hover:opacity-90"
          >
            Post Care Request
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CreateDeedForm;