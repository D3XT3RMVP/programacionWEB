import React, { Component } from 'react';
import db from '../firebasedb';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onChangeAuthor = this.onChangeAuthor.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        author: '',
        content: '',
        date: '',
        image: '',
        section: '',
        title: '',
    }
  }

  componentDidMount() {
    db.collection("news").doc(this.props.match.params.id).get()
    .then( doc => {
      var newDate = doc.data().date.toDate();
      var formattedDate = newDate.getFullYear() + "-" 
      if(newDate.getMonth() < 9){
        formattedDate += "0" + (newDate.getMonth() + 1) + "-";
      }
      else{
        formattedDate += (newDate.getMonth() + 1) + "-";
      }
      if(newDate.getDate() < 10){
        formattedDate += "0" + newDate.getDate() + "T";
      }
      else{
        formattedDate += newDate.getDate() + "T";
      }
      if(newDate.getHours() < 10){
        formattedDate += "0" + newDate.getHours() + ":";
      }
      else{
        formattedDate += newDate.getHours() + ":";
      }
      if(newDate.getMinutes() < 10){
        formattedDate += "0" + newDate.getMinutes();
      }
      else{
        formattedDate += newDate.getMinutes();
      }

      this.setState({
        author: doc.data().author,
        content: doc.data().content,
        date: formattedDate,
        image: doc.data().image,
        section: doc.data().section,
        title: doc.data().title,
      })
    }, err => {
        console.log(err);
    });
  }

  onChangeTitle(e) {
    this.setState({
        title: e.target.value
    });
  }
  onChangeImage(e) {
    this.setState({
        image: e.target.value
    });
  }
  onChangeContent(e) {
    this.setState({
        content: e.target.value
    });
  }
  onChangeAuthor(e) {
    this.setState({
        author: e.target.value
    });
  }
  onChangeDate(e) {
    this.setState({
      date: e.target.value
  });
  }
  onChangeSection(e) {
    this.setState({
        section: e.target.value
    });
  }

  onSubmit(e){
      e.preventDefault();
      db.collection("news").doc(this.props.match.params.id).update({
        author: this.state.author,
        content: this.state.content,
        date: new Date(this.state.date.toString() + ":00-05:00"),
        image: this.state.image,
        section: this.state.section,
        title: this.state.title,
      })
        .then(res => {this.props.history.push('/login')})
        .catch(err => console.log(err));
  }
 
  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Actualizar noticia</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Titulo:  </label>
            <input 
              type="text" 
              className="form-control" 
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
          </div>
        <div className="form-group">
          <img src={this.state.image} className="card-img-top" alt=""/>
          <label>Imagen:  </label>
          <input 
            type="text" 
            className="form-control" 
            value={this.state.image}
            onChange={this.onChangeImage}
            />
          </div>
          <div className="form-group">
            <label>Contenido:  </label>
            <textarea 
              type="text" 
              className="form-control" 
              value={this.state.content}
              onChange={this.onChangeContent}
              />
          </div>
          <div className="form-group">
            <label>Autor:  </label>
            <input 
              type="text" 
              className="form-control" 
              value={this.state.author}
              onChange={this.onChangeAuthor}
              />
          </div>
          <div className="form-group">
            <label>Fecha y hora:  </label>
            <input 
              type="datetime-local" 
              className="form-control"
              value={this.state.date} 
              onChange={this.onChangeDate}
              />
          </div>
          <div className="form-group">
            <label>Sección: </label>
            <input type="text" 
              className="form-control"
              value={this.state.section}
              onChange={this.onChangeSection}
              />
          </div>
          <div className="form-group">
            <input type="submit" 
              value="Actualizar noticia" 
              className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}