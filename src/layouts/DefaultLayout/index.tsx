import * as React from 'react';
import NavBar from './NavBar';

const DefaultLayout = (props: { component: React.FC }) => {
  const Component = props.component;
  return (
    <>
      <NavBar />
      <main className="container h-full px-4 pt-20">
        <Component />
      </main>
    </>
  );
};

export default DefaultLayout;
