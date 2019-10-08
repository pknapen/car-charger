import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

class App extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      location: [
        {latitude: 64.978134, longitude: 25.484502},
        {latitude: 65.034004, longitude: 25.502414},
        {latitude: 65.020885, longitude: 25.468680},
        {latitude: 65.005526, longitude: 25.543921},
        {latitude: 64.992263, longitude: 25.540666}
      ]
    }
  }

  showMarkers = () => {
    return this.state.location.map((location, index) => {
      return <Marker key={index} id={index} position={{
       lat: location.latitude,
       lng: location.longitude
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render() {
    return (
        <Map
          google={this.props.google}
          zoom={8}
          initialCenter={{ lat: 65.016765, lng: 25.489747}}
        >
          {this.showMarkers()}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD8bQqszeaK4TjSHJ_zpQqSQLwPGGhj4oc'
})(App);
