import React from 'react';

import NavBar from './NavBar';
import Footer from './Footer';

export default class Profile extends React.Component {
    render() {
        return (
            <div>
				<NavBar />
				<section id="profile-page" className="text-secondary mt-3">
					<div className="container">
						<h1 className="user-name px-3 mb-4">[users.profile.name.first & .last]</h1>
						<div className="user-customization px-3 py-4 bg-dark text-white">
							<img src="foo" alt="User Avatar Here" />
							<p className="lead">Pull info from DB:</p>
              <p>Name: <input type="text" placeholder="users.profile.name" /><button>Edit</button></p>
              <p>Street 1: <input type="text" placeholder="users.profile.address.street1" /><button>Edit</button></p>
              <p>Street 2: <input type="text" placeholder="street2" /><button>Edit</button></p>
              <p>City: <input type="text" placeholder=".city" /><button>Edit</button></p>
              <p>State: <input type="text" placeholder=".state" /><button>Edit</button></p>
              <p>Zip: <input type="text" placeholder=".zip" /><button>Edit</button></p>
              <p>DOB: <input type="text" placeholder="users.profile.dob" /><button>Edit</button></p>
              <p>EMail: <input type="text" placeholder=".email" /><button>Edit</button></p>
              <p>Gender: <input type="text" placeholder=".gender" /><button>Edit</button></p>
              <p>Phone: <input type="text" placeholder=".area & .pre & .line" /><button>Edit</button></p>
              <p>Bio: <input type="text" placeholder=".bio" /><button>Edit</button></p>
							<button className="btn btn-danger">Save</button>
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
