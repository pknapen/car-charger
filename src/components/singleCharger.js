import React from 'react';
import { Link } from "react-router-dom";

export default class SingleCharger extends React.Component {
  render(){
    const chargerData = this.props.getChargerInfo(parseInt(this.props.match.params.id));
  return (
  <div>
      <h2>Name: { chargerData.name }</h2>
      <p>Code:{ chargerData.code }</p>
      <p>Type:{ chargerData.type }</p>
      <Link to="/">Back</Link>
    </div>
  );
}
}
