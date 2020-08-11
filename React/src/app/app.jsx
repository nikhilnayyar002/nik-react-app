import React, { Fragment } from 'react';
import config from '../data/app.config';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeComponent from './home';
import SignInComponent from './signin';
import { getData, postData, isUserPayloadValid } from '../controllers/main'
import ProfileComponent from './profile';
import DashBoardComponent from './dashboard';

class AppComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: null
        }
        this.logout = this.logout.bind(this)
        this.logIn = this.logIn.bind(this)
    }

    initialize() {
        if (isUserPayloadValid()) /* if false means token expired */
            getData(config.api.base + config.api.userProfilePath)  /* cross check token by server for more security */
                .then(data => {
                    if (data && data.status)
                        this.setState({
                            isLoggedIn: true,
                            user: data.user
                        })
                    else
                        this.setState({
                            isLoggedIn: false,
                            user: null
                        })
                });
    }

    componentDidMount() {
        this.initialize();
    }

    logout() {
        localStorage.removeItem('token');
        this.setState({
            isLoggedIn: false,
            user: null
        })
        // window.location.href = window.location.origin + '/'
    }

    logIn(cred) {
        return postData(config.api.base + config.api.signInPath, cred)
            .then(data => {
                if (data && data.status) {
                    localStorage.setItem('token', data.token);
                    return getData(config.api.base + config.api.userProfilePath)
                        .then(data => {
                            if (data && data.status)
                                this.setState({
                                    isLoggedIn: true,
                                    user: data.user
                                })
                            else
                                this.setState({
                                    isLoggedIn: false,
                                    user: null
                                })
                            return Promise.resolve({
                                status: data.status,
                                message: data.message
                            })
                        });
                } else {
                    return Promise.resolve({
                        status: false,
                        message: data.message
                    })
                }
            })
            .catch(error => alert(error));
    }

    render() {
        return (
            <Router>
                <div className="container-fluid p-0 w-100 h-100">
                    <nav className={`navbar navbar-expand-lg ${config.nav.navType} ${config.nav.navBG}`}>
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <Link className="nav-item nav-link active" to="/">Home</Link>
                                {
                                    this.state.isLoggedIn ? (
                                        <Fragment>
                                            <Link className="nav-item nav-link" to="/dashboard">DashBoard</Link>
                                            <Link className="nav-item nav-link" to="/profile">Profile</Link>
                                        </Fragment>
                                    ) : null
                                }
                            </div>
                            {
                                this.state.isLoggedIn ? (
                                    <Link to="/signin" className="btn btn-dark btn-outline-light ml-auto" onClick={this.logout}>LogOut</Link>
                                ) : (
                                        <Link to="/signin" className="btn btn-dark btn-outline-light ml-auto">SignIn</Link>
                                    )
                            }

                        </div>
                    </nav>
                    <div className="page overflow-auto">
                        <Route path="/" exact component={HomeComponent} />
                        <Route path="/signin" render={() => <SignInComponent logIn={this.logIn} />} />
                        <Route path="/profile" render={() => <ProfileComponent state={this.state} />} />
                        <Route path="/dashboard" render={() => <DashBoardComponent state={this.state} />} />
                    </div>

                </div>
            </Router>
        );
    }
}

export default AppComponent;