import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

// Import Mapbox CSS - sometimes this needs to be handled differently in Vite
try {
  import('mapbox-gl/dist/mapbox-gl.css');
} catch (e) {
  console.warn('Mapbox CSS import failed, loading from CDN');
}

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
  const [mapError, setMapError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const initializeMap = (token: string) => {
    if (!mapContainer.current || map.current) return;

    try {
      setIsLoading(true);
      setMapError('');
      
      // Set access token
      mapboxgl.accessToken = token;
      
      // Add Mapbox CSS dynamically if not loaded
      if (!document.querySelector('link[href*="mapbox-gl.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
        document.head.appendChild(link);
      }
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-74.006, 40.7128], // NYC
        zoom: 12,
        attributionControl: false,
        preserveDrawingBuffer: true // Helps with rendering issues
      });

      map.current.addControl(
        new mapboxgl.NavigationControl(),
        'top-right'
      );

      map.current.on('load', () => {
        console.log('Map loaded successfully');
        setIsLoading(false);
        // Add a small delay to ensure everything is ready
        setTimeout(() => {
          addUsersToMap();
          addGoodDeedsToMap();
        }, 100);
      });

      map.current.on('error', (e) => {
        console.error('Mapbox error:', e);
        setIsLoading(false);
        setMapError(`Failed to load map: ${e.error?.message || 'Please check your API key'}`);
        setShowApiInput(true);
      });

      map.current.on('style.load', () => {
        console.log('Map style loaded');
        // Ensure markers are added after style loads
        setTimeout(() => {
          addUsersToMap();
          addGoodDeedsToMap();
        }, 100);
      });

    } catch (error) {
      console.error('Map initialization error:', error);
      setIsLoading(false);
      setMapError(`Failed to initialize map: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setShowApiInput(true);
    }
  };

  const addUsersToMap = () => {
    if (!map.current || !map.current.isStyleLoaded()) return;

    users.forEach(user => {
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(`
        <div style="text-align: center; padding: 8px;">
          <img src="${user.avatar}" alt="${user.name}" style="width: 48px; height: 48px; border-radius: 50%; margin: 0 auto 8px;" />
          <h3 style="font-weight: 600; margin: 0 0 4px 0;">${user.name}</h3>
          <p style="font-size: 14px; color: #666; margin: 0;">${user.points} karma points</p>
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
    if (!map.current || !map.current.isStyleLoaded()) return;

    goodDeeds.forEach(deed => {
      const urgencyColor = deed.urgency === 'high' ? '#ef4444' : deed.urgency === 'medium' ? '#f59e0b' : '#10b981';
      
      const popup = new mapboxgl.Popup({ 
        offset: 25,
        closeButton: true,
        closeOnClick: false
      }).setHTML(`
        <div style="padding: 12px; min-width: 250px;">
          <h3 style="font-weight: bold; font-size: 18px; margin: 0 0 8px 0;">${deed.title}</h3>
          <p style="font-size: 14px; color: #666; margin: 0 0 8px 0;">${deed.description}</p>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span style="font-size: 14px; font-weight: 500;">+${deed.reward} karma</span>
            <button 
              class="good-deed-btn" 
              data-deed-id="${deed.id}"
              style="background-color: #16a34a; color: white; padding: 4px 12px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; cursor: pointer;"
              onmouseover="this.style.backgroundColor='#15803d'"
              onmouseout="this.style.backgroundColor='#16a34a'"
            >
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
        const button = document.querySelector(`[data-deed-id="${deed.id}"]`) as HTMLButtonElement;
        if (button) {
          button.onclick = (e) => {
            e.preventDefault();
            e.stopPropagation();
            onDeedClick(deed);
            popup.remove();
          };
        }
      });
    });
  };

  useEffect(() => {
    // Cleanup existing map before creating new one
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    if (apiKey && apiKey.trim()) {
      initializeMap(apiKey);
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [apiKey]);

  // Re-add markers when data changes
  useEffect(() => {
    if (map.current && map.current.isStyleLoaded()) {
      addUsersToMap();
      addGoodDeedsToMap();
    }
  }, [users, goodDeeds]);

  const handleApiKeySubmit = () => {
    const trimmedKey = tempApiKey.trim();
    if (trimmedKey) {
      if (!trimmedKey.startsWith('pk.')) {
        setMapError('Invalid API key format. Mapbox public tokens start with "pk."');
        return;
      }
      setShowApiInput(false);
      setMapError('');
      initializeMap(trimmedKey);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleApiKeySubmit();
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
              href="https://account.mapbox.com/access-tokens/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              account.mapbox.com
            </a>
          </p>
          {mapError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{mapError}</p>
            </div>
          )}
          <input
            type="text"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            onKeyPress={handleKeyPress}
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
      <div ref={mapContainer} className="map-container rounded-lg" />
      
      {isLoading && (
        <div className="absolute inset-0 bg-muted/50 rounded-lg flex items-center justify-center">
          <div className="bg-card p-4 rounded-lg shadow-lg">
            <p className="text-sm">Loading map...</p>
          </div>
        </div>
      )}
      
      {mapError && !showApiInput && (
        <div className="absolute top-4 left-4 bg-red-50 border border-red-200 p-3 rounded-lg shadow-lg max-w-sm">
          <p className="text-sm text-red-600 mb-2">{mapError}</p>
          <button
            onClick={() => setShowApiInput(true)}
            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Change API Key
          </button>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg">
        <h2 className="font-semibold text-sm mb-1">CareBnB</h2>
        <p className="text-xs text-muted-foreground">
          {goodDeeds.length} care requests nearby
        </p>
      </div>
    </div>
  );
};

export default Map;