import {
  GoogleMap,
  InfoWindow,
  Marker
} from '@react-google-maps/api';
import * as React from 'react';
import { IMarketWithCoordinates } from '../../../interfaces/market';
import { GeolocationCoordinates } from '../../../interfaces/search-form';

type SearchResultMapProps = {
  geolocation: GeolocationCoordinates;
  market: IMarketWithCoordinates;
};

const SearchResultMap = (props: SearchResultMapProps) => {
  const marketLocation = { lat: props.market.latitude, lng: props.market.longitude };
  const userLocation = { lat: props.geolocation.latitude, lng: props.geolocation.longitude };
  const infoWindowOffset = new window.google.maps.Size(0, -26);
  const isNearMe = !!props.geolocation.latitude && !!props.geolocation.longitude;

  return (
    <GoogleMap
      mapContainerClassName="h-full"
      zoom={11}
      center={marketLocation}
    >
      {isNearMe && (
        <InfoWindow
          position={userLocation}
          options={{ pixelOffset: infoWindowOffset }}
        >
          <h1>My location</h1>
        </InfoWindow>
      )}

      <InfoWindow
        position={marketLocation}
        options={{ pixelOffset: infoWindowOffset }}
      >
        <h1>{props.market.name}</h1>
      </InfoWindow>

      <Marker
        icon="/images/store.png"
        position={marketLocation}
      />
      {isNearMe && (
        <Marker
          position={userLocation}
          icon="/images/home.png"
          animation={1}
        />
      )}
    </GoogleMap>
  );
};

export default React.memo(SearchResultMap);
