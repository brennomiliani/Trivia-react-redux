import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

export class GameScreen extends Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen);
