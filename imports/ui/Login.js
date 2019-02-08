import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component {
    render() {
        return(
            <div>
                <section id="main-page" className="bg-danger">
                    <div className="container">
                        <h1 className="title text-center text-white py-5 mb-2">Online Mentoring App &nbsp;<i className="fas fa-comments"></i></h1>
                        <div className="container">
                            <div className="button-holder row p-0">
                                <div className="col-sm-12 p-0 mb-4">
                                    <button className="btn btn-block btn-dark" onClick={() => {ReactDOM.render()}}><i className="fas fa-pen"></i>&nbsp;Create Account</button>
                                </div>
                                <div className="col-sm-12 p-0 mb-4">
                                    <button className="btn btn-block btn-primary" onClick={() => {ReactDOM.render()}}><i className="fas fa-user"></i>&nbsp;Log in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer id="main-footer" className="bg-dark text-white p-2">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <p className="lead copyright text-center">Made by the Molloy App Development Team</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        ) 
    }
}