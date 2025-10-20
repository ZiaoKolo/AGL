import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import StockPage from './pages/StockPage'
import CaissePage from './pages/CaissePage'
import RHPage from './pages/RHPage'
import CRMPage from './pages/CRMPage'
import AgentDashboard from './pages/AgentDashboard'
import NotFound from './pages/NotFound'
import SupplierPage from './pages/SupplierPage'
import SupermarketDashboard from './pages/SupermarketDashboard'
import UserManagement from './pages/UserManagement'
import SettingsPage from './pages/SettingsPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<StockPage />} />
        <Route path="/suppliers" element={<SupplierPage />} />
        <Route path="/caisses" element={<CaissePage />} />
        <Route path="/rh" element={<RHPage />} />
        <Route path="/crm" element={<CRMPage />} />
        <Route path="/AgentDashboard" element={<AgentDashboard />} />
        <Route path="/SupermarketDashboard" element={<SupermarketDashboard />} />
        <Route path="/UserManagement" element={<UserManagement />} />
        <Route path="/Settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App