import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppButton from '../../../components/AppButton';
import AppFlash from '../../../components/AppFlash';
import AppInput from '../../../components/AppInput';
import AppSelect from '../../../components/AppSelect';
import { ISelectOption } from '../../../interfaces/app-select';
import { ICreateMarket } from '../../../interfaces/market';
import { IRoute } from '../../../interfaces/route';
import { createMarket } from '../../../store/market';

type EventType = React.ChangeEvent<HTMLInputElement>;
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
      label={`Image url #${props.index + 1}`}
      containerClass="flex-1 p-1"
      onChange={(event: EventType) => props.onChangeImage(event, props.index)}
    />
  </div>
);

const AddMarket = () => {
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
  const categoryOptions: ISelectOption[] = [
    {
      text: 'Furniture',
      value: 'furniture',
    },
    {
      text: 'Groceries',
      value: 'groceries',
    },
    {
      text: 'Restaurants',
      value: 'restaurats',
    },
    {
      text: 'Electronics',
      value: 'electronics',
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
      await dispatch(createMarket(formData));
      setIsLoading(false);
      history.push(IRoute.market);
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:w-2/3">
      <AppFlash className="mb-5" />
      <h1 className="text-4xl mb-5">Add Market</h1>
      <form onSubmit={onSubmit}>
        <AppInput name="name" id="name" label="Name" onChange={onChange} value={formData.name} required />
        <AppInput name="description" id="description" label="Description" onChange={onChange} value={formData.description} required />
        <AppInput name="address" id="address" label="Address" onChange={onChange} value={formData.address} required />
        <AppSelect id="category" label="Category" options={categoryOptions} required />
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

export default AddMarket;
