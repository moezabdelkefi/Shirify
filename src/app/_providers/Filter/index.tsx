'use client'
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IContextType {
    categoryFilters: string[];
    setCategoryFilters: (filters: string[]) => void;
    sort: string;
    setSort: (sort: string) => void;
}

const INITIAL_FILTER_DATA: IContextType = {
    categoryFilters: [],
    setCategoryFilters: () => {},
    sort: '',
    setSort: () => {},
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
    const [sort, setSort] = useState<string>('-createdAt');

    return(
        <FilterContext.Provider value={{
            categoryFilters,
            setCategoryFilters,
            sort,
            setSort,
        }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilter = () => useContext(FilterContext);