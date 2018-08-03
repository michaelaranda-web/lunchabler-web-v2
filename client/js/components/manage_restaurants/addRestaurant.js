import React from 'react';
import axios from 'axios';
import { YelpSearchResultItem } from './yelpSearchResultItem';
import YelpIcon from '../../../img/yelp_icon.png';

export class AddRestaurant extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      searchText: "",
      searchResults: []
    }
  }
  
  render() {
    return (
      <div id="add-restaurants">
        <img src={YelpIcon} />
        <p>Search for a restaurant to import from Yelp:</p>
        <input 
          id="yelp-search-bar" 
          onChange={ (e) => this.onInputChange(e) } 
          onKeyPress={ (e) => this.onKeyPress(e) }
          value={this.state.searchText}  
        />
        <button onClick={ () => this.submitSearch() }>Search</button>
        {
          this.state.searchResults.map((restaurant, i) => {
            return <YelpSearchResultItem key={i} restaurant={restaurant}/>
          })
        }
      </div>
    );
  }
  
  submitSearch() {
    var self = this;
    axios.get('/api/yelp_search', {params: {searchText: this.state.searchText}})
      .then((response) => {
        console.log(response.data);
        self.setState({
          searchResults: response.data
        })
      }).catch((error) => {
        console.log(error);
      });
  }
  
  onInputChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }
  
  onKeyPress(e){
    if (e.key == "Enter") {
      this.submitSearch();
    }
  }
}