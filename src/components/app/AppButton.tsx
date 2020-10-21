import * as classnames from 'classnames';
import * as React from 'react';

const AppButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    {...props}
    className={classnames([
      'rounded h-10 px-3',
      { 'opacity-50 cursor-not-allowed': props.disabled },
      props.className,
    ])}
  >
    {props.children}

  </button>
);

export default AppButton;
