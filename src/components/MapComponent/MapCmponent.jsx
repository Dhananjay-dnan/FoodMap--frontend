// MapComponent.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  GoogleMap,
  LoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';

const MapCmponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentPosition(pos);
        },
        () => {
          console.error('Error fetching geolocation');
          // Default to a location, e.g., New Delhi
          setCurrentPosition({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      console.error('Browser does not support Geolocation');
      setCurrentPosition({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  const onLoadMap = useCallback((map) => {
    setMapInstance(map);
    mapRef.current = map;
  }, []);

  const onUnmountMap = useCallback(() => {
    setMapInstance(null);
  }, []);

  const onMarkerDragEnd = (event) => {
    const newPosition = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCurrentPosition(newPosition);
  };

  const onLoadAutocomplete = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const onPlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.geometry) {
        const pos = {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        };
        setCurrentPosition(pos);
        mapInstance.panTo(pos);
      } else {
        console.error('No details available for input: ' + place.name);
      }
    } else {
      console.error('Autocomplete is not loaded yet!');
    }
  };

  return (
    <LoadScript
      googleMapsApiKey="AIzaSyD9NOBzFaVbhqCoCVuLQyEU4vM9aOEAsjM"
      libraries={['places']}
    >
      {currentPosition && (
        <>
          <Autocomplete
            onLoad={onLoadAutocomplete}
            onPlaceChanged={onPlaceChanged}
          >
            <input
              type="text"
              placeholder="Search for places..."
              ref={inputRef}
              style={{
                boxSizing: 'border-box',
                border: '1px solid transparent',
                width: '240px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                fontSize: '14px',
                outline: 'none',
                position: 'absolute',
                left: '50%',
                marginLeft: '-120px',
                top: '100px',
                zIndex: '10',
              }}
            />
          </Autocomplete>
          <GoogleMap
            mapContainerStyle={{
              height: '40vh',
              width: '40%',
            }}
            center={currentPosition}
            zoom={15}
            borderRadius={100}
            onLoad={onLoadMap}
            onUnmount={onUnmountMap}
            options={{
              zoomControl: true,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            <Marker
              position={currentPosition}
              draggable={true}
              onDragEnd={onMarkerDragEnd}
            />
          </GoogleMap>
        </>
      )}
    </LoadScript>
  );
};

export default MapCmponent;