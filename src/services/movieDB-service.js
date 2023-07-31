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
            throw new Error(`Could not fetch ${url}` + `, received ${response.status}`)
        }

        const body = await response.json();
        const results = body.results;

        console.log('Movie endpoint ' + results[0])
        return results;
    }

    async getAllMovie() {
        return await this.getResource(`https://api.themoviedb.org/3/search/movie`);
    }

    async getMovie(name) {
        const queryUrl = `https://api.themoviedb.org/3/search/movie?query=${name}`;
        return await this.getResource(queryUrl);
    }
}

// const mov = new MovieService();

// mov.getMovie('drive').then((results) => {
//     //например, получаем лист всех фильмов
//     let movieTitles = results.map((movie) => movie.title);
//     // console.log(movieTitles);
// })
