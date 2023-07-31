import React, { Component } from 'react';

import './CardsItems.css'
import MovieService from '../../services/movieDB-service';

export default class CardsItems extends Component {

    movieService = new MovieService();

    state = {
        name: null,
        realise: null,
        overview: null
    }

    constructor() {
        super();
        this.updateMovie();
    }

    updateMovie() {
        this.movieService
            .getMovie('drive')
            .then((results) => {
                this.setState({
                    name: results.original_title,
                    realise: results.release_date,
                    overview: results.overview
                })

            })
    }


    render() {

        const { name, realise, overview } = this.state;

        return (
            <div className='item-contener'>
                <img className='movie-poster'
                    src="https://www.themoviedb.org/t/p/original/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg" />

                <div>
                    <h5>{name}</h5>
                    <p className='realise-date'>{realise}</p>
                    <p className='overview'>{overview}</p>
                </div>

            </div>
        )

    }
}