import React, { createContext, useContext, useState } from 'react';
import { ServiceType } from '../types';

interface ServiceContextType {
  service: ServiceType;
  setService: (service: ServiceType) => void;
  toggleService: () => void;
  currency: string;
  setCurrency: (c: string) => void;
  currencySymbol: string;
  formatPrice: (amount: number) => string;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [service, setService] = useState<ServiceType>('ROOM');
  const [currency, setCurrency] = useState<string>('INR');

  const toggleService = () => {
    setService(prev => prev === 'ROOM' ? 'FOOD' : 'ROOM');
  };

  const currencySymbol = '₹';

  const formatPrice = (amount: number) => {
    return `₹${Math.round(amount).toLocaleString('en-IN')}`;
  };

  return (
    <ServiceContext.Provider value={{
      service,
      setService,
      toggleService,
      currency,
      setCurrency,
      currencySymbol,
      formatPrice,
    }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useService must be used within a ServiceProvider');
  return context;
};
