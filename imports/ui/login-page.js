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
            <div id="Login-Box" className="molloy-background text-white">
                <div id="Login-Logo-Float-Left" className="text-center mb-5">
                    <h1 className='bg-dark py-3'> Molloy College Online Mentoring App </h1>
                </div>
                <div id="Login-Info-Float-Right" className='container pb-5'>
                    <div id="Login-Section" className='card bg-dark pb-5'>
						<div className="card-header">
							<h1> Login Here </h1>
							{this.state.error ? <p className="text-warning">{this.state.error}</p> : undefined}
						</div>
						<div className="card-body">
							<form className="mb-3" onSubmit={this.onSubmit.bind(this)}>
								<div className="mb-3" >
									<h4>Email: </h4>
									<input className= "Login-Box" type="email" ref='email' name="email" placeholder="Enter email" />
								</div>
								<div className="mb-3">
									<h4>Password: </h4>
									<input className="Login-Box" type="password" ref='password' name="password" placeholder="Enter Password" />
								</div>
								<input className="btn molloy-button text-white" type="submit" name="" value="Login" />
							</form>
							<Link className="btn btn-primary text-white" to='/signup'>Don't have an account?</Link>
						</div>
                    </div>
                </div>
            </div>
        );
    }
};
	
