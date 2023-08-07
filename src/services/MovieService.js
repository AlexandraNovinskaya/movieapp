const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTkzZDY1NDYyMDhkYjcxZTg4NjFhNTc3NjY4YWU2NyIsInN1YiI6IjY0YzNlNTM4YWY2ZTk0MDEwMDk5MmY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIdokrR9qXRzgVeDSz_03CwPqaJkLDIb9vKGmc2rxe8'
    }
};

export default class MovieService {

    async getResource(url) {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`Could not fetch ${url}, received ${response.status}`);
        }

        const body = await response.json();
        const results = body.results;

        console.log('Movie endpoint ' + results[0]);
        return results;
    }

    async createGuestSession() {
        const guestSessionUrl = `https://api.themoviedb.org/3/authentication/guest_session/new`;

        const response = await fetch(guestSessionUrl, options);

        if (!response.ok) {
            throw new Error(`Could not create guest session, received ${response.status}`);
        }

        const body = await response.json();
        const guestSessionId = body.guest_session_id;

        console.log(`Guest session created with ID: ` + guestSessionId);
        return guestSessionId;
    }

    async getAllMovie() {
        return await this.getResource(`https://api.themoviedb.org/3/search/movie`);
    }

    async getMovie(name, page) {
        const queryUrl = `https://api.themoviedb.org/3/search/movie?query=${name}`;
        return await this.getResource(queryUrl);
    }

    async getMovieByPage(name, page, pageSize) {
        const itemPerPage = 6;
        const queryUrl = `https://api.themoviedb.org/3/search/movie?query=${name}&page=${page}`;
        return await this.getResource(queryUrl);
    }

    async rateMovie(movieId, rating) {
        const rateUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
        const rateOptions = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTkzZDY1NDYyMDhkYjcxZTg4NjFhNTc3NjY4YWU2NyIsInN1YiI6IjY0YzNlNTM4YWY2ZTk0MDEwMDk5MmY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIdokrR9qXRzgVeDSz_03CwPqaJkLDIb9vKGmc2rxe8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: rating,
            }),
        };

        const response = await fetch(rateUrl, rateOptions);

        if (!response.ok) {
            throw new Error(`Could not rate movie, received ${response.status}`);
        }


        // Здесь вы можете обработать успешное голосование (если необходимо)
    }

    async getRatedMovies() {
        // Ваш код для получения оцененных фильмов
        const ratedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated`;
        const response = await fetch(ratedMoviesUrl, options);

        if (!response.ok) {
            throw new Error(`Could not fetch rated movies, received ${response.status}`);
        }

        const body = await response.json();
        const ratedMovies = body.results.map((movie) => ({
            id: movie.id,
            title: movie.title,
            rating: movie.rating, // Здесь предполагается, что у вас есть свойство rating для оценки
        }));

        return ratedMovies;
    }

    async rateMovie(movieId, rating) {
        const rateUrl = `https://api.themoviedb.org/3/movie/${movieId}/rating`;
        const rateOptions = {
            method: 'POST',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYTkzZDY1NDYyMDhkYjcxZTg4NjFhNTc3NjY4YWU2NyIsInN1YiI6IjY0YzNlNTM4YWY2ZTk0MDEwMDk5MmY2MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VIdokrR9qXRzgVeDSz_03CwPqaJkLDIb9vKGmc2rxe8',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                value: rating,
            }),
        };

        const response = await fetch(rateUrl, rateOptions);

        if (!response.ok) {
            throw new Error(`Could not rate movie, received ${response.status}`);
        }

        // Здесь вы можете обработать успешное голосование и обновить рейтинг фильма (если необходимо)
    }

    // &per_page=${itemPerPage}


}

// const mov = new MovieService();

// mov.getMovie('drive').then((results) => {
//     //например, получаем лист всех фильмов
//     let movieTitles = results.map((movie) => movie.title);
//     // console.log(movieTitles);
// })

