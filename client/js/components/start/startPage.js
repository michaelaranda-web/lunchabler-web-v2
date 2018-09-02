import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LunchGroupSelector from './lunchGroupSelector';
import { fetchRestaurants } from '../../actions/restaurantsActions';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page">
        <h1>Lunch Time!</h1>
        <p>Specify today's lunch group to see the optimal restaurant choices.</p>
        <LunchGroupSelector />
        {this.renderGetSuggestionsButton()}
      </div>
    )
  }
  
  renderGetSuggestionsButton() {
    return (
      <Route render={({history}) => (
        <button
          type='button'
          onClick={() => { this.onGetSuggestionsClick(history) }}
        >
          Get Suggestions
        </button>
      )} />  
    )
  }
  
  onGetSuggestionsClick(history) {
    if (this.props.lunchGroup.length > 0) {
      this.props.fetchRestaurants();
      //TODO: Use Promises to chain redirecting to the fetchRestaurants call
      history.push('/results');
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