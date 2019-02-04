import React from 'react';

export default class Profile extends React.Component {
    render() {
        return(
            <section id="profile-page" class="text-secondary mt-3">
                <div class="container">
                    <h1 class="user-name px-3 mb-4">[Your Name Here]'s profile</h1>
                    <div class="user-customization px-3 py-4 bg-dark text-white">
                        <img src="foo" alt="User Avatar Here" />
                        <p class="lead">About me paragraph. Lorem ipsum dolor something...</p>
                        <button class="btn btn-danger">Edit Section</button>
                    </div>

                    <div class="settings my-4 px-3">
                        <div class="row py-2">
                            <h4 class="px-3 font-weight-bold"><i class="fas fa-cogs"></i>&nbsp; Settings</h4>
                        </div>
                        <div class="row py-2">
                            <div class="col-md-4">
                                <button class="btn btn-dark btn-block">Change password</button>
                            </div>
                            <div class="col-md-4">
                                <button class="btn btn-secondary btn-block">Request group change</button>
                            </div>

                            <div class="col-md-4">
                                <button class="btn btn-dark btn-block">Contact an administrator</button>
                            </div>
                        </div>
                        <div class="row py-2">	
                            <div class="col">
                                <button class="btn btn-danger btn-block">Search for Groups</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}