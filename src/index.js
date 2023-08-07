import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';


import App from './components/App/App';


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App/App';
// import { GenreProvider } from './components/GenreContext/GenreContext';

// ReactDOM.render(
//     // <React.StrictMode>
//         // <GenreProvider>
//             <App />
//         {/* </GenreProvider> */}
//     {/* </React.StrictMode>, */}
//     document.getElementById('root')
// );