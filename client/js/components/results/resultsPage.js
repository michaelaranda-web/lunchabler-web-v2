import React from 'react';
import { connect } from 'react-redux';

export class ResultsPage extends React.Component {
  render() {
    return (
      <div id="results-page">
        {
          Object.keys(this.props.restaurantsById).map((restaurantId) => {
            return (
              <p>{this.props.restaurantsById[restaurantId].name}</p>
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