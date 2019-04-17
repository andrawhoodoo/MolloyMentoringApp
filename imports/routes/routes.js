import { Meteor } from "meteor/meteor";
import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { createBrowserHistory } from "history";

import LoginBox from "../ui/login-page";
import CreateUser from "../ui/login-create";
import Home from "../ui/Home";
import Profile from "../ui/Profile";
import SurveyList from "../ui/SurveyList";
import AddSurvey from "../ui/Survey";
import ChatList from "../ui/ChatList";
import GroupSearch from '../ui/GroupSearch';
import CreateGroup from '../ui/CreateGroup';
import NotFound from "../ui/NotFound";

export const browserHistory = createBrowserHistory();

//Array of pages accessible to all users
const unauthenticatedPages = ["/", "/signup"];

//Array of pages accessible only to users who are logged in
const authenticatedPages = [
  "/home",
  "/profile",
  "/surveys",
  "/create-survey",
  "/create-group",
  "/Chatroom",
  "/group-search"
];

/**
 * Determines if a currently logged in user should be able to see the current public page or component
 * @param {React Component} Component - the current component the user is attempting to view
 * returns the appropriate React Component based on authentication.
 */
const onEnterPublicPage = Component => {
  if (Meteor.userId()) {
    return <Redirect to="/home" />;
  } else {
    return <Component />;
  }
};

/**
 * Determines if a user should be able to see the current private page or component
 * @param {React Component} Component - the current component the user is attempting to view
 * returns the appropriate React Component based on authentication.
 */
const onEnterPrivatePage = Component => {
  if (!Meteor.userId()) {
    return <Redirect to="/" />;
  } else {
    return <Component />;
  }
};


export const onAuthChange = isAuthenticated => {
  const pathname = browserHistory.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isAuthenticated && isUnauthenticatedPage) {
    browserHistory.replace("/home");
  }
  if (!isAuthenticated && isAuthenticatedPage) {
    browserHistory.replace("/");
  }
};

export const routes = (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" render={() => onEnterPublicPage(LoginBox)} />
      <Route
        exact
        path="/signup"
        render={() => onEnterPublicPage(CreateUser)}
      />
      <Route exact path="/home" render={() => onEnterPrivatePage(Home)} />
      <Route exact path="/profile" render={() => onEnterPrivatePage(Profile)} />
      <Route
        exact
        path="/Chatroom"
        render={() => onEnterPrivatePage(ChatList)}
      />
      <Route
        exact
        path="/surveys"
        render={() => onEnterPrivatePage(SurveyList)}
      />
      <Route
        exact
        path="/create-survey"
        render={() => onEnterPrivatePage(AddSurvey)}
      />
	  <Route
        exact
        path="/create-group"
        render={() => onEnterPrivatePage(CreateGroup)}
      />
	  <Route
        exact
        path="/group-search"
        render={() => onEnterPrivatePage(GroupSearch)}
      />
      <Route
        render={() => {
          NotFound;
        }}
      />
    </Switch>
  </Router>
);
