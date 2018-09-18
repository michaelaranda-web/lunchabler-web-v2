import React from 'react';
import { connect } from 'react-redux';
import { PanelGroup } from 'react-bootstrap';
import { alphabetizedUsers } from '../../helpers/helpers';
import { UserListItem } from './userListItem';

function UserList(props) {
  return (
    <div id="user-list">
      <PanelGroup accordion id="user-list-accordion">
        {
          alphabetizedUsers(props.usersById).map((user, i) => {
            return <UserListItem key={i} itemKey={i} user={user} />
          })
        }
      </PanelGroup>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(UserList);