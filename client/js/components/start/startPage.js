import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LunchGroupSelector from './lunchGroupSelector';
import { fetchRestaurants } from '../../actions/restaurantsActions';
import { createNewVote } from '../../actions/votesActions';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page" className="page-content">
        <h1>Lunch Time</h1>
        <div id="start-page-content">
          <div id="lunch-group-section">
            <h3>1. LUNCH GROUP</h3>
            <div className="section">
              <p className="description">Specify today's lunch group, so that user preferences can be taken into consideration.</p>
              <LunchGroupSelector />
            </div>
          </div>
          
          <div>
            <div className="button-row">
              {this.renderStartVotingButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  renderStartVotingButton() {
    return (
      <Route render={({history}) => (
        <a
          className="submit-button"
          href="#"
          onClick={() => { this.onStartVotingClick(history) }}
        >
          Start Voting
        </a>
      )} />  
    )
  }
  
  onStartVotingClick(history) {
    if (this.props.lunchGroup.length > 0) {
      createNewVote()
        .then((response) => {
          this.props.fetchRestaurants();
          history.push(`/voting_room/${response.data.session_id}`)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
}

const mapStateToProps = state => {
  return {
    lunchGroup: state.ui.lunchGroup
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurants: () => { dispatch(fetchRestaurants()) }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPage);