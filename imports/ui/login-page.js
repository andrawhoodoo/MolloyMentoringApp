import React from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class LoginBox extends React.Component {
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
		
		Meteor.loginWithPassword({email: email}, password, (err) => {
			if(err) {
				this.setState({error: 'Unable to login. Check email and password.'});
			}
			else {
				this.setState({error: ''});
			}
		});
	}
    render() {
        return (
            <div id="Login-Box" className="bg-danger text-white container">
               
                <div id="Login-Logo-Float-Left">
                    <img id="Login-Logo" src="Online-Mentoring-Login-Logo-2.png" />
                    <h1> Molloy College Online Mentoring App </h1>
                </div>
                <div id="Login-Info-Float-Right">
                    <div id="Login-Section">
                        <img className="Molloy-Logo" src="Molloy-Logo-Real.png" />
                        <h1> Login Here </h1>
						{this.state.error ? <p className="text-warning">{this.state.error}</p> : undefined}
                        <form onSubmit={this.onSubmit.bind(this)}>
                            <p>Email: </p>
                            <input className= "Login-Box" type="email" ref='email' name="email" placeholder="Enter email" />
                            <p>Password: </p>
                            <input className="Login-Box" type="password" ref='password' name="password" placeholder="Enter Password" />
                            <input type="submit" name="" value="Login" />
                        </form>
						<Link to='/signup'>Don't have an account?</Link>
                    </div>
                </div>
            </div>
        );
    }
};
	
