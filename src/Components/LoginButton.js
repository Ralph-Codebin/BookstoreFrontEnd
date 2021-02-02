import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button className="btn btn-outline-success my-2 my-sm-0" onClick={() => loginWithRedirect()}>
        Log In
      </button>
    )
  )
}

export default LoginButton