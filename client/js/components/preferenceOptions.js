import React from 'react';

export class PreferenceOptions extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      updating: false,
      showErrorMessage: false,
      optimisticUpdate: null
    };
  }
  
  renderErrorMessage() {
    if (this.state.showErrorMessage) {
      return (
        <div className="error">Error. Please try again.</div>
      )
    }
  }
  
  render() {
    return (
      <div className="preference-options">
        <i className={`far fa-grin-beam ${this.currentPreferenceClass("yes")}`}
           onClick={() => this.onPreferenceClick("yes")}></i>
        <i className={`far fa-meh ${this.currentPreferenceClass("meh")}`}
           onClick={() => this.onPreferenceClick("meh")}></i>
        <i className={`far fa-angry ${this.currentPreferenceClass("no")}`}
           onClick={() => this.onPreferenceClick("no")}></i>
         {this.renderErrorMessage()}
      </div>
    )
  }
  
  currentPreferenceClass(preference) {
    if (this.state.optimisticUpdate) {
      return this.state.optimisticUpdate === preference ? 'current-preference' : '';
    } else {
      return this.props.currentPreference === preference ? 'current-preference' : '';
    }
  }
  
  onPreferenceClick(preference) {
    if (this.state.updating || (this.props.currentPreference === preference)) { return }
    
    this.setState({
      updating: true,
      showErrorMessage: false,
      optimisticUpdate: preference
    }, () => {
      this.props.onPreferenceClick(preference)
        .then(() => {
          this.setState({
            updating: false
          });
        })
      .catch(() => {
        this.setState({
          updating: false,
          showErrorMessage: true,
          optimisticUpdate: null
        });
      })
    });
  }
}