import React, { Component } from 'react';
import './CardsItems.css';
import { Pagination, Alert } from 'antd';
import MovieService from '../../services/MovieService';
import SearchComponent from '../SearchComponent/SearchComponent';
import Spinner from '../Spinner/Spinner';

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
        };
    }

    componentDidMount() {
        this.updateMovies();
    }

    updateMovies(page = 1) {
        const { pageSize } = this.state;

        this.setState({ loading: true, noResults: false, error: null });

        this.movieService
            .getMovie('', page, pageSize)
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

        this.movieService
            .getMovie(searchQuery)
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
    }

    render() {
        const { loading, movies, noResults, currentPage, pageSize, totalResults, error } = this.state;

        return (
            <div >
                <SearchComponent onSearch={this.updateMoviesWithSearch} />


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
                                <img
                                    className='movie-poster'
                                    src={`https://www.themoviedb.org/t/p/original/${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <div>
                                    <h5 className='mov-title'>{movie.title}</h5>
                                    <p className='release_date'>{movie.release_date}</p>
                                    <p className='overview'>{movie.overview}</p>
                                </div>
                            </div>
                        ))}
                        <div className="pagination-container">
                            <Pagination
                                current={currentPage}
                                pageSize={pageSize}
                                total={totalResults}
                                onChange={this.handlePageChange}
                                className="pagination"
                            />
                        </div>
                    </div>
                )}
            </div>
        );
    }
}