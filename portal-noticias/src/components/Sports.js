import React, { Component } from 'react';
import db from "../firebasedb";

import NewsSqrt from "./NewsSqrt";

class Sports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recentNews: [],
    };
  }

  changeNews(){
    var ref = db.collection('news');
    var queryRef = ref.where('section', '==', 'deportes').orderBy('likes','desc').limit(9);
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
        console.log("Se obtuvieron correctamente las noticias de deportes recientes");
      })
      .catch(err => {
        console.log("Error al obtener las noticias de deportes recientes: " + err);
      });
  }

  componentDidMount(){
    this.changeNews();
  }

  render() {
    return this.state.recentNews.map((object, i)=>
      <NewsSqrt obj={object} key={object.id}/>);
  }
}
export default Sports;