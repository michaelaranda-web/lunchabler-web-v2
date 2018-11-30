import React from 'react';
import socketIOClient from "socket.io-client";

export class LunchRoomExample extends React.Component {
  constructor(props) {
    super(props);
    
    this.socket = socketIOClient('http://lunchabler-web-v2-michaelaranda-web.c9users.io:8081');
    
    this.state = {
      votes: [],
      response: false
    };
  }
  
  componentDidMount() {
    this.socket.on("vote-message", data => {
      console.log("Received vote message event from socket connection.");
      var newVotes = this.state.votes.concat(data);
      this.setState({ votes: newVotes })
    });
    
    this.socket.emit("identify", "Michael")
  }
  
  render() {
    return (
      <div id="lunch-room-test" className="page-content">
        <div id="votes">
          {
            this.state.votes.map((vote) => {
              return (
                <div className="vote-row">
                  <div>{vote.name}</div>
                  <div>{vote.vote}</div>
                </div>
              )
            })
          }
        </div>
        <button onClick={() => this.onVote("yes")}>Yes</button>
        <button onClick={() => this.onVote("no")}>No</button>
      </div>
    )
  }
  
  onVote(vote) {
    console.log("submitting vote");
    this.socket.emit("vote", vote);
  }
}
