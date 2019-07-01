import React, { Component } from 'react';

class Comment extends Component {
  render() {
    var date = this.props.obj.date.toDate();
    var formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes();
    return (
      <li className="list-group-item">
        <p className="text-justify">{this.props.obj.comment} - {formattedDate}</p>
      </li>
    );
  }
}
export default Comment;