import React, { Component } from 'react';
import db from '../firebasedb';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
        user: '',
        password: '',
    }
  }

  onChangeUser(e) {
    this.setState({
        user: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
        password: e.target.value
    });
  }

  onSubmit(e){
      e.preventDefault();
      db.collection("users").doc(this.state.user.toString()).set({
        password: this.state.password,
      })
        .then(res => {this.props.history.push('/login')})
        .catch(err => console.log(err));
  }
 
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Agregar usuario</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Usuario:  </label>
            <input 
              type="text" 
              className="form-control" 
              value={this.state.user}
              onChange={this.onChangeUser}
              />
          </div>
        <div className="form-group">
          <label>Contraseña:  </label>
          <input 
            type="password" 
            className="form-control" 
            value={this.state.password}
            onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <input type="submit" 
              value="Agregar usuario" 
              className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}