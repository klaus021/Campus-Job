import { useState } from 'react';
import { useStore, Department } from '../store';
import { ArrowLeft, Save } from 'lucide-react';

const departments: Department[] = ['CSE', 'EEE', 'Civil', 'Mechanical', 'Cyber Security', 'Other'];

export function EditProfilePage() {
  const { currentUser, updateProfile, setPage } = useStore();
  if (!currentUser) return null;

  const [form, setForm] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
    department: currentUser.department,
    university: currentUser.university,
    skills: currentUser.skills.join(', '),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProfile({
      name: form.name,
      bio: form.bio,
      department: form.department,
      university: form.university,
      skills: form.skills.split(',').map(s => s.trim()).filter(Boolean),
    });
    setPage('profile');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <button onClick={() => setPage('profile')} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 text-sm font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Profile
      </button>

      <div className="bg-white border border-gray-200 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              value={form.department} onChange={e => setForm({ ...form, department: e.target.value as Department })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
            <input
              type="text" value={form.university} onChange={e => setForm({ ...form, university: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea
              value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
            <input
              type="text" value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              placeholder="React, Python, MATLAB..."
            />
          </div>
          <div className="flex gap-3">
            <button type="submit" className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 transition-colors">
              <Save className="w-4 h-4" /> Save Changes
            </button>
            <button type="button" onClick={() => setPage('profile')} className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
