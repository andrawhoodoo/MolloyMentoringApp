import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import Home from './Home';
import SurveyList from './SurveyList';
import Profile from './Profile';

export default class NavBar extends React.Component {
	onLogout() {
		Accounts.logout();
	}
    render() {
        return (
            <nav className="navbar navbar-expand bg-danger navbar-dark px-2">
                <div className="container">
                    <a href="#" id="brand-name" className="navbar-brand font-weight-bold">OMA</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <button className="btn btn-sm btn-dark mx-1"><Link className="text-white" to='/home'><i className="fas fa-home fa-2x"></i></Link></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-dark mx-1"><Link className="text-white" to='/profile'><i className="fas fa-user-circle fa-2x"></i></Link></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-dark mx-1"><Link className="text-white" to='/surveys'><i className="fas fa-clipboard-list fa-2x"></i></Link></button>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-sm btn-dark mx-1 text-white" onClick={this.onLogout.bind(this)}><i className="fas fa-user-times fa-2x"></i></button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}