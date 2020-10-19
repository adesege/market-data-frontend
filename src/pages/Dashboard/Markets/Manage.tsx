import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import AppButton from '../../../components/AppButton';
import AppFlash from '../../../components/AppFlash';
import AppInput from '../../../components/AppInput';
import AppSelect from '../../../components/AppSelect';
import { ISelectOption } from '../../../interfaces/app-select';
import { IFlashTypes } from '../../../interfaces/flash';
import { ICreateMarket, MarketState } from '../../../interfaces/market';
import { IRoute } from '../../../interfaces/route';
import { RootState } from '../../../store';
import { showFlash } from '../../../store/flash';
import { createMarket, editMarket, getMarket } from '../../../store/market';

type EventType = React.ChangeEvent<HTMLInputElement | HTMLSelectElement>;
type ImageListProps = {
  url: string;
  index: number;
  onChangeImage: Function;
};

const ImageList = (props: ImageListProps) => (
  <div className="flex justify-between items-center">
    <AppInput
      type="url"
      value={props.url}
      id={`image-${props.index}`}
      label={`Image url #${props.index + 1}`}
      containerClass="flex-1 p-1"
      pattern="^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?"
      placeholder="https://"
      required
      onChange={(event: EventType) => props.onChangeImage(event, props.index)}
    />
  </div>
);

const ManageMarket = () => {
  const [formData, setFormData] = React.useState<ICreateMarket>({
    name: '',
    description: '',
    category: '',
    images: ['', '', ''],
    address: '',
  });

  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();
  const market = useSelector<RootState, MarketState>((state) => state.market);

  const isEdit = !!formData.id;
  const categoryOptions: ISelectOption[] = [
    {
      text: 'Please select',
      value: '',
    },
    {
      text: 'Furniture',
      value: 'Furniture',
    },
    {
      text: 'Groceries',
      value: 'Groceries',
    },
    {
      text: 'Restaurants',
      value: 'Restaurats',
    },
    {
      text: 'Electronics',
      value: 'Electronics',
    },
  ];

  const onChange = (event: EventType) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const onChangeImage = (event: EventType, index: number) => {
    formData.images[index] = event.target.value;
    setFormData({ ...formData });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    try {
      setIsLoading(true);
      if (isEdit) await dispatch(editMarket(formData));
      else await dispatch(createMarket(formData));
      dispatch(showFlash({ type: IFlashTypes.info, messages: ['Saved successfully'] }));
      setIsLoading(false);
      history.push(IRoute.market);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!params.id) return;
    dispatch(getMarket(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (!params.id) return;
    setFormData(market.market);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [market]);

  return (
    <div className="sm:w-2/3">
      <div className="flex items-center mb-5">
        <Link to={IRoute.market} className="text-blue-600 pr-5"> &lt; Go back</Link>
        <h1 className="text-4xl">{isEdit ? 'Edit Market' : 'Add Market'}</h1>
      </div>
      <AppFlash timeout={60 * 1000} className="mb-5" />
      <form onSubmit={onSubmit}>
        <AppInput name="name" id="name" label="Name" onChange={onChange} value={formData.name} required />
        <AppInput name="description" id="description" label="Description" onChange={onChange} value={formData.description} required />
        <AppInput name="address" id="address" label="Address" placeholder="Must include city, state or country for accuracy" onChange={onChange} value={formData.address} required />
        <AppSelect id="category" name="category" label="Category" value={formData.category} onChange={onChange} options={categoryOptions} required />
        {formData.images.map((url, index) => (
          <ImageList
            onChangeImage={onChangeImage}
            url={url}
            index={index}
            // eslint-disable-next-line react/no-array-index-key
            key={index}
          />
        ))}
        <AppButton disabled={isLoading} type="submit" className="bg-blue-900 text-white w-full">
          Submit
        </AppButton>
      </form>
    </div>
  );
};

export default ManageMarket;
