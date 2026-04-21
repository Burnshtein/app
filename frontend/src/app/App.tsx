// app/App.tsx
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { StoreProvider } from './providers/StoreProviders'
import './styles/global.css'

export function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  )
}