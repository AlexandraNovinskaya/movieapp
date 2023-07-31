import React from 'react';

import CardsItems from '../CardsItems/CardsItems';
import Search from '../Search/Search';
const App = () => {

    return (
        <div>
            <h1>Movie List</h1>
            <Search />
            <CardsItems />
        </div>

    );
};

export default App;