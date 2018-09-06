import React from 'react';

export class UserButton extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selected: this.props.selectedByDefault || false
    }
  }
  
  render() {
    return (
      <span className={`user-button ${this.selectedClass()}`} onClick={() => this.onSelect()}>
        {this.props.userName}
      </span>
    )
  }
  
  selectedClass() {
    return this.state.selected ? "selected" : ""
  }
  
  onSelect() {
    this.setState({
      selected: !this.state.selected
    }, () => this.props.onChange(this.state.selected))
  }
}
