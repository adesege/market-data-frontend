import { ISelectOption } from '../interfaces/app-select';

export const getAuthToken = (): string => localStorage.getItem('authToken');

export const getCategoryOptions = (): ISelectOption[] => [
  {
    text: 'Please select',
    value: '',
  },
  {
    text: 'Fruit',
    value: 'Fruit',
  },
  {
    text: 'Vegetables',
    value: 'Vegetables',
  },
  {
    text: 'Cereal',
    value: 'Cereal',
  },
  {
    text: 'Fats',
    value: 'Fats',
  },
];
