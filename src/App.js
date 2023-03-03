
import React, {Fragment} from 'react';
import { BrowserRouter ,Navigate, Route,
  Routes} from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
// import Router from './routes';

import RouterLink from './router/router';
// theme
import ThemeProvider from './theme';
// components
// import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';


// import AuthenticateUser from './components/AuthenicationUser';


// ----------------------------------------------------------------------

  
export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
            <RouterLink />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
