import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';


import App from './components/App/App';


const domNode = document.getElementById('root');
const root = createRoot(domNode);
root.render(<App />);