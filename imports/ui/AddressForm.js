import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Profiles } from '../api/profiles';

export default class AddressForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			address: '',
			isEditing: false
		}
	}
	componentDidMount() {
		this.addressTracker = Tracker.autorun(() => {
			Meteor.subscribe('profileData');
			const profile = Profiles.find().fetch();
			this.setState(profile[0] && profile[0].address ? {address: profile[0].address} : {address: ''});
		});
	}
	componentWillUnmount() {
		this.addressTracker.stop();
	}
	editAddress() {
		this.setState({isEditing: true});
	}
	onSubmit(e) {
		e.preventDefault();
		const Address = {
			street1: this.refs.street1.value.trim(),
			street2: this.refs.street2.value.trim(),
			city: this.refs.city.value.trim(),
			state: this.refs.state.value.trim(),
			zip: this.refs.zip.value.trim()
		};
		Meteor.call('updateAddress', Address);
		if(this.state.isEditing) {
			this.setState({isEditing: false});
		}
	}
	render() {
		if(this.state.isEditing && this.state.address) {
			return (
				<form className="profileEditor">
					<ul className="list-unstyled">
						<li>Street 1: <input type="text" ref="street1" defaultValue={this.state.address.street1} /></li>
						<li>Street 2: <input type="text" ref="street2" defaultValue={this.state.address.street2} /></li>
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
						<li>Street 1: {this.state.address.street1}</li>
						<li>Street 2: {this.state.address.street2}</li>
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
						<li>Street 1: <input type="text" ref="street1"/></li>
						<li>Street 2: <input type="text" ref="street2"/></li>
						<li>City: <input type="text" ref="city"/></li>
						<li>State: <input type="text" ref="state"/></li>
						<li>Zip: <input type="text" ref="zip"/></li>
					</ul>
					<button className="btn btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
				</form>
			);
		}
	}
}
