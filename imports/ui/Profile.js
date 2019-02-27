import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import NavBar from './NavBar';
import Footer from './Footer';
import {Profiles} from '../api/profiles';

export default class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			address: '',
			isEditing: false
		}
	}
	componentDidMount() {
		this.profileTracker = Tracker.autorun(() => {
			Meteor.subscribe('profileData');
			const profile = Profiles.find().fetch();
			this.setState(profile[0] ? {name: profile[0].name} : {name: ''});
			this.setState(profile[0] && profile[0].address ? {address: profile[0].address} : {address: ''})
		});
	}
	componentWillUnmount() {
		this.profileTracker.stop();
	}
	renderCustomHeader() {
		return <h1 className="user-name px-3 mb-4">{this.state.name.first}'s Profile</h1>;
	}
	onSubmit(e) {
		e.preventDefault();
		const Address = {
			street: this.refs.street.value.trim(), 
			city: this.refs.city.value.trim(), 
			state: this.refs.state.value.trim(), 
			zip: this.refs.zip.value.trim()
		};
		Meteor.call('updateAddress', Address);
		if(this.state.isEditing) {
			this.setState({isEditing: false});
		}
	}
	renderCompletedAddress() {
		if(this.state.isEditing && this.state.address) {
			return (
				<form className="profileEditor">
					<ul className="list-unstyled">
						<li>Street: <input type="text" ref="street" defaultValue={this.state.address.street} /></li>
						<li>City: <input type="text" ref="city" defaultValue={this.state.address.city} /></li>
						<li>State: <input type="text" ref="state" defaultValue={this.state.address.state} /></li>
						<li>Zip: <input type="text" ref="zip" defaultValue={this.state.address.zip} /></li>
					</ul>
					<button className="btn btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
				</form>
			)
		}
		else if(this.state.address) {
			return (
				<div>
					<ul className="list-unstyled">
						<li>Street: {this.state.address.street}</li>
						<li>City: {this.state.address.city}</li>
						<li>State: {this.state.address.state}</li>
						<li>Zip: {this.state.address.zip}</li>
					</ul>
					<button className="btn btn-danger" onClick={this.editAddress.bind(this)}>Edit your address</button>
				</div>
			);
		}
		else {
			return (
				<form className="profileEditor">
					<ul className="list-unstyled">
						<li>Street: <input type="text" ref="street"/></li>
						<li>City: <input type="text" ref="city"/></li>
						<li>State: <input type="text" ref="state"/></li>
						<li>Zip: <input type="text" ref="zip"/></li>
					</ul>
					<button className="btn btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
				</form>
			);
		}
	}
	editAddress() {
		this.setState({isEditing: true});
	}
    render() {
        return (
            <div>
				<NavBar />
				<section id="profile-page" className="text-secondary mt-3">
					<div className="container">
						{this.renderCustomHeader()}
						<div className="user-customization px-3 py-4 bg-dark text-white">
							{this.renderCompletedAddress()}
						</div>

					{/*	<div className="settings my-4 px-3">
							<div className="row py-2">
								<h4 className="px-3 font-weight-bold"><i className="fas fa-cogs"></i>&nbsp; Settings</h4>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<button className="btn btn-dark btn-block">Change password</button>
								</div>
								<div className="col-md-4">
									<button className="btn btn-secondary btn-block">Request group change</button>
								</div>

								<div className="col-md-4">
									<button className="btn btn-dark btn-block">Contact an administrator</button>
								</div>
							</div>
							<div className="row py-2">
								<div className="col">
									<button className="btn btn-danger btn-block">Search for Groups</button>
								</div>
							</div>
						</div>*/}
					</div>
				</section>
				<Footer />
			</div>
        );
    }
};
