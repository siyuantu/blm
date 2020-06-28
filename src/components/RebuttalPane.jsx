import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import './all.sass';

const RebuttalPane = React.forwardRef(
  ({ backgroundColor, content, style, textColor, onCloseButtonClick }, ref) => {
    return (
      <div
        className="rebuttal-pane"
        ref={ref}
        style={{
          color: textColor,
          backgroundColor,
          ...style,
        }}
      >
        <div className="rebuttal-pane__content">
          <div className="rebuttal-pane__markdown">
            <Markdown>{content}</Markdown>
          </div>
          <button
            className="rebuttal-pane__close-button"
            type="button"
            onClick={onCloseButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                className="rebuttal-pane__close-icon"
                d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  }
);

RebuttalPane.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  textColor: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func,
};

RebuttalPane.defaultProps = {
  style: undefined,
  onCloseButtonClick: undefined,
};

export default RebuttalPane;
