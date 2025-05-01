import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import {GoogleOAuthProvider} from "@react-oauth/google";


let CLIENT_ID = "250167301188-b128arbfoeoepssa90vm6mr62tkha26h.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <AuthProvider>

<GoogleOAuthProvider clientId={CLIENT_ID}>
  <StrictMode>

    <App />
  </StrictMode>
</GoogleOAuthProvider>
  </AuthProvider>
)
