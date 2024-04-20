import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter
} from "react-router-dom";
import './index.css'
import DesignPattern from './DesignPattern'
import Login from './pages/Login/Login'
import ErrorPage from './pages/Error/error-page';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './utils/ProtectedRoute';
import Calendar from './components/containers/Calendar/Calendar';
import Content from './components/containers/Content/Content';
import {Provider} from 'react-redux'
import store from './redux/store'
import App from './App';
import Profile from './components/containers/Profile/Profile';
import Grades from './components/global/Grades/Grades';


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "calendar",
        element: <Calendar />
      },
      {
        path: "courses",
        element: <Content />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "grades",
        element: <Grades />
      },
      {
        path: "quiz",
        element: <div></div>
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/ui",
    element: <DesignPattern />,
  },
]) 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <App router={router} />
      </Provider>
  </React.StrictMode>,
)
