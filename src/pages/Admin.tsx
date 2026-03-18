import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import { 
  Settings as SettingsIcon, 
  Image as ImageIcon, 
  Layout as LayoutIcon, 
  CheckCircle, 
  XCircle, 
  Edit, 
  Trash2, 
  Plus,
  LogOut,
  Save,
  Check,
  X
} from 'lucide-react';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'settings' | 'prompts' | 'pending'>('settings');
  const { settings, updateSettings } = useSettings();
  
  const [prompts, setPrompts] = useState<any[]>([]);
  const [pendingPrompts, setPendingPrompts] = useState<any[]>([]);
  const [editingPrompt, setEditingPrompt] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (statusMessage) {
      const timer = setTimeout(() => setStatusMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [statusMessage]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/admin/prompts');
      const data = await res.json();
      setPrompts(data.approved);
      setPendingPrompts(data.pending);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        setIsLoggedIn(true);
        fetchData();
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsLoggedIn(false);
  };

  const handleApprove = async (id: string) => {
    await fetch('/api/admin/prompts/approve', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    });
    fetchData();
  };

  const handleDelete = async (id: string, type: 'approved' | 'pending') => {
    if (!confirm('Are you sure you want to delete this prompt?')) return;
    await fetch('/api/admin/prompts/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, type })
    });
    fetchData();
  };

  const handleSavePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data: any = {
      title: formData.get('title'),
      promptText: formData.get('promptText'),
      image: formData.get('image'),
      tags: (formData.get('tags') as string).split(',').map(t => t.trim()),
      category: formData.get('category'),
      model: formData.get('model'),
      isFeatured: formData.get('isFeatured') === 'on'
    };

    const endpoint = editingPrompt ? '/api/admin/prompts/update' : '/api/admin/prompts/add';
    const body = editingPrompt ? { id: editingPrompt.id, data } : data;

    try {
      await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      setIsModalOpen(false);
      setEditingPrompt(null);
      fetchData();
      setStatusMessage({ type: 'success', text: editingPrompt ? 'Prompt updated!' : 'Prompt added!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to save prompt.' });
    }
  };

  const handleUpdateSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const newSettings = Object.fromEntries(formData.entries());
    try {
      await updateSettings(newSettings);
      setStatusMessage({ type: 'success', text: 'Settings updated successfully!' });
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to update settings.' });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-slate-400">Enter your credentials to manage the site</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'settings' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <SettingsIcon className="w-5 h-5" />
            Site Settings
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'prompts' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            Manage Prompts
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'pending' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Pending Approvals
            {pendingPrompts.length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                {pendingPrompts.length}
              </span>
            )}
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8 relative">
        {statusMessage && (
          <div className={`fixed top-8 right-8 z-[60] px-6 py-3 rounded-xl shadow-2xl border flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300 ${
            statusMessage.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-red-500/10 border-red-500/20 text-red-500'
          }`}>
            {statusMessage.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
            <span className="font-medium">{statusMessage.text}</span>
          </div>
        )}
        {activeTab === 'settings' && (
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-white mb-8">Site Settings</h1>
            <form onSubmit={handleUpdateSettings} className="space-y-8 bg-slate-900 border border-slate-800 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Website Name</label>
                  <input
                    name="siteName"
                    defaultValue={settings.siteName}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Logo URL</label>
                  <input
                    name="siteLogo"
                    defaultValue={settings.siteLogo}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Primary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="primaryColor"
                      defaultValue={settings.primaryColor}
                      className="h-10 w-20 bg-slate-800 border border-slate-700 rounded"
                    />
                    <input
                      defaultValue={settings.primaryColor}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Secondary Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      name="secondaryColor"
                      defaultValue={settings.secondaryColor}
                      className="h-10 w-20 bg-slate-800 border border-slate-700 rounded"
                    />
                    <input
                      defaultValue={settings.secondaryColor}
                      className="flex-1 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Font Family</label>
                  <select
                    name="fontFamily"
                    defaultValue={settings.fontFamily}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="Inter, sans-serif">Inter (Sans)</option>
                    <option value="'Space Grotesk', sans-serif">Space Grotesk (Tech)</option>
                    <option value="'Playfair Display', serif">Playfair Display (Editorial)</option>
                    <option value="'JetBrains Mono', monospace">JetBrains Mono (Mono)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Default Layout</label>
                  <select
                    name="layout"
                    defaultValue={settings.layout}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="grid">Grid View</option>
                    <option value="list">List View</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Site Description</label>
                <textarea
                  name="description"
                  defaultValue={settings.description}
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'prompts' && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-white">Manage Prompts</h1>
              <button 
                onClick={() => {
                  setEditingPrompt(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add New Prompt
              </button>
            </div>
            <div className="grid gap-4">
              {prompts.map((prompt) => (
                <div key={prompt.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-6">
                  <img src={prompt.image} alt="" className="w-20 h-20 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="text-white font-bold">{prompt.title}</h3>
                    <p className="text-slate-500 text-sm line-clamp-1">{prompt.promptText}</p>
                    <div className="flex gap-2 mt-2">
                      {prompt.tags.map((tag: string) => (
                        <span key={tag} className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setEditingPrompt(prompt);
                        setIsModalOpen(true);
                      }}
                      className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDelete(prompt.id, 'approved')}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'pending' && (
          <div>
            <h1 className="text-3xl font-bold text-white mb-8">Pending Approvals</h1>
            {pendingPrompts.length === 0 ? (
              <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-2xl">
                <CheckCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">No pending prompts to review</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {pendingPrompts.map((prompt) => (
                  <div key={prompt.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                    <div className="flex gap-6">
                      <img src={prompt.image} alt="" className="w-32 h-32 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-white">{prompt.title}</h3>
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleApprove(prompt.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                            >
                              <Check className="w-4 h-4" />
                              Approve
                            </button>
                            <button 
                              onClick={() => handleDelete(prompt.id, 'pending')}
                              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        </div>
                        <p className="text-slate-400 text-sm mb-4">{prompt.promptText}</p>
                        <div className="flex gap-2">
                          {prompt.tags.map((tag: string) => (
                            <span key={tag} className="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between sticky top-0 bg-slate-900 z-10">
              <h2 className="text-xl font-bold text-white">
                {editingPrompt ? 'Edit Prompt' : 'Add New Prompt'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSavePrompt} className="p-6 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Title</label>
                  <input
                    name="title"
                    required
                    defaultValue={editingPrompt?.title}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Cyberpunk City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Category</label>
                  <input
                    name="category"
                    required
                    defaultValue={editingPrompt?.category}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Digital Art"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">AI Model</label>
                  <input
                    name="model"
                    required
                    defaultValue={editingPrompt?.model}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    placeholder="Midjourney v6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Image URL</label>
                  <input
                    name="image"
                    required
                    defaultValue={editingPrompt?.image}
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                    placeholder="https://..."
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Prompt Text</label>
                <textarea
                  name="promptText"
                  required
                  defaultValue={editingPrompt?.promptText}
                  rows={4}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  placeholder="Paste your prompt here..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Tags (comma separated)</label>
                <input
                  name="tags"
                  required
                  defaultValue={editingPrompt?.tags?.join(', ')}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white"
                  placeholder="neon, futuristic, rain"
                />
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isFeatured"
                  id="isFeatured"
                  defaultChecked={editingPrompt?.isFeatured}
                  className="w-5 h-5 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <label htmlFor="isFeatured" className="text-sm font-medium text-slate-300">
                  Feature this prompt on home page
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2 text-slate-400 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-bold transition-colors"
                >
                  {editingPrompt ? 'Update Prompt' : 'Add Prompt'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
