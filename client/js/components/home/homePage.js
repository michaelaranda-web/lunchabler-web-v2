import React from 'react';

export class HomePage extends React.Component {
  render() {
    return this.props.users.map((user) => {
      return <p>{user.name}</p>
    })
  }
}