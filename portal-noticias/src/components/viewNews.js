import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import db from "../firebasedb";

class CRUD extends Component {
  constructor(props){
    super(props);
    this.state = {
      news: [],
    };
  }

  getNews() {
    db.collection('news').get()
      .then(snapshot => {
        this.setState({
          news: snapshot.docs.map(doc => {
            return{
              id: doc.id,
              date: doc.data().date,
              image: doc.data().image,
              section: doc.data().section,
              title: doc.data().title,
            }
          })
        });
        console.log("Se obtuvieron correctamente las noticias");
      })
      .catch(err => {
        console.log("Error al obtener las noticias: " + err);
      });
  }

  componentDidMount() {
    this.getNews();
  }

  deleteNews(id)	{
    db.collection("news").doc(id).delete()
        .then(res => {
            console.log("Se eliminó correctamente");
            this.getNews();
        })
        .catch(err => {
            console.log(err);
        });
  }

  showNews() {
    return this.state.news.map((oneNew, i) =>
      <div className="col-4" key={i}>
        <div className="card">
          <img src={oneNew.image} className="card-img-top" alt=""/>
          <div className="card-body">
            <h5 className="card-title">{oneNew.title}</h5>
            <Link to={"/login/edit/"+oneNew.id} className="btn btn-primary">Edit</Link>
            <button onClick={()=>this.deleteNews(oneNew.id)} className="btn btn-danger">Eliminar</button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          {this.showNews()}
        </div>
      </div>
    );
  }
}
export default CRUD;