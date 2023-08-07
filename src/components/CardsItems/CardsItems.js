import React, { useState, useEffect } from 'react';
import { Pagination, Alert } from 'antd';
import MovieService from '../../services/MovieService';
import SearchComponent from '../SearchComponent/SearchComponent';
import Spinner from '../Spinner/Spinner';
import { Rate } from 'antd';
import RatedTab from '../RatedTab/RatedTab';
import { useRatingContext } from '../RatingContext/RatingContext';
import "./CardsItems.css"

function CardsItems(props) {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [noResults, setNoResults] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [totalResults, setTotalResults] = useState(0);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [guestSessionId, setGuestSessionId] = useState(null);

    const { addRatedMovie } = useRatingContext(); // Получение функции addRatedMovie из контекста оценок

    const movieService = new MovieService();

    //форматирование даты 
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const option = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', option);
    }

    //сокращение текста 
    const lessText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength - 3) + '...';
        }
        return text;
    }

    //выставление цвета 
    const getRatingColor = (rating) => {
        if (rating >= 0 && rating < 3) {
            return '#E90000';
        } else if (rating >= 3 && rating < 5) {
            return '#E97E00';
        } else if (rating >= 5 && rating < 7) {
            return '#E9D100';
        } else if (rating >= 7) {
            return '#66E900';
        }
    }

    const updateMovies = (page) => {
        setLoading(true);
        setNoResults(false);
        setError(null);

        const searchQuery = '';

        movieService.getMovieByPage(searchQuery, page, pageSize)
            .then((results) => {
                if (results.length === 0) {
                    setLoading(false);
                    setMovies([]);
                    setNoResults(true);
                } else {
                    setLoading(false);
                    setMovies(results);
                    setNoResults(false);
                    setTotalResults(results.totalResults);
                    setCurrentPage(page);
                }
            })
            .catch((error) => {
                setLoading(false);
                setMovies([]);
                setNoResults(false);
                setError(error.message);
            });
    }

    const updateMoviesWithSearch = (searchQuery) => {
        setLoading(true);
        setNoResults(false);
        setError(null);

        movieService.getMovieByPage(searchQuery, page, pageSize)
            .then((results) => {
                if (results.length === 0) {
                    setLoading(false);
                    setMovies([]);
                    setNoResults(true);
                } else {
                    setLoading(false);
                    setMovies(results);
                    setNoResults(false);
                }
            })
            .catch((error) => {
                setLoading(false);
                setMovies([]);
                setNoResults(false);
                setError(error.message);
            });
    }

    const handlePageChange = (page) => {
        updateMovies(page);
    }

    const handleRatingChange = (movieId, value) => {
        movieService.rateMovie(movieId, value)
            .then(() => {
                const updatedMovies = movies.map((movie) => {
                    if (movie.id === movieId) {
                        return { ...movie, rating: value };
                    }
                    return movie;
                });


                setMovies(updatedMovies, () => {
                    addRatedMovie({
                        id: movieId,
                        title: updatedMovies.find(movie => movie.id === movieId).title,
                        rating: value
                    });
                });
            })
            .catch((error) => {
                console.error("Failed to rate movie:", error);
            });
    }

    useEffect(() => {
        movieService.createGuestSession()
            .then((guestSessionId) => {
                setGuestSessionId(guestSessionId);
                updateMovies(page);
            })
            .catch((error) => {
                console.error("Failed to create guest session:", error);
            });
    }, []);

    return (
        <div className='wind-size'>
            <div className='search-line'>
                <SearchComponent onSearch={updateMoviesWithSearch} />
            </div>
            {loading ? (
                <Spinner />
            ) : noResults ? (
                <div>No results found.</div>
            ) : error ? (
                <Alert message="Error" description={error} type="error" />
            ) : (
                <div className='movie-col'>
                    {movies.map((movie) => (
                        <div key={movie.id} className='item-contener'>
                            <div className='rating-circle' style={{ backgroundColor: getRatingColor(movie.rating) }}>
                                {movie.rating}
                            </div>
                            <img
                                className='movie-poster'
                                src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div>
                                <h5 className='mov-title'>{movie.title}</h5>
                                <p className='release_date'>{formatDate(movie.release_date)}</p>
                                <p className='overview'>{lessText(movie.overview, 150)}</p>
                                <Rate
                                    className='stars'
                                    allowHalf
                                    value={movie.rating}
                                    onChange={(value) => handleRatingChange(movie.id, value)}
                                />
                                <RatedTab />
                            </div>
                        </div>
                    ))}
                    <div className="pagination-container">
                        <Pagination
                            current={currentPage}
                            pageSize={pageSize}
                            total={Math.min(totalResults, 20)}
                            onChange={handlePageChange}
                            className='pagination'
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default CardsItems;