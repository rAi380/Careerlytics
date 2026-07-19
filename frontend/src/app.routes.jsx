import { createBrowserRouter } from "react-router";
import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import Layout from "./features/interview/components/Layout";
import Home from './features/interview/pages/Home'
import Interview from './features/interview/pages/Interview'
import History from "./features/interview/pages/History";
import LandingPage from "./features/interview/pages/LandingPage";
export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    element: <Protected><Layout /></Protected>,
    children: [
      {
        path: '/new-session',
        element: <Home />
      },
      {
        path: '/interview/:interviewId',
        element: <Interview />
      },
      {
        path: '/history',
        element: <History />
      }
    ]
  }
])