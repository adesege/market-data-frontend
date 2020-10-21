import { useJsApiLoader } from '@react-google-maps/api';
import classnames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { IMarketWithCoordinates } from '../../../interfaces/market';
import { ISearchFormChildrenProps } from '../../../interfaces/search-form';
import { RootState } from '../../../store';
import AppLoader from '../../app/AppLoader';
import ImageCarousel from '../../app/ImageCarousel';
import SearchResultMap from './SearchResultMap';

const SearchResultCard = (props: ISearchFormChildrenProps) => {
  const searchResults = useSelector<RootState, IMarketWithCoordinates[]>(
    (state) => state.search.results,
  );

  const { isLoaded, loadError } = useJsApiLoader({ googleMapsApiKey: process.env.GOOGLE_API_KEY });

  return (
    <div className={classnames(['container', { 'py-20': !!searchResults.length || props.isSearching }])}>
      {props.isSearching
        ? <AppLoader />
        : searchResults.map((item, index) => (
          <div
            key={item.name}
            className={classnames([
              'max-w-sm w-full lg:max-w-full lg:flex shadow-lg rounded',
              { 'mb-10': index + 1 !== searchResults.length },
            ])}
          >
            <div className="max-w-sm rounded rounded-tr-none rounded-br-none overflow-hidden">
              <ImageCarousel images={item.images} alt={item.name} />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{item.name}</div>
                <p className="text-gray-700 text-base mb-3">
                  {item.description}
                </p>
                <p className="text-gray-700 text-sm">
                  {item.address}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{item.category}</span>
              </div>
            </div>
            <div className=" bg-white flex flex-col justify-between leading-normal w-full">
              {loadError && <div>Map cannot be loaded right now, sorry.</div>}
              {!isLoaded && <h1>Loading</h1>}
              {isLoaded && !loadError && <SearchResultMap geolocation={props} market={item} />}
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResultCard;
