  
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout, user, isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
        <>
        <div className="row">
            <div className="col-sm-2"><img className="profileimg" src={user.picture} alt={user.name} /></div>
            <div className="col-sm-6">{user.name}<br/>{user.email}</div>
            <div className="col-sm-4">
            <button className="btn btn-outline-success my-2 my-sm-0 llbtn" onClick={() => logout()}>
                Log Out
            </button>
            </div>
        </div>
    
      
      </>
    )
  )
}

export default LogoutButton