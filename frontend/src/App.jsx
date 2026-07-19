import { RouterProvider } from "react-router"
import { Toaster } from "react-hot-toast"
import { router } from './app.routes.jsx'
import { AuthProvider } from "./features/auth/auth.context.jsx"
import { InterviewProvider } from "./features/interview/Interview.content.jsx"

function App() {
  
  return (
    <AuthProvider>
      <InterviewProvider>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#161a24",
              color:"#fff",
              border: '1px solid rgbs(255,255,255,0.08',
              fontSize:'0.9rem'
            },
            success: { iconTheme: { primary: "#15d04a", secondary: '#fff'}},
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff"}}
          }}
          />
        <RouterProvider router={router} />
      </InterviewProvider>
    </AuthProvider>
    
  )
}

export default App
