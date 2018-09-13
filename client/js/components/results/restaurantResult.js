import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { addVisit } from '../../actions/visitsActions';
import { Modal, Button } from 'react-bootstrap';

export class RestaurantResult extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showSelectRestaurantModal: false
    }
  }
  
  renderDetails(restaurant) {
    var distance = restaurant.distance ? <p>{`${restaurant.distance} miles`}</p> : null;
    
    return (
      <div className="restaurant-details-container">
        <h4>{restaurant.name}</h4>
        {distance}
      </div>
    )
  }
  
  renderImage(restaurant) {
    if (!!restaurant.imageUrl) {
      return <img src={restaurant.imageUrl} />
    } else {
      return <i className="fas fa-camera" />
    }
  }
  
  renderRank() {
    var rankClass;
    
    switch (this.props.rank) {
      case 1:
        rankClass = "gold"
        break;
      case 2:
        rankClass = "silver"
        break;
      case 3:
        rankClass = "bronze"
        break;
      default:
        rankClass = "";
    }
    
    return (
      <div className={`restaurant-rank ${rankClass}`}>{this.props.rank}</div>  
    )
  }
  
  renderSelectRestaurantModal(restaurant) {
    return (
      <Modal show={this.state.showSelectRestaurantModal} onHide={() => this.closeSelectRestaurantModal()}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select {restaurant.name} for lunch today?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.closeSelectRestaurantModal()}>Close</Button>
          <Button onClick={() => this.onSelectRestaurantConfirm()} bsStyle="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>  
    )
  }
  
  render() {
    var restaurant = this.props.restaurant;
    
    return (
      <div className="restaurant-result">
        <Route render={({history}) => (
          <div className="restaurant-info" onClick={() => this.showRestaurantInfo(history)}>
            {this.renderRank()}
            <div className="image-container">
              {this.renderImage(restaurant)}
            </div>
            {this.renderDetails(restaurant)}
          </div>
        )} />
        <div className="actions-container">
          <div className="select-restaurant" onClick={() => this.showSelectRestaurantModal()}>
            <i className="fas fa-utensils" />
          </div>
        </div>
        {this.renderSelectRestaurantModal(restaurant)}
      </div>
    )
  }
  
  showRestaurantInfo(history) {
    history.push(`/restaurants/${this.props.restaurant._id}`);
  }
  
  showSelectRestaurantModal() {
    this.setState({
      showSelectRestaurantModal: true
    })
  }
  
  closeSelectRestaurantModal() {
    this.setState({
      showSelectRestaurantModal: false
    })
  }
  
  onSelectRestaurantConfirm() {
    addVisit(this.props.restaurant._id)
      .then(() => {
        this.closeSelectRestaurantModal()
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
)(RestaurantResult);