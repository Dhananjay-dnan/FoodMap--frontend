import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      return new Promise((resolve, reject) => {
        if (window.google) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        const API_KEY = 'AIzaSyD9NOBzFaVbhqCoCVuLQyEU4vM9aOEAsjM'; // Replace with your actual API key
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Google Maps script could not be loaded.'));
        document.head.appendChild(script);
      });
    };

    const initializeMap = () => {
      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 12.963639718196925, lng: 77.74920731193431 }, // Initial location
        zoom: 12,
      });
      console.log(google.maps.marker)
      
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        const marker = new google.maps.marker.AdvancedMarkerElement({
          map,
          position: { lat: 12.963639718196925, lng: 77.74920731193431 },
          draggable: true,
        });

        marker.addListener('dragend', (event) => {
          const newPosition = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          console.log('New position:', newPosition);
          // You can update the location in your application state or send it to your server
        });
      } else {
        console.error('AdvancedMarkerElement is not available.');
      }
    };

    const loadMap = async () => {
      try {
        await loadGoogleMapsScript();
        initializeMap();
      } catch (error) {
        console.error(error);
      }
    };

    loadMap();
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '40%' }} />;
};

export default MapComponent;