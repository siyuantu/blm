import React, { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import useTalkingPoints from '../hooks/useTalkingPoints';

const SelectionContext = React.createContext({
  selectedTalkingPointTitle: undefined,
});

export const SelectionProvider = ({ children }) => {
  const isMounted = useRef(null);

  const talkingPoints = useTalkingPoints();

  const [selectedTalkingPointTitle, setSelectedTalkingPointTitle] = useState(
    ''
  );

  const getHashForTitle = useCallback(
    (title) => title.toLowerCase().replace(/[^a-z0-9-]+/g, '-'),
    []
  );

  const handleHashChange = useCallback(() => {
    const hash = window.location.hash.replace(/^#/, '');

    if (!hash) {
      return;
    }

    const selectedHash = window.decodeURIComponent(hash);

    const selectedTalkingPoint = talkingPoints.find(
      ({ title }) => getHashForTitle(title) === selectedHash
    );

    setSelectedTalkingPointTitle(
      selectedTalkingPoint && selectedTalkingPoint.title
    );
  }, [getHashForTitle, talkingPoints]);

  useEffect(() => {
    if (!isMounted.current) {
      return;
    }

    const newHash = selectedTalkingPointTitle
      ? `#${encodeURIComponent(getHashForTitle(selectedTalkingPointTitle))}`
      : '';

    if (window.location.hash !== newHash) {
      window.history.replaceState(
        null,
        '',
        `${window.location.pathname}${window.location.search}${newHash}`
      );
    }
  }, [getHashForTitle, selectedTalkingPointTitle]);

  useEffect(() => {
    window.addEventListener('hashchange', handleHashChange, false);

    return () => {
      window.removeEventListener('hashchange', handleHashChange, false);
    };
  }, [handleHashChange]);

  useEffect(() => {
    if (!isMounted.current) {
      handleHashChange();
    }

    isMounted.current = true;
  }, [handleHashChange]);

  return (
    <SelectionContext.Provider
      value={{ selectedTalkingPointTitle, setSelectedTalkingPointTitle }}
    >
      {children}
    </SelectionContext.Provider>
  );
};

SelectionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SelectionContext;
