import React from 'react';
import { connect } from 'react-redux';
import { Checkbox } from '../checkbox';
import { addUserToLunchGroup, removeUserFromLunchGroup } from '../../actions/lunchGroupActions';

export class LunchGroup extends React.Component {
  render() {
    return (
      <div id="lunch-group-section">
        {
          Object.keys(this.props.usersById).map((userId) => {
            var userName = this.props.usersById[userId].name;
          
            return (
              <Checkbox 
                name={`checkbox-${userId}`}
                value={userId}
                label={userName}
                checkboxId={userId}
                onChange={ (checked) => this.onCheckboxChange(userId, checked) }
              />
            )
          })
        }
      </div>
    )
  }
  
  onCheckboxChange(userId, checked) {
    if (checked) {
      this.props.addUserToLunchGroup(userId);
    } else {
      this.props.removeUserFromLunchGroup(userId);
    }
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addUserToLunchGroup: (userId) => dispatch(addUserToLunchGroup(userId)),
    removeUserFromLunchGroup: (userId) => dispatch(removeUserFromLunchGroup(userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LunchGroup);