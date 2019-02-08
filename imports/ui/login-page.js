import React from 'react';

export default class LoginBox extends React.Component {
    render() {
        return (
            <div id="Login-Box" className="bg-danger text-white container">
               
                <div id="Login-Logo-Float-Left">
                    <img id="Login-Logo" src="Online-Mentoring-Login-Logo-2.png" />
                    <h1> Molloy College Online Mentoring App </h1>
                </div>
                <div id="Login-Info-Float-Right">
                    <div id="Login-Section">
                        <img className="Molloy-Logo" src="Molloy-Logo-Real.png" />
                        <h1> Login Here </h1>
                        <form>
                            <p>Username: </p>
                            <input className= "Login-Box" type="text" name="username" placeholder="Enter Username" />
                            <p>Password: </p>
                            <input className="Login-Box" type="password" name="password" placeholder="Enter Password" />
                            <input type="submit" name="" value="Login" />
                            //here needs to match credentials.
                            <a href="#" className="btn btn-info btn-block">Lost your password?</a>
                            <a href="#" className="btn btn-success btn-block">Don't have an account?</a>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};
	
