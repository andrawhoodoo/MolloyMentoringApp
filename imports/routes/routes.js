import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import LoginBox from '../ui/login-page';
import CreateUser from '../ui/login-create';
import Home from '../ui/Home';
import Profile from '../ui/Profile';
import SurveyList from '../ui/SurveyList';
import AddSurvey from '../ui/Survey';
import NotFound from '../ui/NotFound';

export const browserHistory = createBrowserHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/home', '/profile', '/surveys', '/create-survey'];

const onEnterPublicPage = (Component) => {
	if (Meteor.userId()) {
		return <Redirect to='/home' />;
	}
	else {
		return <Component />;
	}
};

const onEnterPrivatePage = (Component) => {
	if (!Meteor.userId()) {
		return <Redirect to='/' />;
	}
	else {
		return <Component />;
	}
}

export const onAuthChange = (isAuthenticated) => {
	const pathname = browserHistory.location.pathname;
	const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
	const isAuthenticatedPage = authenticatedPages.includes(pathname);
	
	if(isAuthenticated && isUnauthenticatedPage) {
		browserHistory.replace('/home');
	}
	if(!isAuthenticated && isAuthenticatedPage) {
		browserHistory.replace('/');
	}
}

export const routes = (
    <Router history={browserHistory}>
        <Switch>
            <Route exact path="/" render={() => onEnterPublicPage(LoginBox)} />
            <Route exact path="/signup" render={() => onEnterPublicPage(CreateUser)} />
            <Route exact path="/home" render={() => onEnterPrivatePage(Home)} />
            <Route exact path="/profile" render={() => onEnterPrivatePage(Profile)} />
            <Route exact path="/surveys" render={() => onEnterPrivatePage(SurveyList)} />
            <Route exact path="/create-survey" render={() => onEnterPrivatePage(AddSurvey)} />
			<Route render={() => {NotFound}} />
			
			
        </Switch>
    </Router>
);