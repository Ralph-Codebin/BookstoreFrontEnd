import React, { Component } from 'react';
import intro from "../images/image1";
import onion from "../images/onion";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  componentDidMount() {
    var _this = this;
  }

  render() {

    return (
      <>

        <div className="intro-container">
            <h1>Technical Assessment</h1>
            <h3>.NET Core Web API with a Reactjs UI</h3>
            <p>This is a combination of as many technologies as I could fit in to this little app. The idea was to showcase my understanding of most of the comonly used frameworks and other components.</p>
            <h4>Disclaimer</h4>
            <p><i>This app is not complete by a long-shot, this is as basic as it gets. This is a MVP if you will, it demonstrates the tech stack and that was the purpose.  Do not use this in a production environment.
            </i></p>
            <h4>Problem statement</h4>
            <p>The business has requested the development of a new system which allows users to register online and purchase a subscription to books listed in the online catalogue. 
            Only a registered user can purchase a subscription to any book available in the product catalogue.
            A user can unsubscribe to any book a user currently has in their subscription.
            The system should also allow 3rd party resellers to access the system or parts of the system through an Api over Http which provides the same functionality.
            </p>
            <h4>Architecture</h4>
            <p>This is a very basic demonstation of a single page Reactjs web app with a powerfull .NET Core API on top of a SQL Database</p>
            <img className="imghome" src={intro}/>
            <h3>Frontend Stack</h3>
            <p>The frontend consists mainly of a single page Reactjs application, it utilizes <a href="https://www.npmjs.com/package/axios">Axios</a> to do the api calls to the .NET core backend.</p>
            <ul>
                <li>React</li>
                <li>React Dom</li>
                <li>React Scripts</li>
                <li>Auth0</li>
                <li>Axios</li>
                <li>Bootstrap</li>
                <li>SweetAlert2</li>               
            </ul>
            <h3>Backend Stack</h3>
            <p>The backend is a .NET Core 3.1 Web API with SQL as the database. I also decided to make use of dependency injection and to showcase some of the STANDARDS we should all try to use more often in our development.</p>
            <ul>
                <li>.NET Core 3.1</li>
                <li>C#</li>
                <li>Swagger</li>
                <li>Automapper</li>
                <li>Mediatr</li>
                <li>Entity Framework</li>
                <li>Serilog</li>    
                <li>MS SQL</li>      
                <li>Fluent Validation</li>         
            </ul>
            <h3>Onion Architecture</h3>
            <p>Onion Architecture is comprised of multiple concentric layers interfacing each other towards the core that represents the domain. The architecture does not depend on the data layer as in classic multi-tier architectures, but on the actual domain models.</p>
            <img className="imghome" src={onion}/>
            <ul>
                <li>The application was architected around the clean/onion architecture style.</li>
                <li>The Domain and Application form the Application Core.</li>
                <li>All other dependencies face inward toward the Core.</li>
                <li>The Core should never depend on concrete implementations of UI or Infrastructure, but should rather depend on interfaces.</li>      
            </ul>
            <h3>Special Case Pattern</h3>
            <ul>
                <li>A modified version of the Special Case pattern mingled in with the Map-Reduce Pattern is used as a ResultMarshal.</li>
                <li>This allows the return of different result types (ie entity created vs validation errors), while encapsulating these types as a single result.</li>
                <li>The caller does not need to know any internal details about the implementing method and can map decisions based on the Special Case class types without ever having to check for nulls.</li>  
            </ul>
            <h3>Unit of Work pattern</h3>
            <ul>
                <li>The Unit of Work pattern was implemented using the Microsoft.EntityFrameworkCore.UnitOfWork library.</li>
                <li>This library allows dynamic resolution of repositories through the IUnitOfWork.GetRepository interface.</li>                
            </ul>
            <h3>Dependency Injection</h3>
            <ul>
                <li>The standard, built-in Microsoft Dependency Injection framework was used.</li>               
            </ul>
            <h3>Bearer Token Authentication</h3>
            <ul>
                <li>Endpoints are protected through Bearer Token authentication.</li>        
                <li>So long as the JwtTokenConfiguration.SecurityKey in appsettings.json setting is replicated to all load balancers, the token will be correctly authenticated on all nodes.</li>  
                <li>To acquire a token, an application needs to POST a form to the login controller that contains an authenticated Username and Password.</li>         
            </ul>
            <h3>Automapper</h3>
            <ul>
                <li>For simple property mapping Automapper was used.</li>        
            </ul>
            <h3>OpenAPI/Swagger</h3>
            <ul>
                <li>The REST API is documented using the Swashbuckle toolkit that supports the OpenAPI spec.</li>        
            </ul>
            <h3>Serilog</h3>
            <ul>
                <li>The Serilog Debug sink was used to write information out to a Log table in the database.</li>        
            </ul>
            <h3>Entity Framework</h3>
            <ul>
                <li>Entity Framework Core was chosen as the ORM for this implementation</li>        
            </ul>
            <h3>Immutable Value Objects</h3>
            <ul>
                <li>reat care was taken to ensure that Value Objects are immutable once constructed. The best way to achieve this was through hydrating internal properties by means of a Json serialiser.</li>        
                <li>Mapping ValueObject Properties on Entities is done through the EntityFrameworkExtensions class' ValueObject extension method.</li>
            </ul>
            <h3>MediatR</h3>
            <ul>
                <li>Mediation between Presentation and Application is handled with the MediatR library.</li>        
                <li>The Handlers exist to encapsulate use-cases.</li>
            </ul>
            <h3>MediatR</h3>
            <ul>
                <li>Mediation between Presentation and Application is handled with the MediatR library.</li>        
                <li>The Handlers exist to encapsulate use-cases.</li>
            </ul>
            <h3>FluentValidation</h3>
            <ul>
                <li>Domain Validation is handled using the Fluent Validation framework.</li>        
                <li>Minimal API Model validation is used as this would duplicate domain knowledge. Most inputs are therefore assumed to be valid until a Domain Validator says otherwise.</li>
            </ul>
            <h3>Currently Out of Scope</h3>
            <ul>
                <li>Unit Tests are at incomplete and in a real-world solution it is a must.</li>                        
            </ul>
            <h3>Setup Requirements</h3>
            <p>To get this solution to run, a few steps need to be taken</p>
            <ul>
                <li>Installing Nodejs will make thins go smoother than not having it.</li>
                <li>In the project there is a folder calles resources: <i>BookstoreAPI > Repository.EntityFramework > Resources</i>. In here are the scripts that need to be run to create the sql database. 
                  <ul>
                    <li>1. Database.sql</li>
                    <li>2. Tables.sql</li>
                    <li>3. SeedData.sql</li>
                  </ul>
                </li>                        
                <li>You have to create an account on <a href="https://auth0.com/">Auth0.com</a>, its free and once you use it you will wonder how you ever managed withou it.</li>
                <li>In the root folder of the React project there is a .env file that you have to update with the tokens you will get from Auth0</li>
            </ul>
            

        </div>
  
      </>
    );
  }
}