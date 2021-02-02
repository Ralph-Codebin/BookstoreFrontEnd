import React, { Component } from 'react';
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';

var token;
var stateobject;

export default class App extends Component {
  constructor(props) {    
    super(props);
    this.state = {
      items: [], 
      isLoading: true,
      showswal: false,
      swaltitle: null,
      swaltext: null,
      showUnaurthmsg: false,
      jwttoken: null
    }
    this.handleClick = this.handleClick.bind(this);    
  }

  componentDidMount() {
    var _this = this;
    stateobject= this;
    this.getdatafromserver(_this);
  }

  handleClick(e, itm) { 
    e.preventDefault();
    if(this.props.props.isAuthenticated){

      // This token will be provided when login with Auth0 so for now it will be FUDGED!
        var URL = 'https://localhost:44367/api/SubscriptionData/NewSubscription';
        axios.post(URL, {prodid: itm, email: this.props.props.user.email, name: this.props.props.user.name, lastname: this.props.props.user.family_name}, {'Authorization': `bearer ${token}`})
        .then(function(res){
          stateobject.setState({showswal: true, swaltitle: 'Information', swaltext: 'Thank you for adding this item to your subscriptions'}); 
        })
        .catch(function(e) {
         console.log('error: '+ e);
        })
    }
    else{
      this.setState({showswal: true, swaltitle: 'Information', swaltext: 'You must be logged in to add items to your subscription.'});
    }
  }
  
   getdatafromserver(_this){
    let axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8',"Access-Control-Allow-Origin": "*",}};   
    var response;
    var URL = 'https://localhost:44367/api/ProductData/ListAll';
    // This token will be provided when login with Auth0 so for now it will be FUDGED!
    axios.defaults.headers.common = {'Authorization': `bearer ${_this.state.jwttoken}`}
    axios.get(URL)
    .then(function(res){
      token=_this.state.jwttoken;
      response = res.data.data; 
      _this.setState({
        items: response,
        isLoading: false,
        showUnaurthmsg: false
      });
    })
    .catch(function(e) {
      if(e.response){
        if(e.response.status==401){
          //do login here
          // This token will be provided when login with Auth0 so for now it will be FUDGED!
          axios.post('https://localhost:44367/api/Login', {username: "BookAPIUser",password: "dsD344FFDH*75"}, axiosConfig)
            .then((res) => {    
                token=res.data.accessToken;
                _this.setState({ jwttoken: res.data.accessToken});
                _this.getdatafromserver(_this);
            })
            .catch((err) => {
              console.log("invalidtoken");
              _this.setState({ jwttoken: "invalidtoken"});
            })
          _this.setState({showUnaurthmsg: true, isLoading: false});
        }
      }else{
          _this.setState({isLoading: false});
      }
        
    })
  }

  render() {

    if (this.state.isLoading) {
      return(
        <div className="alert alert-secondary unauth" role="alert">
          Loading ........
        </div>  
      )}

    if(this.state.showUnaurthmsg) {
      return(        
      <div className="alert alert-danger unauth" role="alert">
        You are not authorized to view this page, please login before you continue.
      </div>  
      )
    }
    
    if (!this.state.items || this.state.items.length === 0) { 
      return(
        <div className="alert alert-secondary unauth" role="alert">
          No books found, sorry
        </div> 
      )
    }

    return (
      <>

    <SweetAlert
        show={this.state.showswal}
        title={this.state.swaltitle}
        text={this.state.swaltext}
        onConfirm={() => this.setState({ showswal: false })}
      />

        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Some Title</h1>
          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        
          <div className="card-deck mb-3 text-center">
          <div className="row">
              {this.state.items.map((itm) => {
                  return (
                  <div className="col-sm-12 col-md-4">
                      <div key={itm.id} className="thumbnail">
                      <img src={itm.imagePath} alt={itm.title} className="img-responsive"/>
                      <div className="caption">
                          <h3>{itm.title}</h3>
                          <p className="description">{itm.description}</p>
                          <div className="clearfix">
                              <div className="price pull-right">R {itm.price}</div>
                              <a href="#" className="btn btn-block btn-success pull-right" role="button" onClick={(e) => this.handleClick(e, itm.id)}>Add to Subscription</a>
                          </div>
                      </div>
                      </div>
                  </div>
                  );
              })}

          </div>
        </div>
    
      </>
    );
  }
}