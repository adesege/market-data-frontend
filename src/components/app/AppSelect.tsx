import classnames from 'classnames';
import * as React from 'react';
import { IAppSelectProps } from '../../interfaces/app-select';

const AppSelect = (props: IAppSelectProps) => (
  <div className={classnames(['inline-block relative w-full mb-4', props.containerClassName])}>
    {props.label && (
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
        {props.label}
      </label>
    )}
    <select onChange={props.onChange} name={props.name} value={props.value} id={props.id} required={props.required} className="block w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>{option.text}</option>
      ))}
    </select>
  </div>
);

export default AppSelect;
