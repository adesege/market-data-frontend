import classnames from 'classnames';
import * as React from 'react';
import { IFlashTypes } from '../../interfaces/flash';

const AppAlert = (props: {
  title?: string;
  messages: string[];
  type: IFlashTypes;
  className?: string;
}) => {
  const getFlashType = (type: IFlashTypes) => {
    switch (type) {
      case IFlashTypes.error:
        return 'bg-red-100 border-red-500 text-red-700';
      case IFlashTypes.info:
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default: return '';
    }
  };

  return (
    <div className={classnames(['border-l-4 p-4', getFlashType(props.type), props.className])} role="alert">
      {props.title && (<p className="font-bold">{props.title}</p>)}
      {props.messages.map((message) => (<p key={message}>{message}</p>))}
    </div>

  );
};

AppAlert.defaultProps = {
  title: '',
  className: '',
};

export default AppAlert;
