import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import LunchGroupSelector from './lunchGroupSelector';
import { fetchRestaurants } from '../../actions/restaurantsActions';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page" className="page-content">
        <h1>Lunch Time</h1>
        <div id="start-page-content">
          <div id="lunch-group-section">
            <h3>LUNCH GROUP</h3>
            <div className="section">
              <p className="description">Specify today's lunch group, so that user preferences can be taken into consideration.</p>
              <LunchGroupSelector />
            </div>
          </div>
          
          <div>
            <div className="button-row">
              {this.renderGetSuggestionsButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  renderGetSuggestionsButton() {
    return (
      <Route render={({history}) => (
        <a
          className="submit-button"
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