import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <Link href="/">
      <div className={`pr-4 nav-img h-8 flex flex-row items-center cursor-pointer sm:border-0 ${className}`}>
        <Image 
          className="h-full sm:h-6" 
          src="/reddium_symbol.svg" 
          alt="Reddium Symbol" 
          width={48} 
          height={32} 
        />
        <h1 className="ml-4 site-name text-3xl tracking-tighter sm:hidden text-black">
          Reddium
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
