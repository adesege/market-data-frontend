import { ISelectOption } from '../interfaces/app-select';

export const getAuthToken = (): string => localStorage.getItem('authToken');

export const getCategoryOptions = (): ISelectOption[] => [
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
    value: 'Restaurants',
  },
  {
    text: 'Electronics',
    value: 'Electronics',
  },
];
