import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page">
        {
          Object.keys(this.props.usersById).map((userId) => {
            return <p>{this.props.usersById[userId].name}</p>
          })
        }
        <Link to='/results'>Get Suggestions</Link>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    usersById: state.entities.users.byId
  }
}

export default connect(
  mapStateToProps,
  null
)(StartPage);