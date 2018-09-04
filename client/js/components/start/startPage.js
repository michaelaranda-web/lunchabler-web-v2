import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LunchGroupSelector from './lunchGroupSelector';
import { fetchRestaurants } from '../../actions/restaurantsActions';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page">
        <h1>LUNCH TIME</h1>
        <h3>1. LUNCH GROUP</h3>
        <p>Specify today's lunch group, so that user preferences can be taken into consideration.</p>
        <LunchGroupSelector />
        <div className="button-row">
          {this.renderGetSuggestionsButton()}
        </div>
      </div>
    )
  }
  
  renderGetSuggestionsButton() {
    return (
      <Route render={({history}) => (
        <a
          id="submit-button"
          href="#"
          onClick={() => { this.onGetSuggestionsClick(history) }}
        >
          Get Suggestions
        </a>
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