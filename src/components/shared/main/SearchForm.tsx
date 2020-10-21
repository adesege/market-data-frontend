import * as React from 'react';
import { useDispatch } from 'react-redux';
import { GeolocationCoordinates, ISearchFormChildrenProps } from '../../../interfaces/search-form';
import { AppDispatch } from '../../../store';
import { searchMarket } from '../../../store/search';
import { getCategoryOptions } from '../../../utils';
import AppButton from '../../app/AppButton';
import AppFlash from '../../app/AppFlash';
import AppInput from '../../app/AppInput';
import AppSelect from '../../app/AppSelect';

const SearchForm = (props: { children: (props: ISearchFormChildrenProps) => void }) => {
  const [formData, setFormData] = React.useState({ category: '', name: '', isNearMe: false });
  const [isSearching, setIsSearching] = React.useState(false);
  const [myCoordinates, setMyCoordinates] = React.useState<GeolocationCoordinates>({
    latitude: 0,
    longitude: 0,
  });

  const dispatch = useDispatch<AppDispatch>();

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    setFormData({ ...formData, [event.target.name]: value });
  };

  const requestGeolocationPermission = (): Promise<GeolocationCoordinates> => new Promise(
    (resolve, reject) => navigator.geolocation.getCurrentPosition(
      (position) => resolve({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      }),
      (error) => reject(error),
    ),
  );

  const onSearch = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSearching(true);
    let coordinates;
    if (formData.isNearMe) {
      coordinates = await requestGeolocationPermission();
    }
    try {
      await dispatch(searchMarket({ ...formData, ...coordinates }));
      setIsSearching(false);
      setMyCoordinates(coordinates);
    } catch (error) {
      setIsSearching(false);
    }
  };

  React.useEffect(
    () => props.children({
      ...myCoordinates,
      isNearMe: formData.isNearMe,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [myCoordinates, formData.isNearMe],
  );

  return (
    <>
      <form onSubmit={onSearch}>
        <div className="bg-blue-800 h-56 flex items-center">
          <div className="container w-2/3">
            <AppFlash className="mb-5" />
            <div className="flex">
              <AppInput name="name" containerClass="flex-1 px-2" onChange={onChange} id="name" placeholder="Search by market name" required={!formData.isNearMe && !formData.category} />
              <AppSelect id="category" containerClassName="flex-1 w-1/2 px-2" name="category" value={formData.category} onChange={onChange} options={getCategoryOptions()} required={!formData.isNearMe && !formData.name} />
              <AppButton type="submit" className="bg-blue-600 text-white w-1/4 px-2" disabled={isSearching}>Search</AppButton>
            </div>
            <label htmlFor="nearMe" className="text-white pl-2">
              <input type="checkbox" name="isNearMe" checked={formData.isNearMe} onChange={onChange} required={!formData.name && !formData.category} id="nearMe" />
              &nbsp; Near me
            </label>
          </div>
        </div>
      </form>
    </>
  );
};

export default SearchForm;
