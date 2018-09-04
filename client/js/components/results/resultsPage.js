import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'; 
import RestaurantResult from './restaurantResult'; 

export class ResultsPage extends React.Component {
  render() {
    return (
      <div id="results-page">
        {
          Object.keys(this.props.restaurantsById).map((restaurantId, i) => {
            return <RestaurantResult key={i} restaurant={this.props.restaurantsById[restaurantId]} />
          })
        }
        <Link to="/start">Edit Lunch Group</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    restaurantsById: state.entities.restaurants.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(ResultsPage);