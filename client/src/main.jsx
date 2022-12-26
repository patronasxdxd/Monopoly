import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Home, Monopoly} from './page';
import { OnboardModal } from './components';
import { GlobalContextProvider } from './context';
import './index.css';

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <GlobalContextProvider>
      {/* <OnboardModal /> */}
      <Routes>
        <Route path="/monopolyHome" element={<Home />} />
        <Route path="/monopoly" element={<Monopoly />} />
      </Routes>
    </GlobalContextProvider>
  </BrowserRouter>,
);
