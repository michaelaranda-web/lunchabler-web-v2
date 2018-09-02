import React from 'react';

export class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      checked: this.props.checkedByDefault
    }
  }
  
  render() {
    var label = null;
    
    if (this.props.label) {
      label = <label htmlFor={this.props.name}>{this.props.label}</label>
    }
    
    return (
      <div id={`checkbox-${this.props.checkboxId}`} onClick={ () => this.onClick() }>
        {label}
        <input 
          id={this.props.name}
          type="checkbox" 
          value={this.props.value}
          checked={this.state.checked}
        />
      </div>
    )
  }
  
  onClick() {
    this.setState({
      checked: !this.state.checked
    }, () => this.props.onChange(this.state.checked));
  }
}