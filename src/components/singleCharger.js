import React from 'react';
import { Link } from "react-router-dom";

export default class SingleCharger extends React.Component {
  render(){
    const chargerData = this.props.getChargerInfo(parseInt(this.props.match.params.id));
  return (
  <div>
      <h2>Name: { chargerData.name }</h2>
      <p>Location: { chargerData.location }</p>
      <p>Code: { chargerData.code }</p>
      <p>Type: { chargerData.type }</p>
      <p>Price: { chargerData.price } e/min</p>
      <p>Status: { chargerData.status }</p>
      <Link to="/">Back</Link>
    </div>
  );
}
}
