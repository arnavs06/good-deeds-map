import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface User {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  avatar: string;
  points: number;
}

interface GoodDeed {
  id: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  requester: string;
  reward: number;
  urgency: 'low' | 'medium' | 'high';
}

interface MapProps {
  users: User[];
  goodDeeds: GoodDeed[];
  onDeedClick: (deed: GoodDeed) => void;
  apiKey?: string;
}

const Map: React.FC<MapProps> = ({ users, goodDeeds, onDeedClick, apiKey }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [showApiInput, setShowApiInput] = useState(!apiKey);
  const [tempApiKey, setTempApiKey] = useState('');

  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = token;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-74.006, 40.7128], // NYC
      zoom: 12,
    });

    map.current.addControl(
      new mapboxgl.NavigationControl(),
      'top-right'
    );

    map.current.on('load', () => {
      addUsersToMap();
      addGoodDeedsToMap();
    });
  };

  const addUsersToMap = () => {
    if (!map.current) return;

    users.forEach(user => {
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="text-center p-2">
          <img src="${user.avatar}" alt="${user.name}" class="w-12 h-12 rounded-full mx-auto mb-2" />
          <h3 class="font-semibold">${user.name}</h3>
          <p class="text-sm text-gray-600">${user.points} karma points</p>
        </div>
      `);

      new mapboxgl.Marker({
        color: '#22c55e',
        scale: 0.8
      })
        .setLngLat([user.longitude, user.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });
  };

  const addGoodDeedsToMap = () => {
    if (!map.current) return;

    goodDeeds.forEach(deed => {
      const urgencyColor = deed.urgency === 'high' ? '#ef4444' : deed.urgency === 'medium' ? '#f59e0b' : '#10b981';
      
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-3 min-w-64">
          <h3 class="font-bold text-lg mb-2">${deed.title}</h3>
          <p class="text-sm text-gray-600 mb-2">${deed.description}</p>
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">+${deed.reward} karma</span>
            <button class="good-deed-btn bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-green-700" data-deed-id="${deed.id}">
              Help Out!
            </button>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker({
        color: urgencyColor,
        scale: 1.2
      })
        .setLngLat([deed.longitude, deed.latitude])
        .setPopup(popup)
        .addTo(map.current!);

      // Add click handler for the popup button
      popup.on('open', () => {
        const button = document.querySelector(`[data-deed-id="${deed.id}"]`);
        button?.addEventListener('click', () => {
          onDeedClick(deed);
          popup.remove();
        });
      });
    });
  };

  useEffect(() => {
    if (apiKey) {
      initializeMap(apiKey);
    }

    return () => {
      map.current?.remove();
    };
  }, [apiKey]);

  const handleApiKeySubmit = () => {
    if (tempApiKey.trim()) {
      setShowApiInput(false);
      initializeMap(tempApiKey);
    }
  };

  if (showApiInput) {
    return (
      <div className="relative w-full h-full bg-muted rounded-lg flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Enter Mapbox API Key</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get your public token from{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <input
            type="text"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV..."
            className="w-full p-3 border border-border rounded-lg mb-4"
          />
          <button
            onClick={handleApiKeySubmit}
            className="w-full bg-primary text-primary-foreground p-3 rounded-lg font-medium hover:bg-primary/90"
          >
            Load Map
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg" />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
        <h2 className="font-semibold text-sm mb-1">KindMap</h2>
        <p className="text-xs text-muted-foreground">
          {goodDeeds.length} good deeds nearby
        </p>
      </div>
    </div>
  );
};

export default Map;