import React from 'react';
import Logo from './Logo';  // Assuming Logo is in the parent directory
import { NavMenu } from './index';  // Import NavMenu from the index file of common components
import { getTimeOfDay } from '../../functions/common'; // Adjust the import path as needed

interface HeaderProps {
  token: string;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ token, className = '' }) => {
  return (
    <header className={className}>
      <nav className="flex items-center justify-center max-width-main mx-auto z-50 h-16 my-6 lg:mx-12 sm:mx-6">
        <div className="flex-grow flex items-center">
          <Logo />
          <div className="pl-4">
            <h1 className="font-bold text-lg leading-6 nav-greeting sm:hidden">
              {getTimeOfDay()}
            </h1>
          </div>
        </div>
        <NavMenu token={token} />
      </nav>
    </header>
  );
};

export default Header;
