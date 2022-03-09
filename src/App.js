import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Game from './components/Game';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={ Game } />
    </Switch>
  );
}
