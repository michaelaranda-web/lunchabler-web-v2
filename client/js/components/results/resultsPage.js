import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

export class ResultsPage extends React.Component {
  render() {
    return (
      <div id="results-page">
        {
          Object.keys(this.props.restaurantsById).map((restaurantId) => {
            var restaurant = this.props.restaurantsById[restaurantId];
            return (
              <div>
                <p>{restaurant.name}</p>
                <Link to={`/restaurants/${restaurant._id}`}>More Info</Link>
              </div>
            )
          })
        }
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