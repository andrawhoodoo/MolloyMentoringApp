import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Home';
import SurveyList from './SurveyList';
import Profile from './Profile';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-expand bg-danger navbar-dark px-2">
                <div class="container">
                    <a href="#" id="brand-name" class="navbar-brand font-weight-bold">OMA</a>
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <button class="btn btn-sm btn-light mx-1" onClick={() => {
                                ReactDOM.render(<Home />, document.getElementById('AppConsole'));
                            }}><i class="fas fa-home fa-2x"></i></button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-sm btn-light mx-1" onClick={() => {
                                ReactDOM.render(<Profile />, document.getElementById('AppConsole'));
                            }}><i class="fas fa-user-circle fa-2x"></i></button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-sm btn-light mx-1" onClick={() => {
                                ReactDOM.render(<SurveyList />, document.getElementById('AppConsole'));
                            }}><i class="fas fa-clipboard-list fa-2x"></i></button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-sm btn-light mx-1"><i class="fas fa-user-times fa-2x"></i></button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}