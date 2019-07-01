import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import News from './components/News';
import FullNews from './components/FullNews';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/news/sports" className="navbar-brand">
              <img src="https://images.casashops.com/Square620NoGrow/22617/alfabet-letra-n-negro-a-17-x-an--16-x-p-1%2C5-cm.jpg" width="50" height="50" alt=""/>
            </Link>
            <Link to="/news/sports" className="navbar-brand">Noti Notas</Link>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <Link to="/news/sports" className="nav-link">Noticias</Link>
            </div>
          </nav>
          <Redirect from="/" to="/news/sports" />
          <Route path="/news" component={News} />
          <Route path="/view/:id" component={FullNews} />
          <Route path="/login" component={Login} />
          <div className="container-fluid bg-dark text-white">
            <div className="row">
              <div className="col-9">
                <h5 className="text-uppercase">Acerca de Nosotros</h5>
                <p>Here you can use rows and columns to organize your footer content.</p>
              </div>
              <div className="col-3">
                <h5 className="text-uppercase">Links</h5>
                <ul className="list-unstyled">
                  <li>
                    <Link to="/login" className="text-white">Admin</Link>
                  </li>
                </ul>
              </div>
            </div>
            <p className="text-center">© 2018 Copyright: <a className="text-white" href="www.utm.mx">UTM</a></p>
          </div>
        </div>
      </Router>
    );
  }
}
export default App;