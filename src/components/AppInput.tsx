import classnames from 'classnames';
import * as React from 'react';

type IInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  containerClass?: string;
};

const AppInput = ({ containerClass, ...props }: IInputProps) => (
  <div className={classnames(['mb-4', containerClass])}>
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
      {props.label}
    </label>
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...props} />
  </div>
);

AppInput.defaultProps = {
  containerClass: null,
};

export default AppInput;
