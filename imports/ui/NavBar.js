import React from 'react';
import ReactDOM from 'react-dom';

import Home from './Home';
import SurveyList from './SurveyList';
import Profile from './Profile';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand bg-danger navbar-dark px-2">
                <div className="container">
                    <a href="#" id="brand-name" className="navbar-brand font-weight-bold">OMA</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-sm btn-light mx-1" onClick={() => {
                                ReactDOM.render(<Home />, document.getElementById('AppConsole'));
                            }}><i className="fas fa-home fa-2x"></i></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-light mx-1" onClick={() => {
                                ReactDOM.render(<Profile />, document.getElementById('AppConsole'));
                            }}><i className="fas fa-user-circle fa-2x"></i></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-light mx-1" onClick={() => {
                                ReactDOM.render(<SurveyList />, document.getElementById('AppConsole'));
                            }}><i className="fas fa-clipboard-list fa-2x"></i></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-light mx-1"><i className="fas fa-user-times fa-2x"></i></button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}