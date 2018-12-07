import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getVotes } from '../../actions/votesActions';

export class VotingRoomsPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      votingRooms: []
    }
  }
  
  componentDidMount() {
    getVotes()
      .then((votingRooms) => {
        this.setState({
          votingRooms: votingRooms
        })
      })
  }
  
  renderVotingRoomList() {
    if (this.state.votingRooms.length > 0) {
      return this.state.votingRooms.map((votingRoom, i) => {
        var votingRoomDate = moment(votingRoom.date).format('MMMM Do YYYY, h:mm a');
        
        return (
          <Link to={`/voting_room/${votingRoom.session_id}`}>
            <div className="voting-room-list-item">
              <h3>{`Voting Room ${i+1}`}</h3>
              <p>{votingRoomDate}</p>
            </div>
          </Link>
        )
      });  
    } else {
      return <div>Fetching voting rooms...</div>
    }
  }
  
  render() {
    return (
      <div id="voting-rooms-page" className="page-content">
        <h1>Voting Rooms</h1>
        <div id="voting-rooms-page-content" className="section">
          {this.renderVotingRoomList()}
        </div>
      </div>
    )
  }
}
