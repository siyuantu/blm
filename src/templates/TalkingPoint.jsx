import React from 'react';
import TalkingPointBlock from '../components/TalkingPointBlock';

export const TalkingPointTemplate = () => <TalkingPointBlock />;

TalkingPointTemplate.propTypes = {};

const TalkingPoint = () => {
  return <TalkingPointTemplate />;
};

export default TalkingPoint;
