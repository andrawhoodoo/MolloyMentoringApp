import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import AddSurvey from './Survey';
import NavBar from './NavBar';
import Footer from './Footer';

export default class SurveyList extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
				<section id="survey-page" className="text-secondary mt-3">
					<div className="container">
						<h2 className="survey-welcome px-3 mb-4">[Your Name Here]'s Surveys</h2>
					</div>	

					<div className="container">
						<div className="card mb-4">
							<div className="card-header">
								<h3>User's Created Surveys</h3>
								<table className="table">
									<thead className="thead-dark">
										<tr>
											<th>Survey Type</th>
											<th>Status</th>
											<th></th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td>Mentor</td>
											<td>Complete</td>
											<td><a href="#" className="btn btn-danger text-white">Go To Survey</a></td>
											<td><a href="#" className="remove-survey-button text-dark"><i className="fas fa-times pt-2"></i></a></td>
										</tr>
										<tr>
											<td>Mentee</td>
											<td>Incomplete</td>
											<td><a href="#" className="btn btn-danger text-white">Edit Survey</a></td>
											<td><a href="#" className="remove-survey-button text-dark"><i className="fas fa-times pt-2"></i></a></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="card-footer">
							   <button className="create-survey btn btn-dark btn-block"><Link to='/create-survey'>Create a new survey!</Link></button>
							</div>
						</div>
					</div>
				</section>
				<Footer />
            </div>
        );
    }
};