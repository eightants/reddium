import React, { createContext, useContext, useState, useEffect } from 'react';

interface Config {
  [key: string]: string;
}

const ConfigContext = createContext<Config | null>(null);

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (context === null) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export const ConfigProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then(response => response.json())
      .then(data => {
        setConfig(data);
        console.log('Fetched config:', data);
      })
      .catch(error => {
        console.error('Error fetching config:', error);
      });
  }, []);

  if (config === null) {
    return <div>Loading configuration...</div>; // Or any loading indicator
  }

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>;
};
