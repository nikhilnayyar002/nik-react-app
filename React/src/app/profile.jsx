
import React from 'react';
import { getData, isUserPayloadValid } from "../controllers/main";
import config from '../data/app.config';

/* the main page for the home route of this app */
class ProfileComponent extends React.Component {

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
    else this.state=props.state;
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
        <table className="table table-striped table-dark">
          <tbody>
            <tr>
              <td>&rarr; </td>
              <th scope="row">Full Name</th>
              <td>{this.state.user.fullName}</td>
            </tr>
            <tr>
              <td>&rarr; </td>
              <th scope="row">Email</th>
              <td>{this.state.user.email}</td>
            </tr>
          </tbody>
        </table>
      );
  }

}

export default ProfileComponent;
