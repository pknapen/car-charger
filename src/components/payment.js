import React from 'react'

export default function Payment(props) {
  return ( <div>
  	<h1>Payment of charging</h1>
  	<p>Hey, you're on the protected page /payments which you can only access by logging in!</p>
  	<p><button onClick={ props.loadProtectedData }>Click to load protected content from API</button></p>
	<p>Protected content result: { props.userData }</p>
  </div>
  )
}