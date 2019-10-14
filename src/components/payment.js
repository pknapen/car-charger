import React from 'react'

export default function Payment(props) {
  return ( <div>
  	<h1>Payment of charging</h1>
  	<div>
	  <button onClick={ props.loadProtectedData }>Click to load protected content from API</button>        
	</div>
	<div style={{ color: "red" }}>
	  Protected content result: <strong>{ props.userData }</strong>
	</div>
  </div>
  )
}