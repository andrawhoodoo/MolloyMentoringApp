import React from 'react';

import NavBar from './NavBar.js';
import Footer from './Footer.js';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
                <div id="AppConsole"></div>
                <Footer />
            </div>
        );
    }
};