import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";
import SingleOption from "./SingleOption";


export default class QuestionForm extends React.Component {
	constructor(props){
	super(props);
	  this.state = {
		OptionArray: [{value: "", active: true}, {value: "", active: true}],
		Error: ''
	  }
	}

	renderActiveOptions() {
		return this.state.OptionArray.map((option, index) => {
			return (option.active ? <li key={index}><SingleOption handler={this.handleChange.bind(this, index)} value={option.value} deletefunc={this.deleteOption.bind(this, index)} /></li> : undefined)
		});
	}
	addOption() {
		this.setState({OptionArray: this.state.OptionArray.concat({value: "", active: true})});
		this.setState({Error: ''});
	}
	deleteOption(index) {
	  let activeOptions = this.state.OptionArray.filter(option => option.active === true);
	  if(activeOptions.length > 2) {
		  this.state.OptionArray[index].active = false;
		  this.setState({OptionArray: this.state.OptionArray});
	  }
	  else {
		  this.setState({Error: "Cannot have less than two options."})
	  }
	}
	handleChange(index, e) {
	  this.state.OptionArray[index].value = e.target.value;
	  this.setState({OptionArray: this.state.OptionArray});
	}
	submit(e) {
		let qTitle = this.refs.qTitle.value.trim();
		let filteredArray = this.state.OptionArray.filter(option => option.active === true);
		this.props.submitfunc(filteredArray, qTitle);
	}
	render() {
		return (
		  <div className="container">
			<div className="card mb-4">
			  <div className="card-header">
				<h3 className="text-dark">Create Your Survey</h3>
			  </div>
				  <div className="card-body">
					<input ref="qTitle" type="text" placeholder="Enter Your Question"/>
					<div>
					  <ul>
						{this.renderActiveOptions()}
					  </ul>
					  {this.state.Error ? <p className="text-warning">{this.state.Error}</p> : undefined }
					</div>
					<div>
					  <ul>
						<li>unwanted options</li>
					  </ul>
					</div>
				  </div>
					<button className="hover" type="button" onClick={this.addOption.bind(this) }>Add New Option</button>
					<button className="hover"  type="button" onClick={ this.submit.bind(this) }>Add Question</button>
			  </div>
		  </div>
		)
	}
}
