import React from 'react';
import PropTypes from 'prop-types';
import IndexPageTemplate from '../../templates/IndexPage';

const IndexPagePreview = ({ entry }) => {
  const data = entry.getIn(['data']).toJS();

  if (data) {
    return <IndexPageTemplate />;
  }
  return <div>Loading...</div>;
};

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }).isRequired,
};

export default IndexPagePreview;
