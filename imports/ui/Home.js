import React from 'react';

import NavBar from './NavBar';
import Footer from './Footer';

export default class Home extends React.Component {
    render() {
        return (
            <div>
				<NavBar />
				<section id="home-page" className="text-secondary mt-3">
					<div className="container">
						<h2 className="welcome-name px-3 mb-4">Welcome [Your Name Here]!</h2>
					</div>	
					<div className="notifications bg-dark text-white p-3 mb-4">
						<h4><i className="far fa-bell"></i>&nbsp; You have [ X ] new notifications!</h4>
					</div>
					<div className="container">
						<div className="card mb-4">
							<div className="card-header">
								<h3>User's Active Groups</h3>
								<table className="table table-striped">
									<thead className="thead-dark">
										<tr>
											<th>Group Name</th>
											<th>Status</th>
											<th>Mentor/Mentee Name</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Self-help</td>
											<td>Mentee</td>
											<td>John Doe</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
										</tr>
										<tr>
											<td>Algebra</td>
											<td>Mentor</td>
											<td>Terry Crews</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
										</tr>
										<tr>
											<td>World Domination</td>
											<td>Mentee</td>
											<td>Danny DeVito</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Group</a></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
//					<div className="group-search bg-light p-3 mb-4">
//						<h4>Looking for more groups?</h4>
//						<a href="#" className="btn btn-danger">Search for more...</a>
//					</div>
				</section>
				<Footer />
			</div>
        );
    }
};