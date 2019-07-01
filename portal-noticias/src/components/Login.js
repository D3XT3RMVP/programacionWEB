import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import db from "../firebasedb";

import CRUD from './viewNews';
import Edit from './EditNews';
import Create from './CreateNews';
import CreateUser from './CreateUser';

class Login extends Component {
  constructor(props){
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.state = {
      user: '',
      password: '',
      id: '',
      logged: false,
    };
  }

  onChangeUser(e) {
    this.setState({
      user: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  login() {
    db.collection("users").doc(this.state.user.toString()).get()
      .then(snapshot =>{
        if(snapshot.exists && snapshot.data().password == this.state.password){
          this.setState({
            logged: true,
          });
          console.log("Ingresó correctamente: " + snapshot.id);
        }
        else{
          alert("Usuario o contraseña incorrectos");
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    if(this.state.logged) return (
      <Router>
        <div className="container-fluid">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">           
              <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Ver Noticias</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/login/create" className="nav-link">Agregar Noticia</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/login/createUser" className="nav-link">Agregar Usuario</Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        <Route path="/login" exact component={CRUD} />
        <Route path="/login/edit/:id" component={Edit}/>
        <Route path="/login/create" component={Create} />
        <Route path="/login/createUser" component={CreateUser} />
      </Router>
    );
    return (
      <div className="container mt-5 mb-5">
        <form>
          <div className="form-group">
            <label>Usuario</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Ingresa tu usuario" onChange={this.onChangeUser} />
            <small id="emailHelp" className="form-text text-muted">No compartas tu usuario con nadie.</small>
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Contraseña" onChange={this.onChangePassword} />
          </div>
          <button type="button" className="btn btn-primary" onClick={() => this.login()}>Ingresar</button>
        </form>
      </div>
    );
  }
}
export default Login;