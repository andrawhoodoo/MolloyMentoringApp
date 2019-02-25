import React from 'react';

import NavBar from './NavBar';
import Footer from './Footer';

import '../api/profiles';

export default class Profile extends React.Component {
    render() {
        return (
            <div>
				<NavBar />
				<section id="profile-page" className="text-secondary mt-3">
					<div className="container">
						<h1 className="user-name px-3 mb-4">{ Meteor.userId() }</h1>
						<div className="user-customization px-3 py-4 bg-dark text-white">
							<img src="foo" alt="User Avatar Here" />
              <form className="profileEditor">
                <ul>
                  <li>Name: <input type="text" /></li>
                  <li>Street: <input type="text" /></li>
                  <li>City: <input type="text" /></li>
                  <li>State: <input type="text" /></li>
                  <li>Zip: <input type="text" /></li>
                  <li>EMail: <input type="text" /></li>
                </ul>
  							<input type="submit" value="Submit" />
              </form>
						</div>

						<div className="settings my-4 px-3">
							<div className="row py-2">
								<h4 className="px-3 font-weight-bold"><i className="fas fa-cogs"></i>&nbsp; Settings</h4>
							</div>
							<div className="row py-2">
								<div className="col-md-4">
									<button className="btn btn-dark btn-block">Change password</button>
								</div>
								<div className="col-md-4">
									<button className="btn btn-secondary btn-block">Request group change</button>
								</div>

								<div className="col-md-4">
									<button className="btn btn-dark btn-block">Contact an administrator</button>
								</div>
							</div>
							<div className="row py-2">
								<div className="col">
									<button className="btn btn-danger btn-block">Search for Groups</button>
								</div>
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
        );
    }
};
