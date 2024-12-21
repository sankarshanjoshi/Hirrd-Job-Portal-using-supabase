import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import AppLayout from './layout/applayout'
import LandingPage from './pages/LandingPage'
import SavedJobs from './pages/SavedJobs'
import JobPost from './pages/JobPost'
import JobListing from './pages/JobListing'
import Onboarding from './pages/Onboarding'
import { ThemeProvider } from './components/theme-provider'
import ProtectedRoute from './components/protected-route'
import JobPage from './pages/Job'
import MyJobs from './pages/MyJobs'


const router = createBrowserRouter([
  {
    element:<AppLayout />,
    children:[
      {
        path: '/',
        element: <LandingPage />,
      },
      {
        path: '/onboarding',
        element:(
          <ProtectedRoute>
           <Onboarding />,
          </ProtectedRoute>
        )
      },
      {
        path: '/savedjobs',
        element:(
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>

        ),
      },
      {
        path: '/myjobs',
        element:(<ProtectedRoute>
              <MyJobs />
          </ProtectedRoute>) ,
      },
      {
        path: '/jobpost',
        element:(
          <ProtectedRoute>
            <JobPost />
          </ProtectedRoute>
        )},
      {
        path: '/joblisting',
        element:(
          <ProtectedRoute>
            <JobListing />,
          </ProtectedRoute>
        ) 
      },
      {
        path: '/job/:id',
        element:(
          <ProtectedRoute>
           <JobPage />,
          </ProtectedRoute>)
      }
    ]
  }
])

function App() {


  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <RouterProvider router = {router} />
  </ThemeProvider>
)
}


export default App;
