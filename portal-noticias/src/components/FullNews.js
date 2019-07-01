import React, { Component } from 'react';
import db from '../firebasedb';

import Comment from './Comment';

class FullNews extends Component {
  constructor(props){
    super(props);
    this.onChangeComment = this.onChangeComment.bind(this);
    this.state = {
      author: "",
      comments: [],
      comment: "",
      content: "",
      date: "",
      image: "",
      likes: "",
      section: "",
      title: "",
      newComments: [],
    };
  }

  getNew() {
    db.collection("news").doc(this.props.match.params.id).get()
      .then( snapshot => {
        this.setState({
          author: snapshot.data().author,
          content: snapshot.data().content,
          date: snapshot.data().date,
          image: snapshot.data().image,
          likes: snapshot.data().likes,
          section: snapshot.data().section,
          title: snapshot.data().title,
        });
        console.log("Se obtuvo correctamente la noticia: " + snapshot.id);
      })
      .catch(err => {
        console.log("Error al obtener la noticias: " + err);
      });
    db.collection("news/" + this.props.match.params.id + "/comments").orderBy('date','desc').get()
      .then( snapshot => {
        this.setState({
          comments: snapshot.docs.map(doc => {
            return {
              id: doc.id,
              comment: doc.data().comment,
              date: doc.data().date,
            }
          })
        });
        console.log("Se obtuvo correctamente los comentarios de la noticia: ");
      })
      .catch(err => {
        console.log("Error al obtener los commentarios de la noticia: " + err);
      });
  }

  componentDidMount() {
    this.getNew();
  }

  onClickLike() {
    var like = this.state.likes;
    like++;
    this.setState({
      likes: like,
    });
    db.collection("news").doc(this.props.match.params.id).update({
      likes: like,
    })
      .then(res => {
        console.log("Se actualizó correctamente el like de la noticia: " + this.props.match.params.id);
      })
      .catch(err => {
        console.log("Error al actualizar el like de la noticia: " + err)
      });
  }

  onClickComment() {
    var newComments = this.state.newComments;
    newComments.push({
      comment: this.state.comment,
    });
    this.setState({
      newComents: this.newComents,
    });
    let FieldValue = require('firebase').firestore.FieldValue;
    db.collection("news/").doc(this.props.match.params.id.toString()).collection("comments").add({
      comment: this.state.comment,
      date: FieldValue.serverTimestamp(),
    })
      .then(res => {
        console.log("Se agregó correctamente el comentacio" + res);
      })
      .catch(err => {
        console.log("Error al agregar el comentario: " + err)
      });
  }

  onChangeComment(e) {
    this.setState({
      comment: e.target.value
    });
  }

  CommentsList() {
    return this.state.comments.map((object, i)=>
      <Comment obj={object} key={object.id}/>);
  }

  newsCommentsList(){
    return this.state.newComments.map((object, i)=> 
      <li className="list-group-item" key={i}>
        <p className="text-justify">{object.comment} - Hace un momento</p>
      </li>
    );
  }

  render() {
    return(
      <div className="container-fluid">
        <div className="card">
          <img src={this.state.image} className="card-img-top" alt="" />
          <div className="card-body">
            <h5 className="card-title">{this.state.title}</h5>
            <p className="card-text text-justify">{this.state.content}</p>
            <div className="row">
              <div className="col-11"><p className="text-right">{this.state.likes}</p></div>
              <div className="col-1"><button onClick={() => this.onClickLike()}><img src="data:image/png;base64,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" width="15" height="15" alt=""/></button></div>
            </div>
          </div>
        </div>
        <ul className="list-group">
          {this.CommentsList()}
          {this.newsCommentsList()}
        </ul>
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Comentar" onChange={this.onChangeComment}/>
          <div className="input-group-append" id="button-addon4">
            <button onClick={() => this.onClickComment()} className="btn btn-outline-secondary" type="button">Comentar</button>
          </div>
        </div>
      </div>
    );
  }
}
export default FullNews;