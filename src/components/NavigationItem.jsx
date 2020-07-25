import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './all.sass';

const NavigationItem = ({ className, title, url }) => (
  <Link className={`navigation-item ${className}`} to={url}>
    {title}
  </Link>
);

NavigationItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

NavigationItem.defaultProps = {
  className: '',
};

export default NavigationItem;
