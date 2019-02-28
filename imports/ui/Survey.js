import React from 'react';

export default class Survey extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			survey: ''
		}
	}
	renderQuestions() {
		return(
			<section>
				<h3> Mentoring App Survey </h3>
				<form>
					<p> 1.  What is your Gender? </p>
					<ul>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					  <li><input type = "radio" name = "gender" value = "male" /></li>
					</ul>
				</form>
			</section>
		);
	}
	render() {
		return (
			<div>
				{this.renderQuestions()}
			</div>
		);
	}
}