import React from 'react';
import { connect } from 'react-redux';
import { addVisit, fetchRestaurantVisits } from '../../actions/visitsActions';
import { Modal, Button } from 'react-bootstrap';

export class SelectRestaurantModal extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      pending: false,
      showAlreadySubmittedError: false
    }
  }
  
  renderAlreadySubmittedError() {
    if (this.state.showAlreadySubmittedError) {
      return <div className="error">A restaurant was already selected for today.</div>
    }
  }
  
  render() {
    var restaurant = this.props.restaurant;
    
    return (
      <Modal className="select-restaurant-modal" show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Selection</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select <strong>{restaurant.name}</strong> for lunch today?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            disabled={this.state.pending}
            onClick={() => this.props.onClose()}>
            Close
          </Button>
          <Button 
            onClick={() => this.onConfirm()} bsStyle="primary">
            {this.state.pending ? 'Submitting...' : 'Confirm'}
          </Button>
          {this.renderAlreadySubmittedError()}
        </Modal.Footer>
      </Modal> 
    )
  }
  
  onConfirm() {
    this.setState({
      pending: true, 
      showAlreadySubmittedError: false
    });
    
    addVisit(this.props.restaurant._id)
      .then((response) => {
        if (response.data.code === "ALREADY_SUBMITTED") {
          this.setState({
            pending: false,
            showAlreadySubmittedError: true
          }, () => Promise.resolve());
        } else {
          this.props.fetchRestaurantVisits()
            .then(() => {
              this.setState({pending: false}, () => {
                this.props.onClose();
              });  
            });
        }
      })
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchRestaurantVisits: () => { return dispatch(fetchRestaurantVisits()) } 
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SelectRestaurantModal);
