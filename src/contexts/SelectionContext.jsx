import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SelectionContext = React.createContext({
  selectedTalkingPointTitle: undefined,
});

export const SelectionProvider = ({ children }) => {
  const [selectedTalkingPointTitle, setSelectedTalkingPointTitle] = useState(
    'en'
  );

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
