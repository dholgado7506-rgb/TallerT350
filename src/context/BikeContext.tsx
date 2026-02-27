import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BikeContextType {
    totalKm: string;
    setTotalKm: (km: string) => void;
}

const BikeContext = createContext<BikeContextType | undefined>(undefined);

export const BikeProvider = ({ children }: { children: ReactNode }) => {
    const [totalKm, setTotalKm] = useState('1240');

    return (
        <BikeContext.Provider value={{ totalKm, setTotalKm }}>
            {children}
        </BikeContext.Provider>
    );
};

export const useBike = () => {
    const context = useContext(BikeContext);
    if (context === undefined) {
        throw new Error('useBike must be used within a BikeProvider');
    }
    return context;
};
