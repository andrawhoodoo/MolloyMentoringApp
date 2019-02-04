import React from 'react';

export default class LoginCreate extends React.Component {
    render() {
        return(
            <div id="Login-Box">
                <div id="Login-Logo-Float-Left">
                    <img id="Login-Logo" src="Online-Mentoring-Login-Logo-2.png" />
                    <h1> Molloy College Online Mentoring App </h1>
                </div>
                <div id="Login-Info-Float-Right">
                    <div id="Login-Section">
                        <img class="Molloy-Logo" src="Molloy-Logo-Real.png" />
                        <h1> Create Account </h1>
                        <form>
                            <p>First Name: </p>
                            <input class= "Login-Box" type="text" name="firstName" placeholder="Enter First Name" />

                            <p>Last Name: </p>
                            <input class="Login-Box" type="text" name="lastName" placeholder="Enter Last Name" />

                            <p>Email: </p>
                            <input class="Login-Box" type="Email" name="emailAddress" placeholder="Enter Last Name" />

                            <p>Username: </p>
                            <input class= "Login-Box" type="text" name="username" placeholder="Enter Username" />

                            <p>Password: </p>
                            <input class="Login-Box" type="password" name="password" placeholder="Enter Password" />

                            <input type="submit" name="" value="Create" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};