import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addVisit } from '../../actions/visitsActions';

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
                <a onClick={() => this.restaurantSelected(restaurant._id)}>I choose you!</a>
              </div>
            )
          })
        }
        <Link to="/start">Edit Lunch Group</Link>
      </div>
    )
  }
  
  restaurantSelected(restaurantId) {
    addVisit(restaurantId)
      .then(() => {
        console.log("successfully added a visit");
      });
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