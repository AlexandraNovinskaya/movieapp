import React, { Component } from 'react';
import './CardsItems.css';
import { Pagination, Alert } from 'antd';
import MovieService from '../../services/MovieService';
import SearchComponent from '../SearchComponent/SearchComponent';
import Spinner from '../Spinner/Spinner';
import { Rate } from 'antd';
import RatedTab from '../RatedTab/RatedTab';
import { useRatingContext } from '../RatingContext/RatingContext';


// import { MovieServiceProvider } from '../MovieServiceCont/MovieServiceCont';

function formatDate(inputDate) {
    const date = new Date(inputDate);
    const option = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', option);
}

function lessText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
}

function getRatingColor(rating) {
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

export default class CardsItems extends Component {
    movieService = new MovieService();

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            movies: [],
            noResults: false,
            currentPage: 1,
            pageSize: 6,
            totalResults: 0,
            error: null,
            page: 1,
            guestSessionId: null,
        };


    }



    componentDidMount() {
        this.movieService.createGuestSession()
            .then((guestSessionId) => {
                this.setState({
                    guestSessionId: guestSessionId
                });

                const { page } = this.state;
                this.updateMovies(page);
            })
            .catch((error) => {
                console.error("Failed to create guest session:", error);
            });
    }


    updateMovies(page) {
        const { pageSize } = this.state;

        this.setState({ loading: true, noResults: false, error: null });
        // console.log(page)

        const searchQuery = '';

        this.movieService
            .getMovieByPage(searchQuery, page, pageSize)
            // .getMovie('', pageSize, page)
            .then((results) => {
                if (results.length === 0) {
                    this.setState({
                        loading: false,
                        movies: [],
                        noResults: true,
                    });
                } else {
                    this.setState({
                        loading: false,
                        movies: results,
                        noResults: false,
                        totalResults: results.totalResults,
                        currentPage: page,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    movies: [],
                    noResults: false,
                    error: error.message,
                });
            });
    }


    updateMoviesWithSearch = (searchQuery) => {
        this.setState({ loading: true, noResults: false, error: null });

        const { page, pageSize } = this.state

        this.movieService
            .getMovieByPage(searchQuery, page, pageSize)
            // .getMovie(searchQuery)
            .then((results) => {
                if (results.length === 0) {
                    this.setState({
                        loading: false,
                        movies: [],
                        noResults: true,
                    });
                } else {
                    this.setState({
                        loading: false,
                        movies: results,
                        noResults: false,
                    });
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    movies: [],
                    noResults: false,
                    error: error.message,
                });
            });
    }

    handlePageChange = (page) => {
        this.updateMovies(page);
        // console.log(page)
    }

    handleRatingChange = (movieId, value) => {
        // Отправьте оценку на сервер с использованием вашего MovieService
        this.movieService.rateMovie(movieId, value)
            .then(() => {
                // Обновите состояние фильма с новой оценкой
                const updatedMovies = this.state.movies.map((movie) => {
                    if (movie.id === movieId) {
                        return { ...movie, rating: value };
                    }
                    return movie;
                });

                // const ratedMovie = {
                //     id: movieId,
                //     title: movie.title,
                //     rating: value
                // }

                this.setState({ movies: updatedMovies }, () => {
                    const { addRatedMovie } = useRatingContext();

                    addRatedMovie({
                        id: movieId,
                        title: updatedMovies.find(movie => movie.id === movieId).title,
                        rating: value
                    })
                    // this.ratedTabRef.addRatedMovie({
                    //     id: movieId,
                    //     title: updatedMovies.find(movie => movie.id === movieId).title,
                    //     rating: value
                    // })
                });
            })
            .catch((error) => {
                console.error("Failed to rate movie:", error);
            });
    }


    render() {
        const { loading, movies, noResults, currentPage, pageSize, totalResults, error } = this.state;

        // const { getGenreById } = useGenreC?ontext();
        return (
            // <GenreContext.Consumer>

            <div className='wind-size'>
                <div className='search-line'>
                    <SearchComponent onSearch={this.updateMoviesWithSearch} />
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
                                    {/* <p>{genres?}</p> */}
                                    <p className='release_date'>{formatDate(movie.release_date)}</p>
                                    <p className='overview'>{lessText(movie.overview, 250)}</p>
                                    <Rate
                                        allowHalf
                                        value={movie.rating}
                                        onChange={this.handleRatingChange.bind(this, movie.id)}
                                    />
                                    <RatedTab ref={ref => this.ratedTabRef = ref} />
                                </div>

                            </div>
                        ))}
                        <div className="pagination-container">
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={(Math.min(totalResults, 20))}
                                onChange={this.handlePageChange}
                                className='pagination'
                            />
                        </div>
                    </div>
                )}
            </div>
        )
    }


}