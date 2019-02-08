import React from 'react';

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="profile-footer" className="bg-dark text-white p-2">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <p className="lead copyright text-center">Made by the Molloy App Development Team</p>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }  
}