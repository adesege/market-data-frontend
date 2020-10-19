import classnames from 'classnames';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { IFlashMessage, IFlashTypes } from '../interfaces/flash';
import { RootState } from '../store';

const AppFlash = (props: { className: string; timeout?: number }) => {
  const flashMessage = useSelector<RootState, IFlashMessage>((state) => state.flash);

  const [isFlashVisible, setIsFlashVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsFlashVisible(false);
    }, props.timeout);

    return () => clearTimeout(timer);
  }, [props.timeout]);

  const getFlashType = (type: IFlashTypes) => {
    switch (type) {
      case IFlashTypes.error:
        return 'bg-red-100 border-red-500 text-red-700';
      case IFlashTypes.info:
        return 'bg-blue-100 border-blue-500 text-blue-700';
      default: return '';
    }
  };

  if (!flashMessage.type || !isFlashVisible) return null;

  return (
    <div className={classnames(['border-l-4 p-4', getFlashType(flashMessage.type), props.className])} role="alert">
      {flashMessage.title && (<p className="font-bold">{flashMessage.title}</p>)}
      {flashMessage.messages.map((message) => (<p key={message}>{message}</p>))}
    </div>
  );
};

AppFlash.defaultProps = {
  timeout: 10000,
};

export default AppFlash;
