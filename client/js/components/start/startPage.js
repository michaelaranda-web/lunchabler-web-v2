import React from 'react';
import { Link } from 'react-router-dom';
import LunchGroup from './lunchGroup';

export class StartPage extends React.Component {
  render() {
    return (
      <div id="start-page">
        <LunchGroup />
        <Link to='/results'>Get Suggestions</Link>
      </div>
    )
  }
}

export default StartPage;