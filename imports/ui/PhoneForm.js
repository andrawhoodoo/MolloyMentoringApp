import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Profiles } from '../api/profiles';

export default class PhoneForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			phone: '',
			isEditing: false
		}
	}
	componentDidMount() {
		this.phoneTracker = Tracker.autorun(() => {
			Meteor.subscribe('profileData');
			const profile = Profiles.find().fetch();
			this.setState(profile[0] && profile[0].phone ? {phone: profile[0].phone} : {phone: ''});
		});
	}
	componentWillUnmount() {
		this.phoneTracker.stop();
	}
	editPhone() {
		this.setState({isEditing: true});
	}
	onSubmit(e) {
		e.preventDefault();
		const Phone = {
			area: this.refs.area.value.trim(),
			pre: this.refs.pre.value.trim(),
			line: this.refs.line.value.trim(),

		};
		Meteor.call('updatePhone', Phone);
		if(this.state.isEditing) {
			this.setState({isEditing: false});
		}
	}
	render() {
		if(this.state.isEditing && this.state.phone) {
			return (
				<div className="container mb-3">
					<form className="profileEditor">
						<div className="input-group mb-3"><div className="input-group-prepend"><span className="input-group-text">Phone: </span></div>
							<input className="form-control" type="text" ref="area" defaultValue={this.state.phone.area} />-
							<input className="form-control" type="text" ref="pre" defaultValue={this.state.phone.pre} />-
							<input className="form-control" type="text" ref="line" defaultValue={this.state.phone.line} />
						</div>
						<button className="btn btn-danger btn-lg" onClick={this.onSubmit.bind(this)}>Submit</button>
					</form>
				</div>
			)
		}
		else if(this.state.phone) {
			return (
				<div className="container mb-3">
					<div className="mb-3"><span className="mr-2 my-2 p-1 rounded bg-light text-dark">Phone:</span>
					{this.state.phone.area} - {this.state.phone.pre} - {this.state.phone.line}
					</div>
					<button className="btn btn-danger btn-lg" onClick={this.editPhone.bind(this)}>Edit your phone number</button>
				</div>
			);
		}
		else {
			return (
				<div className="container mb-3">
					<form className="profileEditor">
						<div className="input-group mb-3"><div className="input-group-prepend"><span className="input-group-text">Phone:</span></div>
							<input className="form-control" type="text" ref="area" placeholder='(XXX)' />
							<input className="form-control" type="text" ref="pre" placeholder='XXX' />
							<input className="form-control" type="text" ref="line" placeholder='XXXX' />
						</div>
						<button className="btn  btn-lg btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
					</form>
				</div>
			);
		}
	}
}
