import React from 'react';
import './App.css';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom';
import Login from './pages/Login';
import GameScreen from './pages/GameScreen';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ GameScreen } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
