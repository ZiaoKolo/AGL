import React, { useState } from 'react';
import { Plus, Eye, Edit2, Trash2, X, Calendar, Clock, Users, Award, TrendingUp, AlertCircle, CheckCircle, XCircle, Search, Filter } from 'lucide-react';

const EmployeeManagement = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Alexandre Martin',
      email: 'alexandre.martin@email.com',
      role: 'Caissier',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      performance: 92,
      hoursWorked: 160,
      leaveBalance: 15,
      department: 'Caisses',
      phone: '0749950512',
      hireDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sophie Dubois',
      email: 'sophie.dubois@email.com',
      role: 'Responsable de Rayon',
      status: 'Actif',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
      performance: 88,
      hoursWorked: 155,
      leaveBalance: 20,
      department: 'Produits Frais',
      phone: '0749950513',
      hireDate: '2022-06-20'
    },
    {
      id: 3,
      name: 'Thomas Bernard',
      email: 'thomas.bernard@email.com',
      role: 'Chef de Projet',
      status: 'En congé',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
      performance: 95,
      hoursWorked: 145,
      leaveBalance: 8,
      department: 'Logistique',
      phone: '0749950514',
      hireDate: '2021-03-10'
    },
    {
      id: 4,
      name: 'Marie Lambert',
      email: 'marie.lambert@email.com',
      role: 'Équipe Logistique',
      status: 'Inactif',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      performance: 78,
      hoursWorked: 120,
      leaveBalance: 25,
      department: 'Logistique',
      phone: '0749950515',
      hireDate: '2024-01-05'
    }
  ]);

  const [schedules, setSchedules] = useState([
    { id: 1, employeeId: 1, day: 'Lundi', shift: 'Matin', hours: '08:00 - 14:00' },
    { id: 2, employeeId: 1, day: 'Mardi', shift: 'Après-midi', hours: '14:00 - 20:00' },
    { id: 3, employeeId: 2, day: 'Lundi', shift: 'Matin', hours: '08:00 - 14:00' },
    { id: 4, employeeId: 3, day: 'Mercredi', shift: 'Journée', hours: '08:00 - 17:00' }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    { id: 1, employeeId: 1, employeeName: 'Alexandre Martin', type: 'Congé payé', startDate: '2025-11-01', endDate: '2025-11-05', status: 'En attente', reason: 'Vacances familiales' },
    { id: 2, employeeId: 2, employeeName: 'Sophie Dubois', type: 'Maladie', startDate: '2025-10-25', endDate: '2025-10-26', status: 'Approuvé', reason: 'Grippe' },
    { id: 3, employeeId: 3, employeeName: 'Thomas Bernard', type: 'Congé payé', startDate: '2025-10-20', endDate: '2025-10-27', status: 'Approuvé', reason: 'Voyage' }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'Actif',
    department: '',
    phone: ''
  });

  const [leaveFormData, setLeaveFormData] = useState({
    employeeId: '',
    type: 'Congé payé',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [scheduleFormData, setScheduleFormData] = useState({
    employeeId: '',
    day: 'Lundi',
    shift: 'Matin',
    hours: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLeaveInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleScheduleInputChange = (e) => {
    const { name, value } = e.target;
    setScheduleFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = {
      id: employees.length + 1,
      ...formData,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      performance: 0,
      hoursWorked: 0,
      leaveBalance: 25,
      hireDate: new Date().toISOString().split('T')[0]
    };
    setEmployees([...employees, newEmployee]);
    setFormData({ name: '', email: '', role: '', status: 'Actif', department: '', phone: '' });
    setIsAddModalOpen(false);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    const employee = employees.find(emp => emp.id === parseInt(leaveFormData.employeeId));
    const newLeaveRequest = {
      id: leaveRequests.length + 1,
      ...leaveFormData,
      employeeId: parseInt(leaveFormData.employeeId),
      employeeName: employee.name,
      status: 'En attente'
    };
    setLeaveRequests([...leaveRequests, newLeaveRequest]);
    setLeaveFormData({ employeeId: '', type: 'Congé payé', startDate: '', endDate: '', reason: '' });
    setIsLeaveModalOpen(false);
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = {
      id: schedules.length + 1,
      ...scheduleFormData,
      employeeId: parseInt(scheduleFormData.employeeId)
    };
    setSchedules([...schedules, newSchedule]);
    setScheduleFormData({ employeeId: '', day: 'Lundi', shift: 'Matin', hours: '' });
    setIsScheduleModalOpen(false);
  };

  const handleDelete = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role,
      status: employee.status,
      department: employee.department,
      phone: employee.phone
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    setEmployees(employees.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, ...formData }
        : emp
    ));
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleApproveLeave = (id) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id ? { ...req, status: 'Approuvé' } : req
    ));
  };

  const handleRejectLeave = (id) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === id ? { ...req, status: 'Refusé' } : req
    ));
  };

  const handleDeleteSchedule = (id) => {
    setSchedules(schedules.filter(sch => sch.id !== id));
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Actif': 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
      'En congé': 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
      'Inactif': 'bg-slate-500/10 text-slate-400 ring-slate-500/20'
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ring-1 ${statusConfig[status]}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${status === 'Actif' ? 'bg-emerald-400' : status === 'En congé' ? 'bg-amber-400' : 'bg-slate-400'}`}></span>
        {status}
      </span>
    );
  };

  const getLeaveStatusBadge = (status) => {
    const statusConfig = {
      'En attente': 'bg-amber-500/10 text-amber-400 ring-amber-500/20',
      'Approuvé': 'bg-emerald-500/10 text-emerald-400 ring-emerald-500/20',
      'Refusé': 'bg-red-500/10 text-red-400 ring-red-500/20'
    };

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ring-1 ${statusConfig[status]}`}>
        {status}
      </span>
    );
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">Gestion des Ressources Humaines</h1>
            <p className="text-slate-400 mt-2 text-sm">Planification, congés, performances et gestion de l'équipe</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Employés Actifs</p>
                <p className="text-3xl font-bold text-white mt-1">{employees.filter(e => e.status === 'Actif').length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                <Users className="text-emerald-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">En Congé</p>
                <p className="text-3xl font-bold text-white mt-1">{employees.filter(e => e.status === 'En congé').length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="text-amber-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Demandes en Attente</p>
                <p className="text-3xl font-bold text-white mt-1">{leaveRequests.filter(r => r.status === 'En attente').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <AlertCircle className="text-blue-400" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Performance Moy.</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {Math.round(employees.reduce((acc, emp) => acc + emp.performance, 0) / employees.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-400" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab('list')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'list'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Liste des Employés
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'schedule'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Clock size={16} className="inline mr-2" />
            Planning
          </button>
          <button
            onClick={() => setActiveTab('leave')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'leave'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Calendar size={16} className="inline mr-2" />
            Congés & Absences
          </button>
          <button
            onClick={() => setActiveTab('performance')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap ${
              activeTab === 'performance'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'bg-slate-800/70 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Award size={16} className="inline mr-2" />
            Performances
          </button>
        </div>

        {/* Employee List Tab */}
        {activeTab === 'list' && (
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="p-6 border-b border-slate-700/50 flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un employé..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-lg shadow-emerald-500/20 hover:scale-105 whitespace-nowrap"
              >
                <Plus size={18} />
                Ajouter un employé
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Employé</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Département</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Statut</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Performance</th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img src={employee.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-700" />
                          <div>
                            <div className="font-medium text-white">{employee.name}</div>
                            <div className="text-sm text-slate-400">{employee.role}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{employee.department}</td>
                      <td className="py-4 px-6">{getStatusBadge(employee.status)}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${employee.performance >= 90 ? 'bg-emerald-400' : employee.performance >= 70 ? 'bg-blue-400' : 'bg-amber-400'}`}
                              style={{ width: `${employee.performance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-slate-300">{employee.performance}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleView(employee)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-emerald-400"
                          >
                            <Eye size={18} />
                          </button>
                          <button
                            onClick={() => handleEdit(employee)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-blue-400"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Planning des Employés</h2>
              <button
                onClick={() => setIsScheduleModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-lg shadow-emerald-500/20 hover:scale-105"
              >
                <Plus size={18} />
                Ajouter au planning
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {schedules.map((schedule) => {
                  const employee = employees.find(e => e.id === schedule.employeeId);
                  return (
                    <div key={schedule.id} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <img src={employee?.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-700" />
                          <div>
                            <div className="font-medium text-white">{employee?.name}</div>
                            <div className="text-xs text-slate-400">{employee?.role}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteSchedule(schedule.id)}
                          className="p-1 hover:bg-slate-700/50 rounded text-slate-400 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Calendar size={16} className="text-slate-400" />
                          {schedule.day}
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Clock size={16} className="text-slate-400" />
                          {schedule.shift} - {schedule.hours}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Leave Requests Tab */}
        {activeTab === 'leave' && (
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="p-6 border-b border-slate-700/50 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Gestion des Congés & Absences</h2>
              <button
                onClick={() => setIsLeaveModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all duration-200 font-medium text-sm shadow-lg shadow-emerald-500/20 hover:scale-105"
              >
                <Plus size={18} />
                Nouvelle demande
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Employé</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Type</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Période</th>
                    <th className="text-left py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Statut</th>
                    <th className="text-right py-4 px-6 text-xs font-semibold text-slate-400 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-medium text-white">{request.employeeName}</div>
                        <div className="text-sm text-slate-400">{request.reason}</div>
                      </td>
                      <td className="py-4 px-6 text-slate-300">{request.type}</td>
                      <td className="py-4 px-6">
                        <div className="text-slate-300 text-sm">
                          {request.startDate} → {request.endDate}
                        </div>
                      </td>
                      <td className="py-4 px-6">{getLeaveStatusBadge(request.status)}</td>
                      <td className="py-4 px-6">
                        {request.status === 'En attente' && (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleApproveLeave(request.id)}
                              className="p-2 hover:bg-emerald-500/10 rounded-lg transition-colors text-slate-400 hover:text-emerald-400"
                              title="Approuver"
                            >
                              <CheckCircle size={18} />
                            </button>
                            <button
                              onClick={() => handleRejectLeave(request.id)}
                              className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-slate-400 hover:text-red-400"
                              title="Refuser"
                            >
                              <XCircle size={18} />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Performance Tab */}
        {activeTab === 'performance' && (
          <div className="bg-slate-800/70 backdrop-blur-xl rounded-xl overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Suivi des Performances</h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {employees.map((employee) => (
                  <div key={employee.id} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700/30">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <img src={employee.avatar} alt="Avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700" />
                        <div>
                          <div className="font-medium text-white">{employee.name}</div>
                          <div className="text-sm text-slate-400">{employee.role}</div>
                        </div>
                      </div>
                      {getStatusBadge(employee.status)}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-slate-400">Performance Globale</span>
                          <span className="text-sm font-medium text-white">{employee.performance}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              employee.performance >= 90 ? 'bg-emerald-400' : 
                              employee.performance >= 70 ? 'bg-blue-400' : 'bg-amber-400'
                            }`}
                            style={{ width: `${employee.performance}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Heures travaillées</div>
                          <div className="text-lg font-semibold text-white">{employee.hoursWorked}h</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Jours de congé</div>
                          <div className="text-lg font-semibold text-white">{employee.leaveBalance} jours</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Employee Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl w-full max-w-lg relative z-10 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Ajouter un employé</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Jean Dupont"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="jean.dupont@email.com"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="0749950512"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rôle</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="">Sélectionner un rôle</option>
                  <option value="Caissier">Caissier</option>
                  <option value="Responsable de Rayon">Responsable de Rayon</option>
                  <option value="Équipe Logistique">Équipe Logistique</option>
                  <option value="Chef de Projet">Chef de Projet</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Département</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="">Sélectionner un département</option>
                  <option value="Caisses">Caisses</option>
                  <option value="Produits Frais">Produits Frais</option>
                  <option value="Logistique">Logistique</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Statut</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Actif">Actif</option>
                  <option value="En congé">En congé</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg transition-all font-medium border border-slate-700/50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all font-medium shadow-lg shadow-emerald-500/20 hover:scale-105"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Employee Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsViewModalOpen(false)}></div>
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl w-full max-w-2xl relative z-10 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Détails de l'employé</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <img src={selectedEmployee.avatar} alt="Avatar" className="w-20 h-20 rounded-full object-cover ring-2 ring-slate-700" />
                <div>
                  <h3 className="text-2xl font-semibold text-white">{selectedEmployee.name}</h3>
                  <p className="text-slate-400">{selectedEmployee.role}</p>
                  {getStatusBadge(selectedEmployee.status)}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="text-sm text-slate-400 mb-1">Email</div>
                  <div className="text-white">{selectedEmployee.email}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="text-sm text-slate-400 mb-1">Téléphone</div>
                  <div className="text-white">{selectedEmployee.phone}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="text-sm text-slate-400 mb-1">Département</div>
                  <div className="text-white">{selectedEmployee.department}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="text-sm text-slate-400 mb-1">Date d'embauche</div>
                  <div className="text-white">{selectedEmployee.hireDate}</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="text-sm text-slate-400 mb-1">Heures travaillées</div>
                  <div className="text-white">{selectedEmployee.hoursWorked}h</div>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                  <div className="text-sm text-slate-400 mb-1">Solde de congés</div>
                  <div className="text-white">{selectedEmployee.leaveBalance} jours</div>
                </div>
              </div>
              <div className="mt-6 bg-slate-800/50 rounded-lg p-4 border border-slate-700/30">
                <div className="text-sm text-slate-400 mb-2">Performance</div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${
                        selectedEmployee.performance >= 90 ? 'bg-emerald-400' : 
                        selectedEmployee.performance >= 70 ? 'bg-blue-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${selectedEmployee.performance}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-semibold text-white">{selectedEmployee.performance}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsEditModalOpen(false)}></div>
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl w-full max-w-lg relative z-10 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Modifier l'employé</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleUpdateEmployee} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Nom complet</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Téléphone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Rôle</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Caissier">Caissier</option>
                  <option value="Responsable de Rayon">Responsable de Rayon</option>
                  <option value="Équipe Logistique">Équipe Logistique</option>
                  <option value="Chef de Projet">Chef de Projet</option>
                  <option value="Manager">Manager</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Département</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Caisses">Caisses</option>
                  <option value="Produits Frais">Produits Frais</option>
                  <option value="Logistique">Logistique</option>
                  <option value="Administration">Administration</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Statut</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Actif">Actif</option>
                  <option value="En congé">En congé</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg transition-all font-medium border border-slate-700/50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all font-medium shadow-lg shadow-emerald-500/20 hover:scale-105"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Leave Request Modal */}
      {isLeaveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsLeaveModalOpen(false)}></div>
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl w-full max-w-lg relative z-10 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Nouvelle demande de congé</h2>
              <button onClick={() => setIsLeaveModalOpen(false)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleLeaveSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Employé</label>
                <select
                  name="employeeId"
                  value={leaveFormData.employeeId}
                  onChange={handleLeaveInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="">Sélectionner un employé</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Type de congé</label>
                <select
                  name="type"
                  value={leaveFormData.type}
                  onChange={handleLeaveInputChange}
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Congé payé">Congé payé</option>
                  <option value="Maladie">Maladie</option>
                  <option value="Congé sans solde">Congé sans solde</option>
                  <option value="Autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Date de début</label>
                <input
                  type="date"
                  name="startDate"
                  value={leaveFormData.startDate}
                  onChange={handleLeaveInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Date de fin</label>
                <input
                  type="date"
                  name="endDate"
                  value={leaveFormData.endDate}
                  onChange={handleLeaveInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Raison</label>
                <textarea
                  name="reason"
                  value={leaveFormData.reason}
                  onChange={handleLeaveInputChange}
                  required
                  rows="3"
                  placeholder="Décrivez la raison de cette demande..."
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                ></textarea>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg transition-all font-medium border border-slate-700/50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all font-medium shadow-lg shadow-emerald-500/20 hover:scale-105"
                >
                  Soumettre
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Schedule Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setIsScheduleModalOpen(false)}></div>
          <div className="bg-slate-800/90 backdrop-blur-xl rounded-2xl w-full max-w-lg relative z-10 shadow-2xl border border-slate-700/50">
            <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
              <h2 className="text-xl font-semibold text-white">Ajouter au planning</h2>
              <button onClick={() => setIsScheduleModalOpen(false)} className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Employé</label>
                <select
                  name="employeeId"
                  value={scheduleFormData.employeeId}
                  onChange={handleScheduleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="">Sélectionner un employé</option>
                  {employees.map(emp => (
                    <option key={emp.id} value={emp.id}>{emp.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Jour</label>
                <select
                  name="day"
                  value={scheduleFormData.day}
                  onChange={handleScheduleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Lundi">Lundi</option>
                  <option value="Mardi">Mardi</option>
                  <option value="Mercredi">Mercredi</option>
                  <option value="Jeudi">Jeudi</option>
                  <option value="Vendredi">Vendredi</option>
                  <option value="Samedi">Samedi</option>
                  <option value="Dimanche">Dimanche</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Shift</label>
                <select
                  name="shift"
                  value={scheduleFormData.shift}
                  onChange={handleScheduleInputChange}
                  required
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                >
                  <option value="Matin">Matin</option>
                  <option value="Après-midi">Après-midi</option>
                  <option value="Journée">Journée</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Heures</label>
                <input
                  type="text"
                  name="hours"
                  value={scheduleFormData.hours}
                  onChange={handleScheduleInputChange}
                  required
                  placeholder="08:00 - 14:00"
                  className="w-full px-4 py-2.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="flex-1 px-4 py-2.5 bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 rounded-lg transition-all font-medium border border-slate-700/50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all font-medium shadow-lg shadow-emerald-500/20 hover:scale-105"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;