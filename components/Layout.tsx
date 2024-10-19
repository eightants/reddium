import React from "react";
import Header from './common/Header';
import TitleHead from './TitleHead';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  token: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, token }) => {
  return (
    <>
      <TitleHead title={title} />
      <Header token={token} />
      {children}
    </>
  );
};

export default Layout;
