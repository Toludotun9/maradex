'use client';

import React, { useState, useEffect } from 'react';
import { 
  Lock, Search, Filter, CheckCircle2, XCircle, Clock, 
  Eye, Download, LogOut, FileText, AlertCircle, RefreshCw,
  TrendingUp, Users, Calendar, DollarSign, BookOpen, ShieldAlert,
  Loader2, CreditCard
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Application {
  id: string;
  email: string;
  applicant_type: string;
  status: string;
  current_step: number;
  first_name: string;
  middle_initial: string;
  last_name: string;
  suffix: string;
  phone: string;
  citizenship_status: string;
  dob_month: string;
  dob_day: string;
  dob_year: string;
  ssn: string;
  address_street: string;
  address_apt: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  loan_program_type: string;
  loan_school_name: string;
  loan_major: string;
  loan_year_of_study: string;
  loan_amount_requested: string;
  has_cosigner: boolean;
  cosigner_email_address: string;
  employment_status: string;
  annual_income: string;
  student_id_url: string | null;
  state_id_url: string | null;
  gov_id_type: string | null;
  gov_id_front_url: string | null;
  gov_id_back_url: string | null;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  // Authentication states
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard states
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Document URLs generated dynamically
  const [studentIdSignedUrl, setStudentIdSignedUrl] = useState<string | null>(null);
  const [govFrontSignedUrl, setGovFrontSignedUrl] = useState<string | null>(null);
  const [govBackSignedUrl, setGovBackSignedUrl] = useState<string | null>(null);

  // Load session from sessionStorage on mount
  useEffect(() => {
    const savedToken = sessionStorage.getItem('admin_session_token');
    const savedUser = sessionStorage.getItem('admin_username');
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUsername(savedUser);
    }
  }, []);

  // Fetch applications whenever session token, filter, or search changes
  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token, statusFilter, searchTerm]);

  // Generate signed URLs when a specific application is selected
  useEffect(() => {
    if (selectedApp) {
      setAdminNotes(selectedApp.admin_notes || '');
      loadDocumentUrls(selectedApp);
    } else {
      setStudentIdSignedUrl(null);
      setGovFrontSignedUrl(null);
      setGovBackSignedUrl(null);
    }
  }, [selectedApp]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      sessionStorage.setItem('admin_session_token', data.token);
      sessionStorage.setItem('admin_username', data.username);
      setToken(data.token);
    } catch (err: any) {
      setLoginError(err.message || 'Incorrect credentials. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_session_token');
    sessionStorage.removeItem('admin_username');
    setToken(null);
    setApplications([]);
    setSelectedApp(null);
    setUsername('');
    setPassword('');
  };

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = new URL('/api/admin/applications', window.location.origin);
      if (statusFilter !== 'all') url.searchParams.append('status', statusFilter);
      if (searchTerm.trim() !== '') url.searchParams.append('search', searchTerm.trim());

      const response = await fetch(url.toString(), {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();

      if (response.status === 401) {
        handleLogout();
        return;
      }

      if (result.success) {
        setApplications(result.data);
      } else {
        console.error('Error fetching applications:', result.error);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadDocumentUrls = async (app: Application) => {
    setStudentIdSignedUrl(null);
    setGovFrontSignedUrl(null);
    setGovBackSignedUrl(null);

    if (app.student_id_url) {
      try {
        const { data } = await supabase.storage
          .from('identity_documents')
          .createSignedUrl(app.student_id_url, 300);
        if (data) setStudentIdSignedUrl(data.signedUrl);
      } catch (err) {
        console.error('Failed to sign student ID URL:', err);
      }
    }

    if (app.gov_id_front_url) {
      try {
        const { data } = await supabase.storage
          .from('identity_documents')
          .createSignedUrl(app.gov_id_front_url, 300);
        if (data) setGovFrontSignedUrl(data.signedUrl);
      } catch (err) {
        console.error('Failed to sign gov front ID URL:', err);
      }
    }

    if (app.gov_id_back_url) {
      try {
        const { data } = await supabase.storage
          .from('identity_documents')
          .createSignedUrl(app.gov_id_back_url, 300);
        if (data) setGovBackSignedUrl(data.signedUrl);
      } catch (err) {
        console.error('Failed to sign gov back ID URL:', err);
      }
    }
  };

  const handleUpdateStatus = async (status: 'approved' | 'rejected' | 'pending') => {
    if (!selectedApp) return;

    setUpdatingStatus(true);
    try {
      const response = await fetch(`/api/admin/applications/${selectedApp.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          adminNotes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update application');
      }

      // Update selected app and list states
      const updatedApp = { ...selectedApp, status, admin_notes: adminNotes };
      setSelectedApp(updatedApp);
      setApplications(prev => prev.map(a => a.id === selectedApp.id ? updatedApp : a));

    } catch (err: any) {
      alert(err.message || 'Error updating status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  // Get statistics
  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    approved: applications.filter(a => a.status === 'approved').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const formatCurrency = (val: string | number) => {
    if (!val) return '$0';
    const num = typeof val === 'string' ? parseInt(val.replace(/\D/g, '')) : val;
    return isNaN(num) ? '$0' : `$${num.toLocaleString()}`;
  };

  const getStatusBadge = (status: string) => {
    const base = "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 uppercase tracking-wider";
    switch (status) {
      case 'approved':
        return `${base} bg-green-50 text-green-700 border border-green-200`;
      case 'rejected':
        return `${base} bg-red-50 text-red-700 border border-red-200`;
      case 'pending':
        return `${base} bg-amber-50 text-amber-700 border border-amber-200`;
      case 'draft':
        return `${base} bg-gray-50 text-gray-700 border border-gray-200`;
      default:
        return `${base} bg-slate-50 text-slate-700 border border-slate-200`;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      case 'rejected':
        return <XCircle className="w-3.5 h-3.5" />;
      case 'pending':
        return <Clock className="w-3.5 h-3.5" />;
      default:
        return <FileText className="w-3.5 h-3.5" />;
    }
  };

  if (!token) {
    /* Login Page UI */
    return (
      <div className="flex-grow flex items-center justify-center min-h-[calc(100vh-73px)] py-16 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#E6F4FF] via-white to-[#E9F9F4] -z-10" />
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-500">
          <div className="text-center mb-8">
            <span className="text-[26px] font-bold tracking-tight text-primary-blue lowercase select-none" style={{ fontFamily: 'Georgia, serif' }}>
              sall
              <span className="relative inline-block text-[#13325b]">
                ı
                <span className="absolute top-[2px] left-[1px] w-[5.5px] h-[5.5px] bg-[#e20074] rounded-full"></span>
              </span>
              e mae
            </span>
            <h2 className="text-xl font-extrabold text-primary-blue mt-4">Admin Review Portal</h2>
            <p className="text-sm text-gray-500 font-medium mt-1">Authorized access only. Log in to review student IDs.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-start gap-2 text-red-700 text-xs font-semibold mb-6 animate-in shake duration-300">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue text-sm font-medium transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-xl outline-none focus:border-secondary-blue focus:ring-1 focus:ring-secondary-blue text-sm font-medium transition-all"
                  required
                />
                <Lock className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loginLoading}
              className="w-full py-3.5 bg-primary-blue hover:bg-secondary-blue text-white rounded-full font-bold text-sm shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loginLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                'Sign In to Dashboard'
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  /* Admin Dashboard UI */
  return (
    <div className="flex-grow min-h-screen bg-slate-50 flex flex-col">
      {/* Subheader Dashboard Controls */}
      <div className="bg-white border-b border-gray-200 py-6 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-primary-blue flex items-center gap-2">
            Verification Dashboard <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded border">Admin</span>
          </h1>
          <p className="text-xs text-gray-500 font-medium">Verify documents, approve loans, and manage compliance.</p>
        </div>
        <button 
          onClick={handleLogout}
          className="self-start md:self-auto flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3.5 py-2 rounded-xl transition-all border border-transparent hover:border-red-100"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </div>

      <div className="flex-grow p-6 md:p-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Section: Main Table and Controls */}
        <div className="lg:col-span-2 space-y-8 flex flex-col">
          
          {/* KPI Statistics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Active</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-primary-blue">{stats.total}</span>
                <Users className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Pending Check</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-amber-600">{stats.pending}</span>
                <Clock className="w-4 h-4 text-amber-500 animate-pulse" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-green-100 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Approved</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-green-600">{stats.approved}</span>
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-sm flex flex-col justify-between">
              <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Rejected</span>
              <div className="flex items-baseline justify-between mt-2">
                <span className="text-2xl font-black text-red-600">{stats.rejected}</span>
                <XCircle className="w-4 h-4 text-red-500" />
              </div>
            </div>
          </div>

          {/* Filtering and Search Controls */}
          <div className="bg-white p-5 rounded-2xl border border-gray-200/60 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, email..."
                  className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl outline-none focus:border-secondary-blue text-sm font-medium transition-all"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              
              {/* Filter */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2 bg-slate-50 flex-shrink-0">
                <Filter className="w-4 h-4 text-gray-500" />
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs font-bold text-gray-700 cursor-pointer"
                >
                  <option value="all">ALL STATUSES</option>
                  <option value="pending">PENDING CHECK</option>
                  <option value="approved">APPROVED</option>
                  <option value="rejected">REJECTED</option>
                  <option value="draft">DRAFTS</option>
                </select>
              </div>
            </div>
          </div>

          {/* Applications Table Card */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden flex-grow flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="p-4 pl-6">Applicant</th>
                    <th className="p-4">Requested</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Submission Date</th>
                    <th className="p-4 pr-6 text-right">View</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center">
                        <div className="flex flex-col items-center justify-center">
                          <Loader2 className="w-8 h-8 animate-spin text-secondary-blue mb-2" />
                          <span className="text-xs text-gray-500 font-medium">Loading applications...</span>
                        </div>
                      </td>
                    </tr>
                  ) : applications.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-sm text-gray-400 font-medium">
                        No applications matching the query filters.
                      </td>
                    </tr>
                  ) : (
                    applications.map((app) => (
                      <tr 
                        key={app.id} 
                        onClick={() => setSelectedApp(app)}
                        className={`hover:bg-slate-50/50 cursor-pointer transition-colors ${selectedApp?.id === app.id ? 'bg-blue-50/20' : ''}`}
                      >
                        <td className="p-4 pl-6">
                          <div className="font-bold text-primary-blue text-sm">
                            {app.first_name || app.last_name ? `${app.first_name} ${app.last_name}` : <span className="text-gray-400 italic">Incomplete Draft</span>}
                          </div>
                          <div className="text-xs text-gray-500 truncate max-w-[180px]">{app.email}</div>
                        </td>
                        
                        <td className="p-4">
                          <div className="text-sm font-semibold text-gray-800">{formatCurrency(app.loan_amount_requested)}</div>
                          <div className="text-[11px] text-gray-500 truncate max-w-[120px] uppercase font-bold">{app.loan_program_type || 'N/A'}</div>
                        </td>

                        <td className="p-4">
                          <span className={getStatusBadge(app.status)}>
                            {getStatusIcon(app.status)}
                            {app.status}
                          </span>
                        </td>

                        <td className="p-4 text-xs text-gray-500 font-medium">
                          {app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}
                        </td>

                        <td className="p-4 pr-6 text-right">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedApp(app);
                            }}
                            className="p-1.5 hover:bg-blue-50 text-secondary-blue rounded-lg transition-colors inline-block"
                            title="Inspect Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section: Slide-out Detail Verification Drawer */}
        <div className="lg:col-span-1">
          {selectedApp ? (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden sticky top-[92px] flex flex-col max-h-[82vh] animate-in slide-in-from-right-4 duration-300">
              
              {/* Header */}
              <div className="bg-primary-blue p-5 text-white flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                    Loan ID: {selectedApp.id.slice(0, 8)}...
                  </span>
                  <h3 className="font-extrabold text-base mt-2">
                    {selectedApp.first_name} {selectedApp.last_name}
                  </h3>
                  <p className="text-xs text-white/70 truncate max-w-[200px] mt-0.5">{selectedApp.email}</p>
                </div>
                <button 
                  onClick={() => setSelectedApp(null)}
                  className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-all"
                  aria-label="Close panel"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable details */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 text-sm">
                
                {/* Status card */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Current Decision</span>
                    <span className={getStatusBadge(selectedApp.status)}>
                      {getStatusIcon(selectedApp.status)}
                      {selectedApp.status}
                    </span>
                  </div>
                </div>

                {/* Identity document verification */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-primary-blue text-xs uppercase tracking-wider border-b border-gray-100 pb-2">
                    Verification Documents
                  </h4>

                  {/* Student ID */}
                  <div className="bg-[#f0f4f8] rounded-xl p-4 border border-blue-50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-gray-700 text-xs flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-secondary-blue" /> Student ID
                      </span>
                      {studentIdSignedUrl && (
                        <a 
                          href={studentIdSignedUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-[11px] font-bold text-secondary-blue hover:underline flex items-center gap-1"
                        >
                          <Download className="w-3 h-3" /> Download ID
                        </a>
                      )}
                    </div>

                    {selectedApp.student_id_url ? (
                      studentIdSignedUrl ? (
                        selectedApp.student_id_url.endsWith('.pdf') ? (
                          <div className="bg-white border rounded-lg p-4 text-center">
                            <span className="text-xs text-gray-500 block mb-2">PDF Document</span>
                            <a 
                              href={studentIdSignedUrl} 
                              target="_blank" 
                              rel="noreferrer" 
                              className="px-4 py-1.5 bg-secondary-blue hover:bg-primary-blue text-white rounded-full font-bold text-[11px] inline-block transition-colors"
                            >
                              Open PDF Viewer
                            </a>
                          </div>
                        ) : (
                          <div className="bg-white border rounded-lg overflow-hidden flex items-center justify-center max-h-[140px] shadow-inner">
                            <img 
                              src={studentIdSignedUrl} 
                              alt="Student ID Upload" 
                              className="max-h-[140px] w-auto object-contain cursor-pointer"
                              onClick={() => window.open(studentIdSignedUrl, '_blank')}
                            />
                          </div>
                        )
                      ) : (
                        <div className="text-xs text-gray-500 flex items-center justify-center p-4">
                          <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> Loading document...
                        </div>
                      )
                    ) : (
                      <div className="text-xs text-amber-600 bg-amber-50 rounded-lg p-3 flex items-center gap-1.5 border border-amber-100 font-medium">
                        <ShieldAlert className="w-4 h-4" /> Document not uploaded
                      </div>
                    )}
                  </div>

                  {/* Government-Issued ID (Front and Back) */}
                  <div className="bg-[#f0f4f8] rounded-xl p-4 border border-blue-50 space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-200/50 pb-2">
                      <span className="font-bold text-gray-700 text-xs flex items-center gap-1.5">
                        <CreditCard className="w-3.5 h-3.5 text-secondary-blue" />
                        {selectedApp.gov_id_type === 'state_id' ? 'State ID' : "Driver's License"}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-gray-150">
                        {selectedApp.gov_id_type === 'state_id' ? 'State Card' : 'License'}
                      </span>
                    </div>

                    {/* Front and Back previews side-by-side or stacked */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Front Side */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                          <span>Front Side</span>
                          {govFrontSignedUrl && (
                            <a 
                              href={govFrontSignedUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[10px] text-secondary-blue hover:underline flex items-center gap-0.5"
                            >
                              <Download className="w-2.5 h-2.5" /> Link
                            </a>
                          )}
                        </div>

                        {selectedApp.gov_id_front_url ? (
                          govFrontSignedUrl ? (
                            selectedApp.gov_id_front_url.endsWith('.pdf') ? (
                              <div className="bg-white border rounded-lg p-3 text-center min-h-[100px] flex flex-col justify-center items-center">
                                <span className="text-[10px] text-gray-500 block mb-1">PDF File</span>
                                <a 
                                  href={govFrontSignedUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="px-3 py-1 bg-secondary-blue text-white rounded-full font-bold text-[9px] inline-block"
                                >
                                  Open PDF
                                </a>
                              </div>
                            ) : (
                              <div className="bg-white border rounded-lg overflow-hidden flex items-center justify-center h-[100px] shadow-sm">
                                <img 
                                  src={govFrontSignedUrl} 
                                  alt="Gov ID Front" 
                                  className="max-h-[100px] w-auto object-contain cursor-pointer"
                                  onClick={() => window.open(govFrontSignedUrl, '_blank')}
                                />
                              </div>
                            )
                          ) : (
                            <div className="text-[11px] text-gray-500 flex items-center justify-center p-4">
                              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Loading...
                            </div>
                          )
                        ) : (
                          <div className="text-[10px] text-amber-600 bg-amber-50 rounded-lg p-2 flex items-center gap-1 border border-amber-100 font-medium">
                            <ShieldAlert className="w-3.5 h-3.5" /> Missing
                          </div>
                        )}
                      </div>

                      {/* Back Side */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-600">
                          <span>Back Side</span>
                          {govBackSignedUrl && (
                            <a 
                              href={govBackSignedUrl} 
                              target="_blank" 
                              rel="noreferrer"
                              className="text-[10px] text-secondary-blue hover:underline flex items-center gap-0.5"
                            >
                              <Download className="w-2.5 h-2.5" /> Link
                            </a>
                          )}
                        </div>

                        {selectedApp.gov_id_back_url ? (
                          govBackSignedUrl ? (
                            selectedApp.gov_id_back_url.endsWith('.pdf') ? (
                              <div className="bg-white border rounded-lg p-3 text-center min-h-[100px] flex flex-col justify-center items-center">
                                <span className="text-[10px] text-gray-500 block mb-1">PDF File</span>
                                <a 
                                  href={govBackSignedUrl} 
                                  target="_blank" 
                                  rel="noreferrer" 
                                  className="px-3 py-1 bg-secondary-blue text-white rounded-full font-bold text-[9px] inline-block"
                                >
                                  Open PDF
                                </a>
                              </div>
                            ) : (
                              <div className="bg-white border rounded-lg overflow-hidden flex items-center justify-center h-[100px] shadow-sm">
                                <img 
                                  src={govBackSignedUrl} 
                                  alt="Gov ID Back" 
                                  className="max-h-[100px] w-auto object-contain cursor-pointer"
                                  onClick={() => window.open(govBackSignedUrl, '_blank')}
                                />
                              </div>
                            )
                          ) : (
                            <div className="text-[11px] text-gray-500 flex items-center justify-center p-4">
                              <Loader2 className="w-3.5 h-3.5 animate-spin mr-1" /> Loading...
                            </div>
                          )
                        ) : (
                          <div className="text-[10px] text-amber-600 bg-amber-50 rounded-lg p-2 flex items-center gap-1 border border-amber-100 font-medium">
                            <ShieldAlert className="w-3.5 h-3.5" /> Missing
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Profile Fields */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-primary-blue text-xs uppercase tracking-wider border-b border-gray-100 pb-2">
                    Applicant Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-[11px] text-gray-400 block font-bold">DATE OF BIRTH</span>
                      <span className="font-medium text-gray-800">
                        {selectedApp.dob_month}/{selectedApp.dob_day}/{selectedApp.dob_year}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-bold">SSN / TIN</span>
                      <span className="font-medium text-gray-800">{selectedApp.ssn || 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[11px] text-gray-400 block font-bold">CONTACT PHONE</span>
                      <span className="font-medium text-gray-800">{selectedApp.phone || 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[11px] text-gray-400 block font-bold">HOME ADDRESS</span>
                      <span className="font-medium text-gray-800 block">
                        {selectedApp.address_street}{selectedApp.address_apt ? `, ${selectedApp.address_apt}` : ''}
                      </span>
                      <span className="font-medium text-gray-800 block">
                        {selectedApp.address_city}, {selectedApp.address_state} {selectedApp.address_zip}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-bold">CITIZENSHIP STATUS</span>
                      <span className="font-medium text-gray-800 truncate block capitalize">
                        {selectedApp.citizenship_status || 'N/A'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-bold">EMPLOYMENT STATUS</span>
                      <span className="font-medium text-gray-800 block">{selectedApp.employment_status || 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[11px] text-gray-400 block font-bold">ANNUAL INCOME</span>
                      <span className="font-medium text-gray-800 font-mono block">
                        {formatCurrency(selectedApp.annual_income)}/year
                      </span>
                    </div>
                  </div>
                </div>

                {/* Loan Fields */}
                <div className="space-y-4">
                  <h4 className="font-extrabold text-primary-blue text-xs uppercase tracking-wider border-b border-gray-100 pb-2">
                    Loan Details
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <span className="text-[11px] text-gray-400 block font-bold">SCHOOL NAME</span>
                      <span className="font-medium text-gray-800 uppercase block">{selectedApp.loan_school_name || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-bold">MAJOR / PROGRAM</span>
                      <span className="font-medium text-gray-800 uppercase block">{selectedApp.loan_major || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="text-[11px] text-gray-400 block font-bold">YEAR OF STUDY</span>
                      <span className="font-medium text-gray-800 uppercase block">{selectedApp.loan_year_of_study || 'N/A'}</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-[11px] text-gray-400 block font-bold">CO-SIGNER REQUEST</span>
                      <span className="font-medium text-gray-800 block">
                        {selectedApp.has_cosigner ? `Yes (Sent to ${selectedApp.cosigner_email_address})` : 'Individual Application (No Cosigner)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Admin notes */}
                <div className="space-y-2 pt-2 border-t border-gray-200">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Internal Admin Notes</label>
                  <textarea 
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add verification notes, discrepancies found, or approval rationale..."
                    rows={3}
                    className="w-full border border-gray-200 rounded-xl p-3 outline-none focus:border-secondary-blue text-xs font-medium resize-none bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Footer Decision Buttons */}
              <div className="p-4 bg-slate-50 border-t border-gray-200 flex gap-3">
                <button 
                  onClick={() => handleUpdateStatus('rejected')}
                  disabled={updatingStatus}
                  className="flex-1 py-3 bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-bold text-xs rounded-full transition-colors flex items-center justify-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" /> Reject ID
                </button>
                <button 
                  onClick={() => handleUpdateStatus('approved')}
                  disabled={updatingStatus}
                  className="flex-1 py-3 bg-green-600 text-white hover:bg-green-700 font-bold text-xs rounded-full shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Approve ID
                </button>
              </div>

            </div>
          ) : (
            /* Selected Placeholder Details */
            <div className="hidden lg:flex bg-white rounded-2xl border border-dashed border-gray-300 p-8 text-center flex-col items-center justify-center h-[400px] text-gray-400 font-medium">
              <Eye className="w-10 h-10 text-gray-300 mb-3" />
              <span className="text-sm font-bold text-slate-500">Select an application</span>
              <span className="text-xs text-gray-400 mt-1 max-w-[200px]">Click any row on the left to inspect profiles and verification ID uploads.</span>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
