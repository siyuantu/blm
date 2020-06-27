import React from 'react';
import PropTypes from 'prop-types';
import './all.sass';

const TalkingPointBlock = React.forwardRef(
  ({ backgroundColor, textColor, title, onClick, onKeyDown }, ref) => (
    <div
      className="talking-point"
      ref={ref}
      role="button"
      style={{
        color: textColor,
        backgroundColor,
      }}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onClick={onClick}
    >
      <div className="talking-point__title">{title}</div>
    </div>
  )
);

TalkingPointBlock.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};

TalkingPointBlock.defaultProps = {
  onClick: undefined,
  onKeyDown: undefined,
};

export default TalkingPointBlock;
