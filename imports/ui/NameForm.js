import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import { Profiles } from '../api/profiles';

export default class PhoneForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			isEditing: false,
			err: ''
		}
	}
	componentDidMount() {
		this.nameTracker = Tracker.autorun(() => {
			Meteor.subscribe('profileData');
			const profile = Profiles.find().fetch();
			this.setState(profile[0] && profile[0].name ? {name: profile[0].name} : {name: ''});
		});
	}
	componentWillUnmount() {
		this.nameTracker.stop();
	}
	editName() {
		this.setState({isEditing: true});
	}
	onSubmit(e) {
		e.preventDefault();
		const first = this.refs.first.value.trim()
		const last = this.refs.last.value.trim()
		if(first.length < 2 || last.length < 2) {
			this.setState({err: "Name fields must be non-empty and at least 2 characters in length"});
		}
		else {
			const Name = {
				first: first,
				last: last
			}
			Meteor.call('updateName', Name);
			if(this.state.isEditing) {
				this.setState({isEditing: false});
				this.setState({err: ''})
			}
		}	
	}
	render() {
		if(this.state.isEditing && this.state.name) {
			return (
				<div className="container mb-3">
					<form className="profileEditor">
						<div className="input-group mb-3">				
							<div className="input-group-prepend"><span className="input-group-text">Your Name: </span></div>
							<input className="form-control" type="text" ref="first" defaultValue={this.state.name.first} placeholder="first"/>
							<input className="form-control" type="text" ref="last" defaultValue={this.state.name.last} placeholder="last"/>
						</div>
						{this.state.err ? <div className="text-warning float-none pb-3">{this.state.err}</div> : undefined}
						<button className="btn molloy-button btn-lg" onClick={this.onSubmit.bind(this)}>Submit</button>
					</form>
				</div>
			)
		}
		else {
			return (
				<button onClick={this.editName.bind(this)} className="float-right btn btn-small molloy-button">Edit your name</button>
			);
		}
	}
}
