// app/router/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import { HomePage } from '../../pages/HomePage'
import { CatalogPage } from '../../pages/CatalogPage'
import { ProductPage } from '../../pages/Product.page'
import { LoginPage } from '../../pages/LoginPage'
import { RegisterPage } from '../../pages/RegisterPage'
import { Navigate } from 'react-router-dom'

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/catalog', element: <CatalogPage /> },
  { path: '/product/:id', element: <ProductPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/logout', element: <Navigate to="/" /> },
])