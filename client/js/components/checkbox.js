import React from 'react';

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      checked: false
    }
  }
  
  render() {
    var label = null;
    
    if (this.props.label) {
      label = <label htmlFor={this.props.name}>{this.props.label}</label>
    }
    
    return (
      <div id={`checkbox-${this.props.checkboxId}`}>
        {label}
        <input 
          type="checkbox" 
          value={this.props.value}
          name={this.props.name}
          checked={this.state.checked}
          onChange={ () => this.onChange() }
        />
      </div>
    )
  }
  
  onChange() {
    this.setState({
      checked: !this.state.checked
    }, () => this.props.onChange(this.state.checked));
  }
}