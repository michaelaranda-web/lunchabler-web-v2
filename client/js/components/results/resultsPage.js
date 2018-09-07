import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import RestaurantResult from './restaurantResult'; 
import LoadingGif from '../../../img/loading-ball.gif';

export class ResultsPage extends React.Component {
  render() {
    if (this.props.fetchingRestaurants) {
      return (
        <div id="results-loading-screen">
          <img src={LoadingGif} />
          <p>Calculating restaurant rankings...</p>
        </div>
      )
    }
    
    return (
      <div id="results-page">
        {
          this.props.sortedRestaurants.map((restaurant, i) => {
            return <RestaurantResult key={i} rank={i+1} restaurant={restaurant} />
          })
        }
        <Link to="/start">Edit Lunch Group</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fetchingRestaurants: state.entities.restaurants.isFetching,
    sortedRestaurants: state.entities.restaurants.sorted
  }
}

export default connect(
  mapStateToProps,
  null
)(ResultsPage);