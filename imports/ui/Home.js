import React from 'react';

export default class Home extends React.Component {
    render() {
        return (
            <section id="home-page" class="text-secondary mt-3">
                <div class="container">
                    <h2 class="welcome-name px-3 mb-4">Welcome [Your Name Here]!</h2>
                </div>	
                <div class="notifications bg-dark text-white p-3 mb-4">
                    <h4><i class="far fa-bell"></i>&nbsp; You have [ X ] new notifications!</h4>
                </div>
                <div class="container">
                    <div class="card mb-4">
                        <div class="card-header">
                            <h3>User's Active Groups</h3>
                            <table class="table table-striped">
                                <thead class="thead-dark">
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
                                        <td><a href="#" class="btn btn-danger text-white">Go To Group</a></td>
                                    </tr>
                                    <tr>
                                        <td>Algebra</td>
                                        <td>Mentor</td>
                                        <td>Terry Crews</td>
                                        <td><a href="#" class="btn btn-danger text-white">Go To Group</a></td>
                                    </tr>
                                    <tr>
                                        <td>World Domination</td>
                                        <td>Mentee</td>
                                        <td>Danny DeVito</td>
                                        <td><a href="#" class="btn btn-danger text-white">Go To Group</a></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="group-search bg-light p-3 mb-4">
                    <h4>Looking for more groups?</h4>
                    <a href="#" class="btn btn-danger">Search for more...</a>
                </div>
            </section>
        )
    }
}