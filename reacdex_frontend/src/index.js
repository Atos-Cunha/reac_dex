import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Header from './componentes/Header';
import HeaderDark from './componentes/IconesHeaderDark';
import Home from './routes/Home';
import Evolves from './routes/Evolves';
// import EvolvesDark from './routes/EvolvesDark';
import Types from './routes/Types.js';
import Fav from './routes/Fav';

const GlobalStyle = createGlobalStyle`
  * {
    text-decoration: none;
  }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  li {
    list-style: none;
  }
`;

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <Header />
          {/* <HeaderDark /> */}
          <Home />
        </>
      ),
    },
    {
      path: '/home',
      element: (
        <>
          <Header />
          <Home />
        </>
      ),
    },
    {
      path: '/Evolves',
      element: (
        <>
          <Header />
          <Evolves />
        </>
      ),
    },
    {
      path: '/Types',
      element: (
        <>
          <Header />
          <Types />
        </>
      ),
    },
    {
      path: '/fav',
      element: (
        <>
          <Header />
          <Fav />
        </>
      ),
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
