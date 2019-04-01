import React from 'react';


export default class SingleOption extends React.Component {
	render() {
	  	return (
			<div>
				<input type="text" placeHolder="Enter Your Option" value={this.props.value}/>
				<button onClick={this.props.deletefunc}>Remove Button</button>
			</div>
		)
	}
}