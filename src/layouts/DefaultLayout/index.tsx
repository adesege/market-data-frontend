import classnames from 'classnames';
import * as React from 'react';
import NavBar from './NavBar';

const DefaultLayout = (props: { component: React.FC; mainClassName?: string }) => {
  const Component = props.component;
  return (
    <>
      <NavBar />
      <main className={classnames(['h-full pt-16', props.mainClassName])}>
        <Component />
      </main>
    </>
  );
};

DefaultLayout.defaultProps = {
  mainClassName: '',
};

export default DefaultLayout;
