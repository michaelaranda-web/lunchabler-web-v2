import React from 'react';
import { fetchRestaurantVisits } from '../../../actions/visitsActions';
import moment from 'moment';

export class GeneralInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
      visits: []
    }
  }
  
  componentDidMount() {
    this.fetchVisits();
  }
  
  renderGeneralInfo() {
    return (
      <div id="general-info" className="section">
        <div id="restaurant-image-container">
          {this.renderImage()}
        </div>
        <h1>{this.props.restaurant.name}</h1>
        {this.renderYelpInfo()}
      </div>
    )
  }
  
  renderYelpInfo() {
    var restaurant = this.props.restaurant;
    
    if (!!restaurant.distance) {
      return (
        <div id="general-info-content-container">
          <p>{restaurant.distance} miles</p>
          <p>{restaurant.displayAddress1}</p>
          <p>{restaurant.displayAddress2}</p>
          <a href={restaurant.url} target="_blank">More info at Yelp</a>
        </div>
      )  
    }
  }
  
  renderImage() {
    if (!!this.props.restaurant.imageUrl) {
      return <img src={this.props.restaurant.imageUrl} />
    } else {
      return <i className="fas fa-utensils" />
    }
  }
  
  renderUpdatingMessage() {
    if (this.state.updating) {
      return <h1><strong>Updating...</strong></h1>
    }
  }
  
  renderRecentVisits() {
    if (this.state.visits.length > 0) {
      return (
        <div>
          <p>Recent visits</p>
          {
            this.state.visits.map((visit) => {
              return <p>{this.formatVisitDate(visit.date)}</p>
            })
          }
        </div>
      )
    }
  }
  
  renderExistingComments() {
    if (!!this.props.restaurant.comments) {
      return (
        <div>
          <div>
            {
              this.props.restaurant.comments.map((comment) => {
                return <div><p>{comment.user}: </p><p>{comment.text}</p></div>  
              })
            }
          </div>
        </div>
      )
    }
  }
  
  render() {
    if (!!this.props.restaurant) {
      return (
        <div id="general-info-tab">
          {this.renderUpdatingMessage()}
          {this.renderGeneralInfo()}
          {this.renderRecentVisits()}
        </div>
      )
    } else { return null; }
  }
  
  fetchVisits() {
    this.setState({updating: true}, () => {
      fetchRestaurantVisits(this.props.restaurant._id)
        .then(visits =>
          this.setState({visits: visits, updating: false})
        )
    })
  }
  
  formatVisitDate(visitDate) {
    return moment(visitDate).format('MMMM Do YYYY');
  }
}