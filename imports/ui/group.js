import React from 'react';

export default class Group extends React.Component {
	render() {
		return (
			<div>
				<h1>Group Name</h1>
				<p>Group Description</p>
				<div>
					<ul>
						<li><input type='radio' name='role' value="Mentor">Mentor</li>
						<li><input type='radio' name='role' value="Mentee">Mentee</li>
					</ul>
					<button>Join Group</button>
				</div>
			</div>
		);
	}
}