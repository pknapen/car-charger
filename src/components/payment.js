import React from 'react'

export default function Payment(props) {
  return ( <div>
  	<h2>Payment of charging</h2>
  	<p>Hey, you're on the protected page /payment which you can only access by logging in!</p>
  	<p><button onClick={ props.loadProtectedData }>Start charging</button></p>
	<p>{ props.userData }</p>
  </div>
  )
}