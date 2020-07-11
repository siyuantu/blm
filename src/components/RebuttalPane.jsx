import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'react-markdown';
import './all.sass';

const RebuttalPane = React.forwardRef(
  (
    {
      askYourselfContent,
      askYourselfSectionTitle,
      backgroundColor,
      backgroundImageAlignment,
      backgroundImageUrl,
      content,
      readMoreLinks,
      readMoreSectionTitle,
      style,
      textColor,
      onCloseButtonClick,
    },
    ref
  ) => {
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
          {backgroundImageUrl && (
            <div
              className={`rebuttal-pane__background-image ${
                backgroundImageAlignment === 'right'
                  ? 'rebuttal-pane__background-image--align-bottom'
                  : ''
              }`}
              style={{
                backgroundImage: `url(${backgroundImageUrl})`,
              }}
            />
          )}
          <div className="rebuttal-pane__column">
            <div className="rebuttal-pane__markdown">
              <Markdown>{content}</Markdown>
            </div>
          </div>
          {askYourselfContent || (readMoreLinks && readMoreLinks.length) ? (
            <div className="rebuttal-pane__column">
              {askYourselfContent && (
                <>
                  <h2>{askYourselfSectionTitle}</h2>
                  <Markdown>{askYourselfContent}</Markdown>
                </>
              )}
              {readMoreLinks && readMoreLinks.length && (
                <>
                  <h2>{readMoreSectionTitle}</h2>
                  <ul className="rebuttal-pane__read-more-links">
                    {/* eslint-disable camelcase */}
                    {readMoreLinks.map(({ url, link_title, source }) => (
                      <li>
                        <div className="rebuttal-pane__read-more-link">
                          <div className="rebuttal-pane__read-more-link-image" />
                          <div>
                            <a href={url}>{link_title}</a>
                            <span>{` (${source})`}</span>
                          </div>
                        </div>
                      </li>
                    ))}
                    {/* eslint-enable camelcase */}
                  </ul>
                </>
              )}
            </div>
          ) : null}
          <button
            className="rebuttal-pane__close-button"
            type="button"
            onClick={onCloseButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
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
  askYourselfContent: PropTypes.string,
  askYourselfSectionTitle: PropTypes.string,
  backgroundColor: PropTypes.string.isRequired,
  backgroundImageAlignment: PropTypes.string,
  backgroundImageUrl: PropTypes.string,
  content: PropTypes.string.isRequired,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  readMoreSectionTitle: PropTypes.string,
  readMoreLinks: PropTypes.arrayOf(
    PropTypes.shape({
      link_title: PropTypes.string,
      image_url: PropTypes.string,
      source: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  textColor: PropTypes.string.isRequired,
  onCloseButtonClick: PropTypes.func,
};

RebuttalPane.defaultProps = {
  askYourselfContent: '',
  askYourselfSectionTitle: 'Ask Yourself',
  backgroundImageAlignment: 'right',
  backgroundImageUrl: '',
  readMoreLinks: [],
  readMoreSectionTitle: 'Read More',
  style: undefined,
  onCloseButtonClick: undefined,
};

export default RebuttalPane;
