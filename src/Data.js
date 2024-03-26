import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [FarmName, setFarmName] = useState("Please Log in");

    const storeDate = async (value) => {
        try {
            await AsyncStorage.setItem('date', value);
        } catch (e) {
            // saving error
        }
    }

    const storeFarmName = async (value) => {
        try {
            await AsyncStorage.setItem('FarmName', value);
            setFarmName(value);
        }
        catch (e) {
            // saving error
        }
    }


    useEffect(() => {
        const loadStoredFarmName = async () => {
            const Str = await AsyncStorage.getItem('FarmName');
            if (Str) {
                setFarmName(Str)
            }
        }
        
        loadStoredFarmName();
    }
    , []);
    

    return (
        <DataContext.Provider value={{ selectedDate, setSelectedDate, storeDate, FarmName, setFarmName, storeFarmName   }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);