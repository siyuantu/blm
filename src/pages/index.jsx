import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { I18nProvider } from '../contexts/I18nContext';
import { SelectionProvider } from '../contexts/SelectionContext';
import Navigation from '../components/Navigation';
import IndexPageTemplate from '../templates/IndexPage';
import AboutPage from './AboutPage';

const IndexPage = () => (
  <Router>
    <I18nProvider>
      <SelectionProvider>
        <div className="page-wrapper">
          <div className="page">
            <Navigation />
            <Switch>
              <Route path="/about">
                <AboutPage />
              </Route>
              <Route path="/">
                <IndexPageTemplate />
              </Route>
            </Switch>
          </div>
        </div>
      </SelectionProvider>
    </I18nProvider>
  </Router>
);

export default IndexPage;
