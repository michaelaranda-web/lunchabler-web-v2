import React from 'react';
import { Panel } from 'react-bootstrap';

export function UserListItem(props) {
  return (
    <Panel eventKey={props.itemKey} className="user-list-item">
      <Panel.Heading className="user-list-item-header">
        <Panel.Title toggle>
          <span className="user-name">{props.user.name}</span>
          <i class="fas fa-chevron-down"></i>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body collapsible>
        <div>
          <p>Hello!</p>
        </div>
      </Panel.Body>
    </Panel>
  );
}