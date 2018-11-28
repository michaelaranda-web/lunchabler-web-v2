import React from 'react';
import { connect } from 'react-redux';
import { addVisit } from '../../actions/visitsActions';
import { Modal, Button } from 'react-bootstrap';

export class SelectRestaurantModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pending: false  
    }
  }
  
  render() {
    var restaurant = this.props.restaurant;
    
    return (
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select <strong>{restaurant.name}</strong> for lunch today?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => this.props.onClose()}>Close</Button>
          <Button onClick={() => this.onConfirm()} bsStyle="primary">Confirm</Button>
        </Modal.Footer>
      </Modal> 
    )
  }
  
  onConfirm() {
    this.setState({pending: true});
    
    addVisit(this.props.restaurant._id)
      .then(() => {
        this.setState({pending: false}, () => {
          this.props.onClose();
        });
      });
  }
}
