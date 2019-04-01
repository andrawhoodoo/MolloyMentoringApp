import React from 'react';


export default class SingleOption extends React.Component {
	render() {
	  	return (
			<div>
				<input type="text" placeholder="Enter Your Option" defaultValue={this.props.value}/>
				<button onClick={this.props.deletefunc}>Remove Button</button>
			</div>
		)
	}
}