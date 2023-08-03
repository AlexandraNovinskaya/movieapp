import React, { Component } from 'react';
// import { Spin } from 'antd';
import Spinner from '../Spinner/Spinner';
import './CardsItems.css'
import MovieService from '../../services/movieDB-service';

export default class CardsItems extends Component {

    movieService = new MovieService();

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            movies: [],
            // totalMovies: 0,
            // elementsPerPage: 6,
            // searchTerm: '',
            // moviesRated: [],
            // totalMoviesRated: 0,
            // counter : 0,
            // moviesCurrent : [],
        };
    }

    // state = {
    //     movies: []
    // }

    // state = {
    //     poster: null,
    //     name: null,
    //     realise: null,
    //     overview: null
    // }

    componentDidMount() {
        // super();
        this.updateMovies();
    }

    updateMovies() {
        this.movieService
            .getMovie('drive')
            .then((results) => {
                this.setState({
                    // poster: results[0].poster_path,
                    // name: results[0].original_title,
                    // realise: results[0].release_date,
                    // overview: results[0].overview
                    loading: false,
                    movies: results

                })

            })
    }


    render() {

        // const { poster, name, realise, overview } = this.state;
        const { loading, movies } = this.state;

        console.log("loading" + loading)
        console.log("movies" + movies)

        return (
            <div className='movie-col'>


                {loading ? <Spinner /> : movies.map((movie) => (
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

            </div>
        )

    }
}