export interface ISelectOption {
  text: string;
  value: string;
}

export interface IAppSelectProps {
  id: string;
  label: string;
  required: boolean,
  options: ISelectOption[];
}
