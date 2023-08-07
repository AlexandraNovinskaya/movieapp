import React, { createContext, useContext, useState } from 'react';

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
    const [ratedMovies, setRatedMovies] = useState([]);

    const addRatedMovie = (movie) => {
        setRatedMovies(prevRatedMovies => [...prevRatedMovies, movie]);
    };

    return (
        <RatingContext.Provider value={{ ratedMovies, addRatedMovie }}>
            {children}
        </RatingContext.Provider>
    );
};

export const useRatingContext = () => {
    return useContext(RatingContext);
};