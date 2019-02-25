import React from 'react';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';

import '../api/profiles';

export default class CreateUser extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: ''
		};
	}
	onSubmit(e) {
		e.preventDefault();

		let email = this.refs.email.value.trim();
		let password = this.refs.password.value.trim();
		let fName = this.refs.firstName.value.trim();
		let lName = this.refs.lastName.value.trim();

		if (password.length < 8) {
			return this.setState({error: 'Password must be at least 8 characters long.'});
		}

		Accounts.createUser({ email: email, password: password }, (err) => {
			if(err) {
				this.setState({error: err.reason});
			}
			else {

				// On success, create extended information document in Profiles collection
				Meteor.call('createProfile', email, fName, lName);

				this.setState({error: ''});
			}
		});
	}

    render() {
        return(
            <div id="Login-Box">
                <div id="Login-Logo-Float-Left">
                    <img id="Login-Logo" src="Online-Mentoring-Login-Logo-2.png" />
                    <h1> Molloy College Online Mentoring App </h1>
                </div>
                <div id="Login-Info-Float-Right">
                    <div id="Login-Section">
                        <img className="Molloy-Logo" src="Molloy-Logo-Real.png" />
                        <h1> Create Account </h1>
                        <form onSubmit={this.onSubmit.bind(this)} noValidate>
                            <p>First Name: </p>
                            <input className= "Login-Box" type="text" ref="firstName" name="firstName" placeholder="Enter First Name" />

                            <p>Last Name: </p>
                            <input className="Login-Box" type="text" ref="lastName" name="lastName" placeholder="Enter Last Name" />

                            <p>Email: </p>
                            <input className="Login-Box" type="Email" ref="email" name="emailAddress" placeholder="Enter Email Address" />

                            <p>Password: </p>
                            <input className="Login-Box" type="password" ref="password" name="password" placeholder="Enter Password" />

                            <input type="submit" name="" value="Create" />
                        </form>
						{this.state.error ? <p className="text-warning">{this.state.error}</p> : undefined}
						<Link to="/">Already have an account?</Link>
                    </div>
                </div>
            </div>
        );
    }
};
