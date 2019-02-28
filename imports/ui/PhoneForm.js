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
				<form className="profileEditor">
					<p className="lead">Phone: &nbsp;
						<input type="text" ref="area" defaultValue={this.state.phone.area} />-
						<input type="text" ref="pre" defaultValue={this.state.phone.pre} />-
						<input type="text" ref="line" defaultValue={this.state.phone.line} />
					</p>
					<button className="btn btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
				</form>
			)
		}
		else if(this.state.phone) {
			return (
				<div>
					<p className="lead">Phone: &nbsp;
					{this.state.phone.area} - {this.state.phone.pre} - {this.state.phone.line}
					</p>
					<button className="btn btn-danger" onClick={this.editPhone.bind(this)}>Edit your phone number</button>
				</div>
			);
		}
		else {
			return (
				<form className="profileEditor">
					<p className="lead">Phone: &nbsp;
						<input type="text" ref="area" placeholder='area code' />-
						<input type="text" ref="pre" placeholder='XXX' />-
						<input type="text" ref="line" placeholder='XXXX' />
					</p>
					<button className="btn btn-danger" onClick={this.onSubmit.bind(this)}>Submit</button>
				</form>
			);
		}
	}
}
