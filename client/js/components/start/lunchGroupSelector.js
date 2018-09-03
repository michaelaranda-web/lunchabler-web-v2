import React from 'react';
import { connect } from 'react-redux';
import { UserButton } from './userButton';
import { addUserToLunchGroup, removeUserFromLunchGroup } from '../../actions/lunchGroupActions';
import { alphabetizedUsers } from '../../helpers/helpers';

export class LunchGroupSelector extends React.Component {
  render() {
    return (
      <div id="lunch-group-section">
        {
          alphabetizedUsers(this.props.usersById).map((user) => {
            var userId = user._id;
            var userName = user.name;
            var selectedByDefault = this.props.lunchGroup.includes(userId);
          
            return (
              <UserButton 
                id={`user-button-${userId}`}
                userName={userName}
                selectedByDefault={selectedByDefault}
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
    usersById: state.entities.users.byId,
    lunchGroup: state.ui.lunchGroup
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
)(LunchGroupSelector);