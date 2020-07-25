import React from 'react';
import { StaticRouter } from 'react-router';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { I18nProvider } from '../contexts/I18nContext';
import { SelectionProvider } from '../contexts/SelectionContext';
import AboutTab from '../components/AboutTab';
import Navigation from '../components/Navigation';
import IndexPageTemplate from '../templates/IndexPage';

const Router = typeof window !== 'undefined' ? BrowserRouter : StaticRouter;

const IndexPage = () => (
  <Router>
    <I18nProvider>
      <SelectionProvider>
        <div className="page-wrapper">
          <div className="page">
            <Navigation />
            <Switch>
              <Route path="/about">
                <AboutTab />
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
