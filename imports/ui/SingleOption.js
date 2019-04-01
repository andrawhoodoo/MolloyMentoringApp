import React from 'react';


export default class SingleOption extends React.Component {
	delete(e) {
		e.preventDefault();
		this.props.deletefunc();
	}
	render() {
	  	return (
			<div>
				<input type="text" placeholder="Enter Your Option" defaultValue={this.props.value} onChange={this.props.handler}/>
				<button onClick={this.delete.bind(this)}>Remove Button</button>
			</div>
		)
	}
}