import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import RestaurantResult from './restaurantResult'; 

export class ResultsPage extends React.Component {
  render() {
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
    sortedRestaurants: state.entities.restaurants.sorted
  }
}

export default connect(
  mapStateToProps,
  null
)(ResultsPage);