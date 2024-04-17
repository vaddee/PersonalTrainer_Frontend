import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
/* import './index.css' */




import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Customer from './assets/components/Customer.jsx';
import Training from './assets/components/Training.jsx';
import Error from './assets/Error.jsx';


const router = createBrowserRouter([  // Import components that are used in routes
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,    //error käsittely
    children: [                       // children are nested routes with a route
      {
        element: <Customer />,
        index: true                   // index route does not need any path
      },
      {
        path: "training",                // path can be defined relative to the parent path
        element: <Training />,
      },
     
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
