import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import App from '../components/App';
import Clock from '../components/Clock';
import Chronometer from '../components/Chronometer';

storiesOf('App', module)
  .add('default', () => {
    return(
      <App />
    );
  });

storiesOf('Clock', module)
  .add('default', () => {
    return(
      <Clock />
    );
  });

storiesOf('Chronometer', module)
  .add('default', () => {
    return(
      <Chronometer />
    );
  });
