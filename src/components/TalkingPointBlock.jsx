import React from 'react';
import PropTypes from 'prop-types';
import './all.sass';

const TalkingPointBlock = React.forwardRef(
  (
    {
      backgroundColor,
      category,
      component,
      isSelected,
      style,
      textColor,
      title,
      ...props
    },
    ref
  ) =>
    React.createElement(
      component,
      {
        ...props, // eslint-disable-line react/jsx-props-no-spreading
        className: `talking-point ${
          isSelected ? 'talking-point--is-selected' : ''
        }`,
        ref,
        role: 'button',
        style: {
          color: textColor,
          backgroundColor,
          ...style,
        },
        tabIndex: 0,
      },
      <>
        <div className="talking-point__category">{category}</div>
        <div className="talking-point__title">{title}</div>
      </>
    )
);

TalkingPointBlock.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  component: PropTypes.elementType,
  isSelected: PropTypes.bool,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  title: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

TalkingPointBlock.defaultProps = {
  component: 'div',
  isSelected: false,
  style: undefined,
  onClick: undefined,
  onKeyDown: undefined,
};

export default TalkingPointBlock;
