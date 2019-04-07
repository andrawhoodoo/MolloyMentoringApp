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

import React from "react";
import { Link } from "react-router-dom";
import { Accounts } from "meteor/accounts-base";

import "../api/profiles";

export default class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: ""
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let confirmPassword = this.refs.confirmPassword.value.trim();
    let fName = this.refs.firstName.value.trim();
    let lName = this.refs.lastName.value.trim();

    if (password.length < 8) {
      return this.setState({
        error: "Password must be at least 8 characters long."
      });
    }

    if (password != confirmPassword) {
      return this.setState({
        error: "Passwords do not match"
      });
    }

    Accounts.createUser({ email: email, password: password }, err => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        // On success, create extended information document in Profiles collection
        Meteor.call("createProfile", fName, lName);

        this.setState({ error: "" });
      }
    });
  }

  render() {
    return (
      <div id="Login-Box" className="molloy-background text-white">
        <div id="Login-Logo-Float-Left" className="text-center mb-5">
          <h1 className="bg-dark py-3">
            {" "}
            Molloy College Online Mentoring App{" "}
          </h1>
        </div>
        <div id="Login-Info-Float-Right" className="container pb-5">
          <div id="Login-Section" className="card bg-dark pb-5">
            <div className="card-head">
              <h1 className="p-3"> Create Account </h1>
            </div>
            <div className="card-body">
              <form
                className="mb-3"
                onSubmit={this.onSubmit.bind(this)}
                noValidate
              >
                <div className="mb-3">
                  <h4>First Name: </h4>
                  <input
                    className="Login-Box"
                    type="firstName"
                    ref="firstName"
                    name="firstName"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="mb-3">
                  <h4>Last Name: </h4>
                  <input
                    className="Login-Box"
                    type="lastName"
                    ref="lastName"
                    name="lastName"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="mb-3">
                  <h4>Email: </h4>
                  <input
                    className="Login-Box"
                    type="email"
                    ref="email"
                    name="email"
                    placeholder="Enter email"
                  />
                </div>
                <div className="mb-3">
                  <h4>Password: </h4>
                  <input
                    className="Login-Box"
                    type="password"
                    ref="password"
                    name="password"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="mb-3">
                  <h4>Confirm Password: </h4>
                  <input
                    className="Login-Box"
                    type="password"
                    ref="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </div>
                <input
                  className="btn molloy-button text-white"
                  type="submit"
                  name=""
                  value="Create"
                />
              </form>
              {this.state.error ? (
                <p className="text-warning">{this.state.error}</p>
              ) : (
                undefined
              )}
              <Link className="btn btn-primary text-white" to="/">
                Already have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
				// On success, create extended information document in Profiles collection
				Meteor.call('createProfile', fName, lName);

				this.setState({error: ''});
			}
		});
	}

    render() {
        return(
            <div id="Login-Box" className="molloy-background text-white">
                <div id="Login-Logo-Float-Left" className="text-center mb-5">
                    <h1 className='bg-dark py-3'> Molloy College Online Mentoring App </h1>
                </div>
                <div id="Login-Info-Float-Right" className='container pb-5'>
                    <div id="Login-Section" className='card bg-dark pb-5'>
                        <div className="card-head">
                        	<h1 className='p-3'> Create Account </h1>
                        </div>
                        <div className="card-body">
	                        <form className="mb-3" onSubmit={this.onSubmit.bind(this)} noValidate>

	                        	<div className="mb-3" >
										<h4>First Name: </h4>
										<input className= "Login-Box" type="firstName" ref='firstName' name="firstName" placeholder="Enter First Name" />
									</div>
									<div className="mb-3">
										<h4>Last Name: </h4>
										<input className="Login-Box" type="lastName" ref='lastName' name="lastName" placeholder="Enter Last Name" />
									</div>
									<div className="mb-3" >
										<h4>Email: </h4>
										<input className= "Login-Box" type="email" ref='email' name="email" placeholder="Enter email" />
									</div>
									<div className="mb-3">
										<h4>Password: </h4>
										<input className="Login-Box" type="password" ref='password' name="password" placeholder="Enter Password" />
									</div>
	                            <input className="btn molloy-button text-white" type="submit" name="" value="Create" />
	                        </form>
							{this.state.error ? <p className="text-warning">{this.state.error}</p> : undefined}
							<Link className="btn btn-primary text-white" to="/">Already have an account?</Link>
                    	</div>
                    </div>
                </div>
            </div>
        );
    }
};
