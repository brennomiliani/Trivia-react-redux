import React, { Component } from 'react';
import { connect } from 'react-redux';

export class GameScreen extends Component {
  render() {
    return (
      <div>GameScreen</div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
