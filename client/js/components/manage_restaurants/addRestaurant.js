import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import YelpSearchResultItem from './yelpSearchResultItem';
import YelpIcon from '../../../img/yelp_icon.png';

export class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: "",
      searchResults: [],
      showErrorMessage: false
    }
  }
  
  renderErrorMessage() {
    if (this.state.showErrorMessage) {
      return <p className="error">Please enter a search term.</p>
    }
  }
  
  renderResults() {
    if (this.state.searchResults.length > 0) {
      return (
        <div className="section" id="yelp-search-results-section">
          <div id="yelp-search-results">
            {
              this.state.searchResults.map((restaurant, i) => {
                return <YelpSearchResultItem key={i} restaurant={restaurant}/>
              })
            }
          </div>
        </div>
      )
    }
  }
  
  render() {
    return (
      <div id="add-restaurants">
        <div className="section">
          <img src={YelpIcon} id="yelp-icon" />
          
          <p>Search for nearby restaurants:</p>
          
          <div id="search-bar-container">
            <input 
              id="yelp-search-bar" 
              onChange={ (e) => this.onInputChange(e) } 
              onKeyPress={ (e) => this.onKeyPress(e) }
              value={this.state.searchText}  
            />
            <button id="search-button" onClick={ () => this.submitSearch() }>
              <i className="fas fa-search" />
            </button>
          </div>
          
          {this.renderErrorMessage()}
        </div>
        
        {this.renderResults()}
      </div>
    );
  }
  
  submitSearch() {
    if (this.state.searchText === "") {
      this.setState({showErrorMessage: true})
      return;
    }
    
    var self = this;
    axios.get('/api/yelp_search', {params: {searchText: this.state.searchText}})
      .then((response) => {
        self.setState({
          searchResults: response.data
        })
      }).catch((error) => {
        console.log(error);
      });
  }
  
  onInputChange(e) {
    this.setState({
      searchText: e.target.value,
      showErrorMessage: false
    });
  }
  
  onKeyPress(e){
    if (e.key == "Enter") {
      this.submitSearch();
    }
  }
}