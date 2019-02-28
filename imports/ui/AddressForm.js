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
				<div className="container mb-3">
					<form className="profileEditor">
						<ul className="list-unstyled">
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Street 1: </span></div><input className="form-control" type="text" ref="street1" defaultValue={this.state.address.street1} /></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Street 2: </span></div><input className="form-control" type="text" ref="street2" defaultValue={this.state.address.street2} /></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">City: </span></div><input className="form-control" type="text" ref="city" defaultValue={this.state.address.city} /></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">State: </span></div><input className="form-control" type="text" ref="state" defaultValue={this.state.address.state} /></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Zip: </span></div><input className="form-control" type="text" ref="zip" defaultValue={this.state.address.zip} /></div></li>
						</ul>
						<button className="btn btn-lg btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
					</form>
				</div>
			);
		}
		else if(this.state.address) {
			return (
				<div className="container mb-3">
					<ul className="list-unstyled">
						<li><span className="mr-2 my-2 p-1 rounded bg-light text-dark">Street 1: </span>{this.state.address.street1}</li>
						<li><span className="mr-2 my-2 p-1 rounded bg-light text-dark">Street 2: </span>{this.state.address.street2}</li>
						<li><span className="mr-2 my-2 p-1 rounded bg-light text-dark">City: </span>{this.state.address.city}</li>
						<li><span className="mr-2 my-2 p-1 rounded bg-light text-dark">State: </span>{this.state.address.state}</li>
						<li><span className="mr-2 my-2 p-1 rounded bg-light text-dark">Zip: </span>{this.state.address.zip}</li>
					</ul>
					<button className="btn btn-danger btn-lg" onClick={this.editAddress.bind(this)}>Edit your address</button>
				</div>
			);
		}
		else {
			return (
				<div className="container mb-3">
					<form className="profileEditor">
						<ul className="list-unstyled">
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Street 1: </span></div><input className="form-control" type="text" ref="street1"/></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Street 2: </span></div><input className="form-control" type="text" ref="street2"/></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">City: </span></div><input className="form-control" type="text" ref="city"/></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">State: </span></div><input className="form-control" type="text" ref="state"/></div></li>
							<li><div className="input-group"><div className="input-group-prepend"><span className="input-group-text">Zip: </span></div><input className="form-control" type="text" ref="zip"/></div></li>
						</ul>
						<button className="btn btn-lg btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
					</form>
				</div>
			);
		}
	}
}
