import * as React from 'react';
import '../assets/css/main.scss';
import SearchForm from '../components/shared/main/SearchForm';
import SearchResultCard from '../components/shared/main/SearchResultCard';
import { ISearchFormChildrenProps } from '../interfaces/search-form';

const Main = () => {
  const [searchFormProps, setSearchFormProps] = React.useState<ISearchFormChildrenProps>({
    latitude: 0,
    longitude: 0,
    isNearMe: false,
  });

  return (
    <>
      <SearchForm>{(props) => setSearchFormProps(props)}</SearchForm>
      <SearchResultCard {...searchFormProps} />
    </>
  );
};

export default Main;
