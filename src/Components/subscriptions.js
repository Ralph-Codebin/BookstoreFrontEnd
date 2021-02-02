import React, { Component } from 'react';
import axios from 'axios'
import SweetAlert from 'sweetalert2-react';

var _this;
var token;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      isLoading: true,
      showswal: false,
      subitems: [],
      swaltitle: null,
      swaltext: null
    }
  }
  
  handleClick(e, itm) { 
    e.preventDefault();
    if(this.props.props.isAuthenticated){
      alert('The link was clicked.' + itm);
    }
    else{
      this.setState({showswal: true, swaltitle: 'Information', swaltext: 'You must be logged in to add items to your subscription.'});
    }
  }
  
  componentDidMount() {
    _this = this;
    this.getdatafromserver(_this);
    console.log(_this.state.jwttoken);
  }

  getdatafromserver(_this){
    let axiosConfig = {headers: {'Content-Type': 'application/json;charset=UTF-8',"Access-Control-Allow-Origin": "*",}};   
    var response;
    var URL = 'https://localhost:44367/api/SubscriptionData/ListAll?useremail='+ _this.props.props.user.email;
    // This token will be provided when login with Auth0 so for now it will be FUDGED!
    axios.defaults.headers.common = {'Authorization': `bearer ${_this.state.jwttoken}`}
    console.log("starting")
    axios.get(URL)
    .then(function(res){
      token=_this.state.jwttoken;
      response = res.data.data; 
      _this.setState({
        subitems: response,
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

  removefromsubs(e, itm){
    // This token will be provided when login with Auth0 so for now it will be FUDGED!    
    var URL = 'https://localhost:44367/api/SubscriptionData/UpdateSubscription';
    axios.post(URL, {id: itm, state: 0}, {'Authorization': `bearer ${token}`})
    .then(function(res){      
      _this.getdatafromserver(_this)
    })
    .catch(function(e) {
      console.log('error: '+ e);
    })
  }

  render() {

    if (this.state.isLoading) return <p>Loading....</p>

    if (!this.state.subitems || this.state.subitems.length === 0) return <p>No subscriptions found, sorry</p>;  

    return (
      <>

    <SweetAlert
        show={this.state.showswal}
        title={this.state.swaltitle}
        text={this.state.swaltext}
        onConfirm={() => this.setState({ showswal: false })}
      />

        <div className="container">
              
        <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
          <h1 className="display-4">Some Title</h1>
          <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

        {this.state.subitems.map((itm) => {
                  return (
                  <>
                  <tr key={itm.id}>
                    <td><img src={itm.imagePath} alt={itm.title} className="img-responsive imgtableicon"/></td>
                    <td className="tblTitle">{itm.title}</td>
                    <td>{itm.description}</td>
                    <td>R{itm.price}</td>
                    <td><button type="button" className="btn btn-danger" onClick={(e) => this.removefromsubs(e, itm.id)}>Remove</button></td>
                  </tr>
                  </>
                  );
              })}                  

                </tbody>
              </table>

        </div>
      </>
    );
  }
}