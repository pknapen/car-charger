import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { Router, Route, Switch, Link } from "react-router-dom";
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
      locations: [],
      loggedIn: false,
      inputValue: "",
      userData: null  
    }
  }

  componentDidMount = () => {    
    axios.get('http://localhost:4000/chargers').then(result => {
      this.setState({ locations: result.data });
    })
  }

  showMarkers = () => {
    const searching = this.state.locations.filter(this.showItems(this.state.inputValue))
    return searching.map((locations, index) => {
      return <Marker key={index} id={index} position={{
       lat: locations.longitude,
       lng: locations.latitude
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

  showItems(inputValue){
    return function(x){
      return x.name.toLowerCase().includes(inputValue.toLowerCase()) ||
             x.location.toLowerCase().includes(inputValue.toLowerCase()) ||
             !inputValue;
    }
  }

  textInputChange = (event) => {
    this.setState({inputValue: event.target.value});
  }

  loginSucces = () => {
    this.setState({loggedIn: true});
  }

  loginFail = () => {
    this.setState({loggedIn: false});
  }

  loadProtectedData = () => {
    axios.get('http://localhost:4000/auth', Auth.getAxiosAuth()).then(results => {
      this.setState({ userData: results.data });
    })
  }

  render() {
    return (
      <Router history={history}>     
      <Map google={this.props.google} zoom={5} initialCenter={{ lat: 65.016765, lng: 25.489747}}>{this.showMarkers()}</Map>        
        <div className="sidebar">
          <Link className="lnk reg" to="/register">Register</Link>
          <Link className="lnk" to="/login">Login</Link>
          <input className="searchbar" type="text" value={this.state.inputValue} onChange={this.textInputChange} />
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
