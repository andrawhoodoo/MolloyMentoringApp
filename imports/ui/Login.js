import React from 'react';
import ReactDOM from 'react-dom';

export default class Login extends React.Component {
    render() {
        return(
            <div>
                <section id="main-page" class="bg-danger">
                    <div class="container">
                        <h1 class="title text-center text-white py-5 mb-2">Online Mentoring App &nbsp;<i class="fas fa-comments"></i></h1>
                        <div class="container">
                            <div class="button-holder row p-0">
                                <div class="col-sm-12 p-0 mb-4">
                                    <button class="btn btn-block btn-dark" onClick={() => {ReactDOM.render()}}><i class="fas fa-pen"></i>&nbsp;Create Account</button>
                                </div>
                                <div class="col-sm-12 p-0 mb-4">
                                    <button class="btn btn-block btn-primary" onClick={() => {ReactDOM.render()}}><i class="fas fa-user"></i>&nbsp;Log in</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <footer id="main-footer" class="bg-dark text-white p-2">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <p class="lead copyright text-center">Made by the Molloy App Development Team</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        ) 
    }
}