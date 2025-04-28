import React, { createContext, useContext, useState, ReactNode } from 'react';

type VehicleType = 'B' | 'C' | null;

interface VehicleContextType {
  vehicleType: VehicleType;
  setVehicleType: (type: VehicleType) => void;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [vehicleType, setVehicleType] = useState<VehicleType>(null);

  return (
    <VehicleContext.Provider value={{ vehicleType, setVehicleType }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
