import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Customer from './assets/components/Customer.jsx';
import Training from './assets/components/Training.jsx';
import Error from './assets/Error.jsx';
import MyCalendar from './assets/components/MyCalendar.jsx';
import Statistics from './assets/components/Statistics.jsx';

const router = (
  <HashRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Customer />} />
        <Route path="training" element={<Training />} />
        <Route path="calendar" element={<MyCalendar />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </HashRouter>
);

ReactDOM.render(
  <React.StrictMode>
    {router}
  </React.StrictMode>,
  document.getElementById('root')
);
