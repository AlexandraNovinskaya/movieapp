import React, { Component } from 'react';
import { useRatingContext } from '../RatingContext/RatingContext';

export default function RatedTab() {
    // state = {
    //     ratedMovies: [], // Список оцененных фильмов
    // };

    const { ratedMovies } = useRatingContext();

    // // Добавьте метод для добавления оцененного фильма
    // addRatedMovie = (ratedMovie) => {
    //     this.setState(prevState => ({
    //         ratedMovies: [...prevState.ratedMovies,
    //         {
    //             id: ratedMovie.id,
    //             title: ratedMovie.title,
    //             rating: ratedMovie.rating
    //         },
    //         ],
    //     }));
    // }

    return (

        <div>
            {ratedMovies.map(movie => (
                <div key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>Ваша оценка: {movie.rating}</p>
                </div>
            ))}
        </div>
    );

}