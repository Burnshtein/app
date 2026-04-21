// app/main.tsx (или в корне src/, но в ТЗ написано "app — провайдеры, роутер")
// Лучше оставить в корне src/, а в app положить App.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { App} from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)