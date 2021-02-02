import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import withListLoading from './Components/withListLoading';
import Products from "./Components/Products";
import Subscriptions from "./Components/subscriptions";
import Home from "./Components/home";
import LoginButton from './Components/LoginButton';
import LogoutButton from './Components/LogoutButton';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  const ListLoading = withListLoading(Products);
  const { logout, user, isAuthenticated } = useAuth0();
  const [appState, setAppState] = useState({
    loading: false,
    repos: null,
    page: null
  });
  useEffect(() => {
    setAppState({ loading: true, page:'home' });
  }, [setAppState]);
  
  function handleClick(e, itm) {
    e.preventDefault();
    setAppState({page: itm});
  }

  return (
    <div className='App'>
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">BookstoreName</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item active">
        <a className="nav-link" href="#" onClick={(e) => handleClick(e, 'home')}>Home <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#" onClick={(e) => handleClick(e, 'products')}>Products</a>
      </li>

      {(()=> {
          if (isAuthenticated) {
            return <li className="nav-item"><a className="nav-link" href="#" onClick={(e) => handleClick(e, 'mysubscriptions')}>My Subscriptions</a></li>
          } 
        })()}
    </ul>
     <form className="form-inline my-2 my-lg-0">
      <LoginButton/><LogoutButton/>
    </form> 
  </div>
</nav>
<div className="container">
{(()=> {
          if (appState.page=="products") {
            return <ListLoading isLoading={appState.loading} props={{"isAuthenticated":isAuthenticated, "user": user }} />
          } 
          if (appState.page=="home") {
            return <Home props={{"isAuthenticated":isAuthenticated}} />
          }
          if (appState.page=="mysubscriptions") {
            return <Subscriptions props={{"isAuthenticated":isAuthenticated, "user": user}} />
          }
        })()}


      <footer className="pt-4 my-md-5 pt-md-5 border-top">
      <div className="row">
        <div className="col-12 col-md">
          <img className="mb-2" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24"/>
          <small className="d-block mb-3 text-muted">&copy; 2017-2018</small>
        </div>
        <div className="col-6 col-md">
          <h5>Features</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="#">Cool stuff</a></li>
            <li><a className="text-muted" href="#">Random feature</a></li>
            <li><a className="text-muted" href="#">Team feature</a></li>
            <li><a className="text-muted" href="#">Stuff for developers</a></li>
            <li><a className="text-muted" href="#">Another one</a></li>
            <li><a className="text-muted" href="#">Last time</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>Resources</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="#">Resource</a></li>
            <li><a className="text-muted" href="#">Resource name</a></li>
            <li><a className="text-muted" href="#">Another resource</a></li>
            <li><a className="text-muted" href="#">Final resource</a></li>
          </ul>
        </div>
        <div className="col-6 col-md">
          <h5>About</h5>
          <ul className="list-unstyled text-small">
            <li><a className="text-muted" href="#">Team</a></li>
            <li><a className="text-muted" href="#">Locations</a></li>
            <li><a className="text-muted" href="#">Privacy</a></li>
            <li><a className="text-muted" href="#">Terms</a></li>
          </ul>
        </div>
      </div>
      </footer>
  </div>
</div>
  );
}
export default App;
