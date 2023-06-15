import { createRoot } from 'react-dom/client'
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import 'antd/dist/reset.css'
import './assets/css/index.css'
import App from './App'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(
  <Provider store={store}>
    <Router initialEntries={['/login']}>
      <App />
    </Router>
  </Provider>
)
