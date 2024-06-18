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
import Quiz from './components/containers/Quiz/Quiz';
import QuizNew from './components/containers/QuizNew/QuizNew';
import QuizAnswer from './components/containers/QuizAnswer/QuizAnswer';


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
        element: <Quiz />,
      },
      {
        path: "quiz/new",
        element: <QuizNew />
      },
      {
        path: "quiz/:quizId",
        element: <QuizAnswer />,
        loader: ({ params }) => {
          return params.quizId;
        }
      },
      {
        path: "quiz/:id",
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
