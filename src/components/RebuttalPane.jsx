import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import './all.sass';

const RebuttalPane = ({
  backgroundColor,
  content,
  textColor,
  onCloseButtonClick,
}) => {
  return (
    <div
      className="rebuttal-pane"
      style={{
        color: textColor,
        backgroundColor,
      }}
    >
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
          <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
        </svg>
      </button>
    </div>
  );
};

RebuttalPane.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func,
};

RebuttalPane.defaultProps = {
  onCloseButtonClick: undefined,
};

export default RebuttalPane;
