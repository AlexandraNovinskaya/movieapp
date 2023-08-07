// import React, { createContext, useContext, useEffect, useState } from 'react';
// import MovieService from '../../services/MovieService';

// const GenreContext = createContext();

// export const useGenreContext = () => useContext(GenreContext);

// export const GenreProvider = ({ children }) => {
//     const [genres, setGenres] = useState([]);

//     useEffect(() => {
//         const movieService = new MovieService();
//         movieService.getGenres()
//             .then((genreList) => {
//                 setGenres(genreList);
//             })
//             .catch((error) => {
//                 console.error('Failed to fetch genres:', error);
//             });
//     }, []);

//     const getGenreById = (id) => {
//         return genres.find(genre => genre.id === id);
//     };

//     return (
//         <GenreContext.Provider value={{ genres, getGenreById }}>
//             {children}
//         </GenreContext.Provider>
//     );
// };