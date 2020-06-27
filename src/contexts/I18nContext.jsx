import React, { useState } from 'react';
import PropTypes from 'prop-types';

const I18nContext = React.createContext({
  language: 'en',
});

export const I18nProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  return (
    <I18nContext.Provider value={{ language, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
};

I18nProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default I18nContext;
