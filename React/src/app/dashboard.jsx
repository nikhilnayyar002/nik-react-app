
import React from 'react';
import { getData, isUserPayloadValid } from "../controllers/main";
import config from '../data/app.config';

/* the main page for the home route of this app */
class DashBoardComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false
        };
        if (!isUserPayloadValid())  /* guard 1 */
            window.location.href = window.location.origin + '/';
        else if (!props.state.user) {   /* guard 2, a load on this component */
            getData(config.api.base + config.api.userProfilePath)
                .then(data => {
                    if (data && data.status)
                        this.setState({
                            isLoggedIn: true,
                            user: data.user
                        })
                    else {
                        window.location.href = window.location.origin + '/';
                    }
                });
        }
        else this.state = props.state;
    }

    render() {

        if (!this.state.isLoggedIn)
            return (
                <div>
                    <h1>Check Status...</h1>
                    <p>If its taking too much time goto homepage. If that still want works! you have a poor internet Connection</p>
                </div>
            )
        else
            return (
                <div className="row">
                    <div className='col-4'>
                        <div className="card text-white bg-primary mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card text-white  bg-secondary mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card text-white bg-warning mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card text-white  bg-success mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card text-white  bg-danger mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card text-white  bg-dark mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card text-white  bg-info mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-4'>
                        <div className="card  bg-light mb-3">
                            <div className="card-header">Header</div>
                            <div className="card-body">
                                <h5 className="card-title">Primary card title</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
    }

}

export default DashBoardComponent;
