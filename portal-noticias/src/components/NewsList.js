import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sqrt.css';

class NewsList extends Component {
  render() {
    var date = this.props.obj.date.toDate();
    var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    return (
      <li className="list-group-item">
        <Link to={"/view/"+this.props.obj.id}><p>{this.props.obj.title}</p></Link>
        <p>{formattedDate}</p>
      </li>
    );
  }
}
export default NewsList;