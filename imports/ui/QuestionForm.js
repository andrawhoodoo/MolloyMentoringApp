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
		return (option.active ? <li key={index}><SingleOption value={option.value} deletefunc={this.deleteOption.bind(this, index)} /></li> : undefined)
    });
  }
  addOption() {
    this.state.OptionArray.push({value: "", active: true});
  }
  deleteOption(index) {
    this.state.OptionArray[index].active = false;
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
