import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import GameScreen from './pages/GameScreen';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ GameScreen } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
