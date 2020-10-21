import * as React from 'react';

export interface ISelectOption {
  text: string;
  value: string;
}

export interface IAppSelectProps {
  id: string;
  label?: string;
  required: boolean,
  options: ISelectOption[];
  name: string;
  value: string;
  containerClassName?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}
