import React, { Component } from 'react';
import { Spin } from 'antd'
import './CardsItems.css'
import MovieService from '../../services/movieDB-service';

export default class CardsItems extends Component {

    movieService = new MovieService();

    state = {
        movies: [],
        loading: true
    }

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
                    movies: results,
                    loading: false
                })

            })
    }


    render() {

        // const { poster, name, realise, overview } = this.state;
        const { movies, loading } = this.state;

        // console.log('name ' + name)
        if (loading) {
            return <Spin />
        }
        return (
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
                            <p className='realise-date'>{movie.realise_date}</p>
                            <p className='overview'>{movie.overview}</p>
                        </div>

                    </div>
                ))}

            </div>
        )

    }
}