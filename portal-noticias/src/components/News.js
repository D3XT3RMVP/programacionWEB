import React, { Component } from 'react';
import { Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import db from "../firebasedb";

import Sports from "./Sports";
import Culture from "./Culture";
import Politic from "./Politic";
import NewsList from "./NewsList";

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentNews: [],
    };
  }

  changeNews(){
    var ref = db.collection('news');
    var queryRef = ref.orderBy('date','desc').limit(6);
      queryRef.get()
        .then(snapshot => {
          this.setState({
            recentNews: snapshot.docs.map(doc => {
              return{
                id: doc.id,
                author: doc.data().author,
                comments: doc.data().comments,
                content: doc.data().content,
                date: doc.data().date,
                image: doc.data().image,
                likes: doc.data().likes,
                section: doc.data().section,
                title: doc.data().title,
              }
            })
          });
          console.log("Se obtuvieron correctamente las noticias relevantes");
        })
        .catch(err => {
          console.log("Error al obtener las noticias relevantes: " + err);
        });
  }

  componentDidMount(){
    this.changeNews();
  }

  NewsList() {
    return this.state.recentNews.map((object, i)=>
      <NewsList obj={object} key={object.id}/>);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <form className="form-inline my-2 my-lg-0">
              <Link to={`${this.props.match.url}/sports`} className="btn btn-dark my-2 my-sm-0">DEPORTES</Link>
              <Link to={`${this.props.match.url}/culture`} className="btn btn-dark my-2 my-sm-0">CULTURA</Link>
              <Link to={`${this.props.match.url}/politic`} className="btn btn-dark my-2 my-sm-0">POLÍTICA</Link>
            </form>
          </div>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <div className="col-9">
              <div className="row">
                <Route path={`${this.props.match.url}/sports`} component={Sports} />
                <Route path={`${this.props.match.url}/culture`} component={Culture} />
                <Route path={`${this.props.match.url}/politic`} component={Politic} />
              </div>
            </div>
            <div className="col-3">
              <ul className="list-group">
                {this.NewsList()}
              </ul>
            </div>
          </div>
        </div>
        </div>
    );
  }
}
export default News;