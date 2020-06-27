import React from 'react';
import PropTypes from 'prop-types';
import { TalkingPointTemplate } from '../../templates/TalkingPoint';

const TalkingPointPreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <TalkingPointTemplate />;
  }

  return <div>Loading...</div>;
};

TalkingPointPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
};

export default TalkingPointPreview;
