import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LunchGroup from './lunchGroup';
import { fetchRestaurants } from '../../actions/restaurantsActions';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page">
        <LunchGroup />
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
      this.props.fetchRestaurants(this.props.lunchGroup);
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
    fetchRestaurants: lunchGroup => { dispatch(fetchRestaurants(lunchGroup)) }
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StartPage);