import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from "react-dom";
import SingleOption from "./SingleOption";


export default class QuestionForm extends React.Component {
  constructor(props){
    super(props);
      this.state = {
        OptionArray: [{value: "", active: true}, {value: "", active: true}]
      }
    }
    
  renderActiveOptions() {
    return this.state.OptionArray.map((option, index) => {
		return (option.active ? <li key={index}><SingleOption handler={this.handleChange.bind(this, index)} value={option.value} deletefunc={this.deleteOption.bind(this, index)} /></li> : undefined)
    });
  }
  addOption() {
	this.setState({OptionArray: this.state.OptionArray.concat({value: "", active: true})});
	console.log(this.state.OptionArray);
  }
  deleteOption(index) {
	  this.state.OptionArray[index].active = false;
	  this.setState({OptionArray: this.state.OptionArray});
  }
  handleChange(index, e) {
	  this.state.OptionArray[index].value = e.target.value;
	  this.setState({OptionArray: this.state.OptionArray});
  }
  render() {
    return (
      <div className="container">
        <div className="card mb-4">
          <div className="card-header">
            <h3 className="text-dark">Create Your Survey</h3>
          </div>
              <div className="card-body">
                <input type="text" placeholder="Enter Your Question"/>
                <div>
                  <ul>
                    {this.renderActiveOptions()}
                  </ul>
                </div>
                <div>
                  <ul>
                    <li>unwanted options</li>
                  </ul>
                </div>
              </div>
                <button className="hover" type="button" onClick={this.addOption.bind(this) }>Add New Option</button>
                <button className="hover"  type="button" onClick={ this.newQuestion }>Add New Question</button>
          </div>
      </div>
    )
  }
}
