import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Root from './component/Root/Root';
// import Footer from './pages/Footer/Footer'

ReactDOM.render(<Root/>, document.getElementById('root'));
// ReactDOM.render(<Footer/>, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
