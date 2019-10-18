import React from 'react';
import { Link } from "react-router-dom";

export default class SingleCharger extends React.Component {
  render(){
    const chargerData = this.props.getChargerInfo(parseInt(this.props.match.params.id));
    let chargerid = this.props.match.params.id - 1;
  return (
  <div>
      <h2>Name: { chargerData.name }</h2>
      <h4>Id: { chargerData.id }</h4>
      <p>Code:{ chargerData.code }</p>
      <Link to="/">Back</Link>
    </div>
  );
}
}
