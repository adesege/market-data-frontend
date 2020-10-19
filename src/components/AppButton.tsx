import * as classnames from 'classnames';
import * as React from 'react';

const AppButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={classnames(['rounded h-10', props.className])}>{props.children}</button>
);

export default AppButton;