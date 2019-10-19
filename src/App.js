import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Router, Route, Switch, Link, withRouter } from "react-router-dom";
import Register from './components/register.js';
import Login from './components/login.js';
import axios from 'axios';
import Auth from './components/auth.js';
import ProtectedRoute from './components/protectedRoute.js';
import Payment from './components/payment.js';
import SingleCharger from './components/singleCharger.js';
import history from './components/history';


class App extends React.Component  { 
  constructor(props) {
    super(props);

    this.state = {
      // location: [
      //   {latitude: 64.978134, longitude: 25.484502},
      //   {latitude: 65.034004, longitude: 25.502414},
      //   {latitude: 65.020885, longitude: 25.468680},
      //   {latitude: 65.005526, longitude: 25.543921},
      //   {latitude: 64.992263, longitude: 25.540666}
      // ],
      locations: [],
      loggedIn: false,
      userData: null  
    }
  }

  componentDidMount = () => {    
    axios.get('http://localhost:4000/chargers').then(result => {
      this.setState({ locations: result.data });
    })
  }

  showMarkers = () => {
    return this.state.locations.map((locations, index, e) => {
      return <Marker key={index} id={index} position={{
       lat: locations.latitude,
       lng: locations.longitude
      }}
       onClick={() => this.onMarkerClick(index)} />
    })
  } 

  onMarkerClick = (index) => {
    let chargerNo = index + 1;
    history.push('/chargers/' + chargerNo);
  }

  getChargerInfo = (chargerid) => {
    return this.state.locations.find(locationn => locationn.id === chargerid)
  }

  loginSucces = () => {
    this.setState({loggedIn: true});
  }

  loginFail = () => {
    this.setState({loggedIn: false});
  }

  loadProtectedData = () => {
    axios.get('http://ec2-3-83-29-53.compute-1.amazonaws.com/auth', Auth.getAxiosAuth()).then(results => {
      this.setState({ userData: results.data });
    })
  }

  render() {
    return (
      <Router history={history}>     
        <Map google={this.props.google} zoom={8} initialCenter={{ lat: 65.016765, lng: 25.489747}}>{this.showMarkers()}</Map>        
        <div className="sidebar">
          <Link className="lnk reg" to="/register">Register</Link>
          <Link className="lnk" to="/login">Login</Link>
          <Switch>
            <Route path={'/login'} exact render={(routeProps ) => <Login {...routeProps } loginSucces={this.loginSucces} loginFail={this.loginFail} />}  />
            <Route path={'/register'} exact render={(routeProps ) => <Register {...routeProps } />}  />
            <ProtectedRoute loggedIn={this.state.loggedIn} path={'/payment'} exact render={(routeProps ) =>
                <Payment loadProtectedData={this.loadProtectedData} userData={this.state.userData} />
              }>
            </ProtectedRoute>
            <Route path={'/chargers/:id'} exact render={(routeProps ) => <SingleCharger {...routeProps } getChargerInfo={this.getChargerInfo} />}  />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD8bQqszeaK4TjSHJ_zpQqSQLwPGGhj4oc'
})(App);
