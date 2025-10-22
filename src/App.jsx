import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import StockPage from './pages/StockPage'
import CaissePage from './pages/CaissePage'
import CRMPage from './pages/CRMPage'
import NotFound from './pages/NotFound'
import EmployeeManagement from './pages/EmployeeManagement'
import RoleManagement from './pages/RoleManagement'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<StockPage />} />
        <Route path="/caisses" element={<CaissePage />} />
        <Route path="/crm" element={<CRMPage />} />
        <Route path="/RoleManagement" element={<RoleManagement />} />
        <Route path="/EmployeeManagement" element={<EmployeeManagement />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App