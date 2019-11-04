import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/app';
import 'bootstrap/dist/css/bootstrap.min.css';

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<App />, document.getElementById('reactMountPoint'));
});
