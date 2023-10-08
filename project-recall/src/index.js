import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import App from './App';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard';
import Projects from './components/Projects/Projects';
import Archive from './components/Archive/Archive';
import Complete from './components/Complete/Complete';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },{
    path: "/register",
    element: <Register/>,
  },{
    path: "/dashboard",
    element: <Dashboard/>,
  },{
    path: "/dashboard/projects/all",
    element: <Projects/>,
  },{
    path: "/dashboard/projects/archived",
    element: <Archive/>,
  },{
    path: "/dashboard/projects/completed",
    element: <Complete/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

