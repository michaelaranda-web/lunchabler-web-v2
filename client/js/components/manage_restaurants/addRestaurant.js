import React from 'react';
import axios from 'axios';

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
        <p>Search for a restaurant to import from Yelp:</p>
        <input 
          id="yelp-search-bar" 
          onChange={ (e) => this.onInputChange(e) } 
          value={this.state.searchText}  
        />
        <button onClick={ () => this.onSearch() }>Search</button>
        {
          this.state.searchResults.map((restaurant, i) => {
            return <p key={i}>{restaurant.name}</p>
          })
        }
      </div>
    );
  }
  
  onSearch() {
    var self = this;
    axios.get('/api/yelp_search', {params: {searchText: this.state.searchText}})
      .then((response) => {
        console.log(response);
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
}